from shutil import rmtree
import string
import tempfile
import time
from os import remove

from chals.utils import fwrite
from ..challenge import GeneratedChallenge
from ..docker_builder import DockerBuilder, DockerNetwork
from ..text_transforms import hex_text
from os.path import join, realpath, dirname, basename, exists
import random
from ..text_transforms import text_transforms

from scapy.all import rdpcap, wrpcap

class PCAPLogin(GeneratedChallenge):
    yaml_tag = u'!pcap_login'
    __doc__ = """
    Find the login credentials in PCAP

    Config:

        username - username to find
        password - password to find
        out_file - name of the output file
        flag_transform - transform to apply to the flag (optional)
    """

    def gen(self, chal_dir):
        usern = self.get_value("username")
        passw = self.get_value("password")
        out_file = self.get_value("out_file")

        self.chal_file = out_file

        flag_transform = self.get_value("flag_transform", False)
        def trans_func(x):
            return x
        if flag_transform is not None:
            trans_func = text_transforms[flag_transform]["encode"]
        
        out = join(chal_dir, out_file)
        config_dir = join(dirname(dirname(realpath(__file__))),
                          'chal_files', 'http_login')
        temp_dir = tempfile.mkdtemp()
        fwrite(config_dir, 'index.php', temp_dir, 'index.php', jinja=True, username=usern, password=passw)
        
        sender = DockerBuilder(name="sender", base_img="nicolaka/netshoot")
        recv = DockerBuilder(name="recv", base_img="php:8.0-apache", included_files=[join(temp_dir, 'index.php')], color="white")
        network = DockerNetwork([sender, recv], out, {"sender": [f'/root/{out_file}']})
        with network as hosts:
            send = hosts[0]
            php = hosts[1]
            tcpdump = send.clone()
            tcpdump.run(f'tcpdump -q -w {out_file}')
            php.run('mv /input/index.php /var/www/html/index.php')
            php.run('service apache2 start')
            # try random usernames and passwords
            for i in range(random.randint(10, 20)):
                random_user = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                random_pass = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                send.run(f'curl -X POST -d "username={random_user}&password={random_pass}" recv')
            # try the actual username and password
            send.run(f'curl -X POST -d "username={usern}&password={passw}&{trans_func("flag")}={trans_func(self.flag)}" recv')
            # more random usernames and passwords
            for i in range(random.randint(10, 20)):
                random_user = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                random_pass = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                send.run(f'curl -X POST -d "username={random_user}&password={random_pass}" recv')

            time.sleep(10)
            tcpdump.run(chr(3))


        rmtree(temp_dir)

    def solve(self, chal_dir):
        pass


class PingPCAP(GeneratedChallenge):
    yaml_tag = u'!ping_pcap'
    __doc__ = """
    Find the data in ping requests

    Config:

        text: additional data to add to communication(optional)
    """

    def gen(self, chal_dir):
        text = self.get_value("text", required=False)
        text = '' if text is None else text
        flag = hex_text(text + self.flag)
        flag_bytes = [flag[i:i + 2] for i in range(0, len(flag), 2)]

        out = join(chal_dir, 'chal.pcap')
        sender = DockerBuilder(name="sender", base_img="nicolaka/netshoot")
        recv = DockerBuilder(name="recv", base_img="alpine")
        network = DockerNetwork([sender, recv], out, {
                                "sender": ['/root/chal.pcap']})
        websites = ['stackoverflow.com', 'twitter.com',
                    'github.com', 'facebook.com', 'google.com']
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
                     "Chrome/74.0.3729.169 Safari/537.36 "
        self.chal_file = 'chal.pcap'

        with network as hosts:
            send = hosts[0]
            tcpdump = send.clone()
            tcpdump.run('tcpdump -q -w chal.pcap')
            send.run(f'curl -L -A "{user_agent}" {random.choice(websites)}')
            for byte in flag_bytes:
                send.run(f'ping -c 1 -p {byte} recv')
                r = random.randint(1, 10)
                if r == 4:
                    send.run('ping -c 1 -w 1 195.168.233.233')
                elif r == 5:
                    send.run(
                        f'curl -L -A "{user_agent}" {random.choice(websites)}')
                elif r == 6:
                    send.run(
                        f'curl -X POST -A "{user_agent}" -d "flag=nottheflag123" recv')
            # Sleep one second to allow for tcpdump to catch everything
            time.sleep(10)
            tcpdump.run(chr(3))

    def solve(self, chal_dir):
        pass


