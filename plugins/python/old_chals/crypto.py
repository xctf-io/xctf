import os
from .challenge import GeneratedChallenge
from .utils import WorkDir, fwrite
from .text_transforms import *
from os.path import join, abspath, dirname, exists
from shutil import copytree, rmtree, copyfile
from hashlib import sha1
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
# from Cryptodome.Cipher import AES
# from Cryptodome.Random import get_random_bytes

'''
class SubstitutionChallenge(GeneratedChallenge):
    yaml_tag = u'!substitution'
    """A simple substitution cipher challenge

    Config:
        key: phrase to prepend to the rest of the alphabet
    """
    def gen(self, chal_dir):
        key = self.get_value("key")
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = substitution_text(self.flag, key)
            f.write(chal_txt)

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            #TODO: solver
'''


class RSAChallenge(GeneratedChallenge):
    yaml_tag = u'!RSA'
    __doc__ = """
    RSA challenge

    Config:
    
        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'wb') as f:
            chal_txt = RSA_text(self.flag)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            # TODO: solver


class MD5Challenge(GeneratedChallenge):
    yaml_tag = u'!md5'
    __doc__ = """
    A reverse MD5 hash challenge

    Config:

        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = MD5(self.flag)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            #TODO: solver


class SHA256Challenge(GeneratedChallenge):
    yaml_tag = u'!sha256'
    __doc__ = """
    A reverse SHA256 hash challenge

    Config:

        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = SHA256(self.flag)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            # TODO: solver


class VigenereChallenge(GeneratedChallenge):
    yaml_tag = u'!vigenere'
    __doc__ = """
    A decode vigenere challenge
    
    Config:

        key: word/phrase used to encrypt plaintext
    """

    def gen(self, chal_dir):
        key = self.get_value("key")
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = encrypt_vigenere_text(
                self.get_value("addl_text") + " " + self.flag, key)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            return decode_vigenere_text(chal_text)


class BinaryChallenge(GeneratedChallenge):
    yaml_tag = u'!binary'
    __doc__ = """
    A simple binary decoding challenge
    
    Config:

        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = binary_text(self.flag)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            return decode_binary_text(chal_text)