class SQLLog(GeneratedChallenge):
    yaml_tag = u'!sql_log'
    __doc__ = """
    Find what the attacker got in a sql injection attack
    
    Config:

        flag_user: username of attacked user
        other_users: other users in database(at least one)
        file: optional param to add a file through LOADFILE
    """

    def gen(self, chal_dir):
        user = self.get_value('flag_user')
        other_users = self.get_value('other_users')
        files = self.get_value('files', required=False)
        if files is None:
            files = []
        else:
            for i, file in enumerate(files):
                files[i] = join(chal_dir, file)

        config_dir = join(dirname(dirname(realpath(__file__))),
                          'chal_files', 'sql_log')
        index_php = join(config_dir, 'index.php')
        setup = join(config_dir, 'setup.sql')
        out = join(chal_dir, 'access.log')
        sender = DockerBuilder(name="sender", base_img="python:slim", color="yellow")
        recv = DockerBuilder(
            name="recv", base_img="php:8.0-apache", included_files=[index_php], color="white")
        db = DockerBuilder(name='db', base_img='mysql',
                           included_files=[setup] + files, color="cyan")
        network = DockerNetwork([sender, recv, db], out, {
                                "recv": ['/var/log/apache2/access.log']})
        self.chal_file = 'access.log'

        with network as hosts:
            hacker = hosts[0]
            server = hosts[1]
            sql = hosts[2]

            # * setup server
            server.run('docker-php-ext-install mysqli')
            server.run('docker-php-ext-enable mysqli')
            server.run('mv /input/index.php /var/www/html/index.php')
            server.run('unlink /var/log/apache2/access.log')
            server.run('service apache2 start')
            server.print("website online")

            # * setup database
            sql.run('su mysql')
            sql.run('mysqld --initialize')
            sql.run('mysqld --init-file=/input/setup.sql --secure-file-priv=/input &')
            time.sleep(3)
            others = ", ".join([str(item).replace('\'', '"')
                               for item in other_users.items()])
            cmd = f"mysql -u sql -p -e 'USE admin_site; INSERT INTO `users` (username, password) " \
                  f"VALUES {others}, (\"{user}\", \"{self.flag}\");'"
            sql.run(cmd, wait=False)
            sql.proc.expect(': ')
            sql.run('password', detach=False)
            sql.print("sql server set up")

            # * start attack
            hacker.run('pip install sqlmap')
            hacker.print("starting sqlmap attack, PLEASE BE PATIENT")
            hacker.run('sqlmap -u "http://recv?user=&pass=" --random-agent --dump --batch', detach=False,
                       timeout=900)
            for file in files:
                hacker.print("reading file")
                cmd2 = f'sqlmap -u "http://recv?user=&pass=" --random-agent -' \
                       f'-file-read=/input/{basename(file)} --batch'
                hacker.run(cmd2, detach=False)

    def solve(self, chal_dir):
        pass


class KeyboardInput(GeneratedChallenge):
    yaml_tag = u'!key_input'
    __doc__ = """
    Find what someone typed based on usb traffic
    
    Config:
    
        text: additional text before flag
        rand_backspaces: add random backspaces to increase dificulty(doesn't change message)
    """

    def char_to_keycode(self, ch):
        mapping = {
            ('a', 'A'): b'\x04',
            ('b', 'B'): b'\x05',
            ('c', 'C'): b'\x06',
            ('d', 'D'): b'\x07',
            ('e', 'E'): b'\x08',
            ('f', 'F'): b'\x09',
            ('g', 'G'): b'\x0A',
            ('h', 'H'): b'\x0B',
            ('i', 'I'): b'\x0C',
            ('j', 'J'): b'\x0D',
            ('k', 'K'): b'\x0E',
            ('l', 'L'): b'\x0F',
            ('m', 'M'): b'\x10',
            ('n', 'N'): b'\x11',
            ('o', 'O'): b'\x12',
            ('p', 'P'): b'\x13',
            ('q', 'Q'): b'\x14',
            ('r', 'R'): b'\x15',
            ('s', 'S'): b'\x16',
            ('t', 'T'): b'\x17',
            ('u', 'U'): b'\x18',
            ('v', 'V'): b'\x19',
            ('w', 'W'): b'\x1A',
            ('x', 'X'): b'\x1B',
            ('y', 'Y'): b'\x1C',
            ('z', 'Z'): b'\x1D',
            ('1', '!'): b'\x1E',
            ('2', '@'): b'\x1F',
            ('3', '#'): b'\x20',
            ('4', '$'): b'\x21',
            ('5', '%'): b'\x22',
            ('6', '^'): b'\x23',
            ('7', '&'): b'\x24',
            ('8', '*'): b'\x25',
            ('9', '('): b'\x26',
            ('0', ')'): b'\x27',
            ('\n', '\n'): b'\x28',
            ('[ESC]', '[ESC]'): b'\x29',
            ('[BACKSPACE]', '[BACKSPACE]'): b'\x2a',
            ('\t', '\t'): b'\x2b',
            (' ', ' '): b'\x2C',
            ('-', '_'): b'\x2D',
            ('=', '+'): b'\x2E',
            ('[', '{'): b'\x2F',
            (']', '}'): b'\x30',
            ('\\', '|'): b'\x31',
            ('`', '~'): b'\x32',
            (';', ':'): b'\x33',
            ('\'', '\"'): b'\x34',
            (',', '<'): b'\x36',
            ('.', '>'): b'\x37',
            ('/', '?'): b'\x38',
            ('[CAPSLOCK]', '[CAPSLOCK]'): b'\x39',
        }
        for keys, val in mapping.items():
            if(keys[0] == ch):
                return b'\x00\x00' + val + b'\x00' * 5
            elif(keys[1] == ch):
                return b'\x02\x00' + val + b'\x00' * 5

    def gen(self, chal_dir):
        self.chal_file = 'keylog.pcap'
        text = self.get_value('text', required=False)
        backspace = self.get_value('rand_backspaces')
        fulltext = self.flag
        if text is not None:
            fulltext = text + fulltext
        sample = join(dirname(dirname(realpath(__file__))),
                      'templates', 'key_input', 'sample.pcap')
        packets = rdpcap(sample)

        sample_keypress = packets[62:]
        sample_keypress[0].load = self.char_to_keycode(fulltext[0])

        def add_keypress(key):
            copy = [p.copy() for p in sample_keypress]
            copy[0].load = self.char_to_keycode(key)
            packets.extend(copy)
        for s in fulltext[1:]:
            add_keypress(s)
            if backspace and random.randint(1, 7) == 3:
                add_keypress(chr(random.randint(97, 122)))
                add_keypress("[BACKSPACE]")

        pcap_out = join(chal_dir, "keylog.pcap")
        if(exists(pcap_out)):
            remove(pcap_out)
        for pack in packets:
            wrpcap(pcap_out, [pack], append=True)

    def solve(self, chal_dir):
        pass