class HexChallenge(GeneratedChallenge):
    yaml_tag = u'!hex'
    __doc__ = """
    A simple hex decoding challenge

    Config:

        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = hex_text(self.get_value("addl_text") + self.flag)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            return decode_hex_text(chal_text)


class Base64Challenge(GeneratedChallenge):
    yaml_tag = u'!base64'
    __doc__ = """
    A simple base64 decoding challenge

    Config:

        None
    """

    def gen(self, chal_dir):
        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = base64_text(self.get_value("addl_text") + "\n" + self.flag)
            f.write(str(chal_txt))
            self.display = chal_txt

    def solve(self, chal_dir):
        """Solve the base64 challenge
        """
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            return decode_base64_text(chal_text)


class CaesarCipherChallenge(GeneratedChallenge):
    yaml_tag = u'!caesar_cipher'
    __doc__ = """
    A simple Caesar cipher challenge

    Config:

        shift - The amount to shift the alphabet by
    """

    def gen(self, chal_dir):
        shift = self.get_value("shift")

        # This is required for the solver for now
        assert(self.flag.startswith("flag{"))

        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = ceasar_text(self.get_value(
                "addl_text") + " " + self.flag, shift)
            f.write(chal_txt)
            self.display = chal_txt

    def solve(self, chal_dir):
        """Solve the Caesar cipher challenge

        Description:

            Knowing that the first four letters are the word "flag",
            figure out the shift from the first letter
        """
        with open(join(chal_dir, 'challenge.txt'), 'r') as f:
            chal_text = f.read()
            shift = ord(chal_text[0]) - ord('f')
            return ceasar_text(chal_text, 26 - shift)


class XorChallenge(GeneratedChallenge):
    yaml_tag = u'!xor'
    __doc__ = """
    A single or multi byte xor challenge

    Config:

        key - A single byte key to xor the flag with
        text - Optional text to put before the flag to make sure there is enough text to correctly recover the flag
    """

    def gen(self, chal_dir):
        # TODO: Enforce minimum length here?
        key = self.get_value("key")
        #config_text = self.get_value("text", required=False)

        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            text = self.flag
            # if config_text is not None:
            #text = config_text + "\n\n" + self.flag

            chal_txt = hex_text(xor_text(text + self.get_value("text"), key))
            f.write(chal_txt)
            self.display = chal_txt

# https://github.com/breadchris/PolyCTF/blob/master/Cryptography/Web-Crypto/vuln/views.py
# For code check here
# TODO: Create docker file with website and this challenge gen modifies template


class ECBBlockDuplication(GeneratedChallenge):
    yaml_tag = u'!ecb_block'
    __doc__ = """
    A simple ECB block duplication challenge

    Config:

        key - The key to use
        secret - The secret value to append before flag
    """

    def gen(self, chal_dir):
        key = self.get_value("key").encode('utf-8')
        with open(join(chal_dir,'challenge.txt'),'w') as f:
            cipher = AES.new(key, AES.MODE_ECB)
            to_encrypt = self.get_value("secret") + self.flag
            chal_txt = cipher.encrypt(to_encrypt.encode('utf-8'))
            f.write(chal_txt.hex())
            self.display = chal_txt


class CBCPaddingOracle(GeneratedChallenge):
    yaml_tag = u'!cbc_oracle'
    __doc__ = """

    Config:

        key - The key to use
        secret - The secret value to append before flag
    """

    def gen(self, chal_dir):
        pass

class AESChallenge(GeneratedChallenge):
    yaml_tag = u'!aes'
    __doc__ = """
    A simple AES challenge

    Config:

        key - The key to use
        addl_text - Additional text to append to the flag
    """

    def gen(self, chal_dir):
        key = self.get_value("key")
        addl_text = self.get_value("addl_text", required=False)

        with open(join(chal_dir, 'challenge.txt'), 'w') as f:
            chal_txt = aes_encrypt_text(addl_text + " " + self.flag, key)
            f.write(chal_txt)
            self.display = chal_txt

class HashExtension(GeneratedChallenge):
    yaml_tag = u'!hash_extension'
    __doc__ = """
    A simple SHA1 hash extension challenge
    
    Config:

        key - The secret for HMAC
        author - The author of the website
        text - Additional text in the secret file, in order to connect to other challenges
        custom_files - Custom files on the web server
    """

    def gen(self, chal_dir):
        cur_file_path = dirname(abspath(__file__))
        temp_dir = join(cur_file_path, 'templates/hash_ext')
        key = self.get_value("key")
        files = self.get_value("custom_files", required=False)
        all_files = ["joke.txt", "poem.txt", "art.txt", "secret"]

        app_dir = join(chal_dir, 'app')
        files_dir = join(app_dir, 'files')
        if(exists(app_dir)):
            rmtree(app_dir)
        copytree(temp_dir, app_dir)

        if files is not None:
            if(len(files) < 2):
                raise Exception(
                    "You must supply at least 2 files as custom files.")
            for f in os.listdir(files_dir):
                os.remove(join(files_dir, f))
            for file in files:
                copyfile(join(chal_dir, file), join(files_dir, file))
            all_files = files + ["secret"]

        self.container_id = f'hash_ext-{hash(self)}'
        fwrite(cur_file_path, 'templates/docker_make/Makefile', chal_dir, 'Makefile',
               chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}')
        fwrite(cur_file_path, 'templates/python/Dockerfile', chal_dir,
               'Dockerfile', requirements="Flask", options="")
        fwrite(temp_dir, "files/secret", app_dir, "files/secret",
               flag=self.flag, text=self.get_value("text", required=False))
        fwrite(temp_dir, "main.py", app_dir, "main.py", key=key)
        fwrite(temp_dir, "templates/index.html", app_dir, "templates/index.html", True,
               hash=sha1, key=key, files=all_files, author=self.get_value("author"), result='{{result}}')

        self.build_docker(chal_dir)
