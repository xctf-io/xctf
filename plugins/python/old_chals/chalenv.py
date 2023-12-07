import os
import base64
from os.path import join, abspath, dirname, basename
from dirhash import dirhash

import hashlib
import subprocess
from jinja2.environment import Template
from slugify import slugify
from shutil import copy, copytree, rmtree
from rich.status import Status
from rich import print

from .challenge import GeneratedChallenge
from .utils import FixMinikube, get_cache_state, get_challenge_hash, load_chal_from_config, WorkDir, fwrite
from distutils.dir_util import copy_tree
import ruamel.yaml

TEMPLATES_DIR = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), 'templates')


class ChallengeEnvironment(GeneratedChallenge):
    def __init__(self):
        self.chal_path_lookup = {}
        self.challenge_types = None

    def gen_chals(self, local, base_url, chals_lock={}):
        self._chal_lookup = {}
        cached = True
        if self.config is None:
            return

        tree = {
            "name": self.name,
            "chal": self,
            "children": []
        }
        if 'chals' not in self.config or self.config['chals'] is None:
            return tree, cached
        
        for chal in self.config['chals']:
            chal_path = self.chal_path_lookup.get(chal)
            if not chal_path or not os.path.isdir(chal_path):
                raise Exception(f'challenge directory not found! {chal}')

            chal_config = os.path.join(chal_path, 'chal.yaml')
            if not os.path.exists(chal_config):
                raise Exception(f'could not find challenge config! {chal}')

            chal_gen = load_chal_from_config(self.challenge_types, chal_config)
            use_cache, attr = get_cache_state(self.chal_path_lookup, chal_gen, chals_lock)
            if use_cache == False:
                cached = False

            if ChallengeEnvironment in type(chal_gen).__bases__:
                chal_gen.chal_host = self.chal_host
                chal_gen.chal_path_lookup = self.chal_path_lookup
                chal_gen.challenge_types = self.challenge_types
                chal_children, chals_cached = chal_gen.gen_chals(local, base_url, chals_lock=chals_lock)
                chal_gen.do_gen(chal_path, local, (use_cache and chals_cached), attr, self.chal_host, base_url)

                tree["children"].append(chal_children)
            else:
                chal_gen.do_gen(chal_path, local, use_cache, attr, self.chal_host, base_url)

                tree["children"].append({
                    "name": chal_gen.name,
                    "chal": chal_gen,
                    "children": []
                })

            self._chal_lookup[chal_gen.name] = chal_gen
        return tree, cached

class StaticSite(ChallengeEnvironment):
    yaml_tag = u'!static_site'
    __doc__ = """
    Static Site

    Config:

        None
    """
    def gen(self, chal_dir):
        self.set_display()
        
        template_dir = join(dirname(abspath(__file__)),
                            'templates/static_site')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        chal_out_dir = join(chal_dir, 'chals')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)

        webroot_folder = self.get_value('webroot')
        copy_file_paths = [f"COPY {webroot_folder} $webroot/"]

        chal_to_path = self.get_value('chal_to_path')
        chal_to_path_dict = {chal["name"]: chal["path"]
                             for chal in chal_to_path}

        for name, chal in self._chal_lookup.items():
            chal_path = chal.chal_dir
            chal_paths = None
            if hasattr(chal, 'display'):
                loc = chal_to_path_dict[name]
                out = join(chal_dir, loc)
                temp = ""
                val = {name: chal.display}
                with open(out, 'r', encoding="utf-8") as r:
                    temp = Template(r.read()).render(**val)
                with open(out, 'w', encoding="utf-8") as w:
                    w.write(temp)
            elif hasattr(chal, 'chal_file'):
                if type(chal.chal_file) is list:
                    chal_files = chal.chal_file
                    chal_paths = [join(chal_path, chal_file)
                                  for chal_file in chal_files]
                else:
                    chal_path = join(chal_path, chal.chal_file)

                if not chal_paths:
                    chal_paths = [chal_path]

                for chal_path in chal_paths:
                    chal_path = os.path.join('..', chal_path)
                    file_name = os.path.basename(chal_path)
                    copy(chal_path, join(chal_out_dir, file_name))

                    chal_env_path = chal_to_path_dict[name]
                    copy_file_paths.append(
                        f"COPY {join('chals/', file_name)} $webroot/{chal_env_path}")
            else:
                print(f'No challenge content set for: {chal.name}')
                continue

        with open(join(template_dir, 'Dockerfile'), 'r') as template_docker,\
                open(join(chal_dir, 'Dockerfile'), 'w') as docker:
            docker.write(template_docker.read().format(
                setup="\n".join(copy_file_paths)))

        self.container_id = f'static_site-{hash(self)}'
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_dir, 'Makefile'), 'w') as make:
            make.write(template_make.read().format(
                chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}'))

        self.build_docker(chal_dir)


class ShellServer(ChallengeEnvironment):
    security = 'readonly'

    yaml_tag = u'!shell_server'
    __doc__ = """
    Shell Server

    Config:

        None
    """

    def gen(self, chal_dir):
        self.set_display()

        template_dir = join(dirname(abspath(__file__)),
                            'templates/shell_server')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        username = self.get_value('username')
        password = self.get_value('password')
        users = self.get_value('users')
        workdir = self.get_value('workdir')

        filesystem_root = self.get_value('filesystem_root')

        copy_file_paths = []
        copy_file_paths.append(f"ADD {filesystem_root} /")

        create_users = [f'adduser {user} -D' for user in users]

        setup_commands = [
            "RUN {create_users}".format(
                create_users=" && ".join(create_users)),
            *copy_file_paths
        ]

        with open(join(template_dir, 'Dockerfile'), 'r') as template_docker,\
                open(join(chal_dir, 'Dockerfile'), 'w') as docker:
            docker.write(template_docker.read().format(
                setup="\n".join(setup_commands),
                credentials=f"{username}:{password}",
                workdir=workdir
            ))

        self.container_id = f'shell_server-{hash(self)}'
        self.target_port = 8080
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_dir, 'Makefile'), 'w') as make:
            make.write(template_make.read().format(
                chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}'))

        self.build_docker(chal_dir)


class FileshareFlask(ChallengeEnvironment):
    yaml_tag = u'!fileshare_flask'
    __doc__ = """
    Fileshare Flask

    Config:
    
        username - Username to login
        password - Password to login
        files - Files to upload
    """

    def gen(self, chal_dir):
        self.set_display()

        username = self.get_value('username')
        password = self.get_value('password')

        chal_out_dir = os.path.join(chal_dir, 'app')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)
        home_folder = join(chal_out_dir, 'home_folder')
        os.mkdir(home_folder)

        template_dir = join(dirname(abspath(__file__)),
                            'templates/fileshare_flask')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        copy_tree(template_dir, chal_out_dir)

        files = self.get_value('files')
        if files is not None:
            for f in files:
                copy(join(chal_dir, f), join(home_folder, f))

        for name, chal in self._chal_lookup.items():
            chal_path = chal.chal_dir
            chal_paths = None
            if hasattr(chal, 'display'):
                chal_path = join(chal_path, 'chal')
                with WorkDir(chal_dir), open(chal_path, 'w') as out:
                    out.write(chal.display)
            elif hasattr(chal, 'chal_file'):
                if type(chal.chal_file) is list:
                    chal_files = chal.chal_file
                    chal_paths = [join(chal_path, chal_file)
                                  for chal_file in chal_files]
                else:
                    chal_path = join(chal_path, chal.chal_file)
            else:
                print(f'No challenge content set for: {chal.name}')
                continue

            if not chal_paths:
                chal_paths = [chal_path]

            for chal_path in chal_paths:
                chal_path = join('..', chal_path)
                env_chal_path = join(
                    chal_out_dir, 'home_folder', basename(chal_path))
                copy(chal_path, env_chal_path)

        fwrite(template_dir, 'Dockerfile', chal_out_dir, 'Dockerfile',
               setup="", username=username, password=password)
        self.container_id = f'fileshare-flask-{hash(self)}'
        self.target_port = 8000
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_out_dir, 'Makefile'), 'w') as make:
            make.write(template_make.read().format(
                chal_name=self.container_id, chal_run_options=f'-p 8081:{self.target_port}'))

        # TODO (cthompson) be able to skip building of challenge environment
        self.build_docker(chal_out_dir)


class VirtualMachine(ChallengeEnvironment):
    yaml_tag = u'!virtual_machine'
    __doc__ = """
    Virtual Machine

    Config:

        None
    """

    def gen(self, chal_dir):
        files_to_add = []
        for name, chal in self._chal_lookup.items():
            chal_path = chal.chal_dir
            chal_paths = None
            if hasattr(chal, 'display'):
                chal_path = join(chal_path, 'chal')
                with WorkDir(chal_dir), open(chal_path, 'w') as out:
                    out.write(chal.display)
            elif hasattr(chal, 'chal_file'):
                if type(chal.chal_file) is list:
                    chal_files = chal.chal_file
                    chal_paths = [join(chal_path, chal_file)
                                  for chal_file in chal_files]
                else:
                    chal_path = join(chal_path, chal.chal_file)
            else:
                print(f'No challenge content set for: {chal.name}')
                continue

            if not chal_paths:
                chal_paths = [chal_path]

            for chal_path in chal_paths:
                chal_path = os.path.join('..', chal_path)
                file_name = os.path.basename(chal_path)
                env_chal_path = os.path.join(chal_dir, file_name)
                copy(chal_path, env_chal_path)
                files_to_add.append(
                    f'COPY ["{file_name}", "{chal.dest_path}"]')

        template_dir = join(dirname(abspath(__file__)), 'templates/alpine_vm')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        with open(join(template_dir, 'Dockerfile'), 'r') as template_docker,\
                open(join(chal_dir, 'Dockerfile'), 'w') as docker:
            docker.write(template_docker.read().format(
                setup='\n'.join(files_to_add)))

        container_id = f'alpine_vm-{hash(self)}'
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_dir, 'Makefile'), 'w') as make:
            make.write(template_make.read().format(
                chal_run_options=f'-p 8081:{self.target_port}', chal_name=container_id))

        with WorkDir(chal_dir):
            with Status(f"[cyan] Building Container for [bold]{self.name}[/bold]", spinner_style="cyan"):
                subprocess.check_output(["make", "build"])
            with Status(f"[blue] Generating Image for [bold]{self.name}[/blue]", spinner_style="blue"):
                subprocess.check_output(["make", "generate-img"])
            print(f":star2: Created Virtual Machine for [bold]{self.name}[bold] :star2:")

        self.chal_file = 'vm.tar.gz'


class TwitterFlask(ChallengeEnvironment):
    yaml_tag = u'!twitter_flask'
    __doc__ = """
    Twitter clone

    Config:

        users - Users of the site
        followers - Users that follower other users, each user must exist in `users`
        messages - Messages posted on twitter by users
        dms - Dms sent on twitter by users
    """

    def gen(self, chal_dir):
        self.set_display()

        chal_out_dir = os.path.join(chal_dir, 'twitter')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)

        twitter_flask_dir = os.path.join(TEMPLATES_DIR, 'twitter_flask')
        copy_tree(twitter_flask_dir, chal_out_dir)

        chal_config = {
            'users': self.get_value('users'),
            'followers': self.get_value('followers'),
            'messages': self.get_value('messages'),
            'dms': self.get_value('dms'),
        }

        def fill_in_chals(section):
            for i, msg in enumerate(chal_config[section]):
                if not msg.get('chal'):
                    continue

                if msg['chal'] not in self._chal_lookup:
                    continue

                chal = self._chal_lookup[msg['chal']]
                if chal is None:
                    raise Exception(
                        f'Unable to find chal {chal} in {self.name}')

                if hasattr(chal, 'display'):
                    msg['text'] += " " + chal.display
                elif hasattr(chal, 'chal_file'):
                    if type(chal.chal_file) is list:
                        raise Exception(
                            "challenges with multiple files not supported yet")

                    chal_path = os.path.join(
                        self.chal_path_lookup[chal.name], chal.chal_file)
                    chal_url = self.chal_host.add_chal(chal_path)
                    msg['text'] += " " + chal_url
                chal_config[section][i] = msg

        fill_in_chals('messages')
        fill_in_chals('dms')

        yaml = ruamel.yaml.YAML()
        with open(os.path.join(chal_out_dir, 'twitter_contents.yaml'), 'w') as out:
            yaml.dump(chal_config, out)

        template_dir = join(dirname(abspath(__file__)),
                            'templates/twitter_flask')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        copy(join(template_dir, 'Dockerfile'),
             join(chal_out_dir, 'Dockerfile'))

        self.container_id = f'twitter-{hash(self)}'
        self.target_port = 5000
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_out_dir, 'Makefile'), 'w') as make:
            make.write(template_make.read().format(
                chal_run_options=f'-p 8081:{self.target_port}', chal_name=self.container_id))

        # with WorkDir(chal_out_dir):
        #     os.system(f'virtualenv -p /usr/bin/python2.7 env')
        #     os.system(
        #         '/bin/bash -c "source env/bin/activate && pip install -r requirements.txt"')
        #     os.system(
        #         '/bin/bash -c "source env/bin/activate && python db_create.py"')

        self.build_docker(chal_out_dir)


class FacebookDjango(ChallengeEnvironment):
    yaml_tag = u'!facebook_django'
    __doc__ = """
    Facebook clone

    Config:
    
        users - Users of the site
        posts - Posts posted by users
        profiles - Profiles of the users
        comments - Comments posted by users
    """

    def create_fixture_yaml(self, config):
        entity_to_model = {
            'users': 'auth.user',
            'profiles': 'fb.userprofile',
            'posts': 'fb.userpost',
            'comments': 'fb.userpostcomment'
        }

        user_lookup = {user['username']: n for n,
                       user in enumerate(config['users'])}

        def replace_name_with_pk(entity, key):
            # check if the field is just a number, if so skip
            try:
                int(entity[key], 10)
                return entity
            except ValueError:
                pass

            entity[key] = user_lookup[entity[key]]
            return entity

        def force_bytes(s, encoding='utf-8', strings_only=False, errors='strict'):
            """
            Similar to smart_bytes, except that lazy instances are resolved to
            strings, rather than kept as lazy objects.
            If strings_only is True, don't convert (some) non-string-like objects.
            """
            # Handle the common case first for performance reasons.
            if isinstance(s, bytes):
                if encoding == 'utf-8':
                    return s
                else:
                    return s.decode('utf-8', errors).encode(encoding, errors)
            if isinstance(s, memoryview):
                return bytes(s)
            return str(s).encode(encoding, errors)

        def pbkdf2(password, salt, iterations, dklen=0, digest=None):
            """Return the hash of password using pbkdf2."""
            if digest is None:
                digest = hashlib.sha256
            dklen = dklen or None
            password = force_bytes(password)
            salt = force_bytes(salt)
            return hashlib.pbkdf2_hmac(digest().name, password, salt, iterations, dklen)

        def get_pwd_hash(password):
            salt = 'A'*9
            iterations = 12000
            hash = pbkdf2(password, salt, iterations, digest=hashlib.sha256)
            hash = base64.b64encode(hash).decode('ascii').strip()
            return "%s$%d$%s$%s" % ("pbkdf2_sha256", iterations, salt, hash)

        out = []
        for entity_type, entities in config.items():
            if entities is None:
                continue

            for n, entity in enumerate(entities):
                if 'user' in entity:
                    entity = replace_name_with_pk(entity, 'user')

                if 'author' in entity:
                    entity = replace_name_with_pk(entity, 'author')

                if 'password' in entity:
                    entity['password'] = get_pwd_hash(entity['password'])

                if 'likers' in entity:
                    entity['likers'] = [user_lookup[liker]
                                        for liker in entity['likers']]

                if 'chal' in entity:
                    del entity['chal']

                if (entity_type == 'posts' or entity_type == 'comments') and 'date_added' not in entity:
                    entity['date_added'] = '2020-03-06 00:00:00+00:00'

                out.append({
                    'fields': entity,
                    'model': entity_to_model[entity_type],
                    'pk': n
                })
        return out

    def gen(self, chal_dir):
        self.set_display()

        chal_out_dir = os.path.join(chal_dir, 'facebook')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)

        template_dir = os.path.join(TEMPLATES_DIR, 'facebook_django')
        copy_tree(template_dir, chal_out_dir)

        chal_config = {
            'users': self.get_value('users'),
            'profiles': self.get_value('profiles'),
            'posts': self.get_value('posts'),
            'comments': self.get_value('comments')
        }

        def fill_in_chals(section):
            for i, msg in enumerate(chal_config[section]):
                if not msg.get('chal'):
                    continue

                if msg['chal'] not in self._chal_lookup:
                    continue

                chal = self._chal_lookup[msg['chal']]
                if chal is None:
                    raise Exception(
                        f'Unable to find chal {chal} in {self.name}')

                if hasattr(chal, 'display'):
                    msg['text'] += " " + chal.display
                elif hasattr(chal, 'chal_file'):
                    def add_chal(name, c):
                        chal_path = os.path.join(
                            self.chal_path_lookup[name], c)
                        return self.chal_host.add_chal(chal_path)

                    chal_url = ""
                    if type(chal.chal_file) is list:
                        for c in chal.chal_file:
                            chal_url += add_chal(chal.name, c) + " "
                    else:
                        chal_url = add_chal(chal.name, chal.chal_file)

                    msg['text'] += " " + chal_url
                chal_config[section][i] = msg

        fill_in_chals('posts')
        fill_in_chals('comments')

        yaml = ruamel.yaml.YAML()
        with open(os.path.join(chal_out_dir, 'app', 'fixture.yaml'), 'w') as out:
            fixture_content = self.create_fixture_yaml(chal_config)
            yaml.dump(fixture_content, out)

        template_dir = join(dirname(abspath(__file__)),
                            'templates/facebook_django')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        copy(join(template_dir, 'Dockerfile'),
             join(chal_out_dir, 'Dockerfile'))

        self.container_id = f'facebook-django-{hash(self)}'
        self.target_port = 8000
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_out_dir, 'Makefile'), 'w') as make:
            make_template = template_make.read()
            make.write(make_template.format(
                chal_run_options=f'-p 8081:{self.target_port}', chal_name=self.container_id))

        # with WorkDir(join(chal_out_dir, 'app')):
        #     os.system(f'virtualenv -p /usr/bin/python2.7 env')
        #     os.system(
        #         '/bin/bash -c "source env/bin/activate && pip install -r requirements.txt"')
        #     os.system(
        #         '/bin/bash -c "source env/bin/activate && echo no | python manage.py syncdb"')
        #     os.system(
        #         '/bin/bash -c "source env/bin/activate && python manage.py loaddata fixture.yaml"')

        self.build_docker(chal_out_dir)


class JekyllBlog(ChallengeEnvironment):
    yaml_tag = u'!jekyll_blog'
    __doc__ = """
    A simple blog

    Config:
    
        title - the name of the blog
        email - the email of the author
        author - the name of the author
        description - description of the blog
        posts - list of markdown files to include as posts
    """

    def insert_challenges(self, chal_dir, content):
        new_content = content
        for name, chal in self._chal_lookup.items():
            sub_content = ""
            if hasattr(chal, 'display'):
                sub_content = chal.display
            elif hasattr(chal, 'chal_file'):
                if type(chal.chal_file) is list:
                    raise Exception(
                        "challenges with multiple files not supported yet")

                chal_path = os.path.join(
                    self.chal_path_lookup[chal.name], chal.chal_file)
                chal_url = self.chal_host.add_chal(chal_path)
                sub_content = chal_url
            new_content = new_content.replace(
                "{% " + name + " %}", sub_content)
        return new_content

    def gen(self, chal_dir):
        self.set_display()

        chal_out_dir = os.path.join(chal_dir, 'blog')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)

        template_dir = os.path.join(TEMPLATES_DIR, 'jekyll_blog')
        copy_tree(template_dir, chal_out_dir)

        post_files = self.get_value('posts')
        os.mkdir(join(chal_out_dir, "posts"))
        for post_file in post_files:
            post_path = join(chal_dir, post_file)
            with open(post_path, 'r') as post:
                content = post.read()
                new_content = self.insert_challenges(chal_dir, content)

            post_out_path = join(chal_out_dir, 'content', 'post', post_file)
            os.makedirs(dirname(post_out_path), exist_ok=True)
            with open(post_out_path, 'w+') as post:
                post.write(new_content)

        # config_yaml_path = os.path.join(chal_out_dir, '_config.yml')

        # yaml = ruamel.yaml.YAML()
        # with open(config_yaml_path, 'r') as in_file:
        #     current_config = yaml.load(in_file)

        # site_config = self.get_value('meta')
        # new_site_config = {**current_config, **site_config}

        # with open(config_yaml_path, 'w') as out:
        #     yaml.dump(new_site_config, out)

        template_dir = join(dirname(abspath(__file__)),
                            'templates/jekyll_blog')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')

        self.container_id = f'jekyll-blog-{hash(self)}'
        with open(join(makefile_dir, 'Makefile'), 'r') as template_make,\
                open(join(chal_out_dir, 'Makefile'), 'w') as make:
            make_template = template_make.read()
            make.write(make_template.format(
                chal_run_options=f'-p 8081:{self.target_port}', chal_name=self.container_id))

        self.build_docker(chal_out_dir)

class SecretChat(ChallengeEnvironment):
    yaml_tag = u'!secret_chat'
    __doc__ = """
    A simple chat application with login

    Config:

        title - the name of the chat
        users - list of users to create
        chat - list of messages to send
    """

    def gen(self, chal_dir):
        self.set_display()

        title = self.get_value('title')
        users = self.get_value('users')
        # convert to list of dicts
        chat_messages = self.get_value('chat')
        users = [dict(user) for user in users]
        chat_messages = []
        for message in self.get_value('chat'):
            message = dict(message)
            # if message contains chal key
            if 'chal' in message:
                chal = self._chal_lookup[message['chal']]
                if hasattr(chal, 'display'):
                    message['messages'].append(chal.display)
                elif hasattr(chal, 'chal_file'):
                    if type(chal.chal_file) is list:
                        raise Exception(
                            "challenges with multiple files not supported yet")

                    chal_path = os.path.join(
                        self.chal_path_lookup[chal.name], chal.chal_file)
                    chal_url = self.chal_host.add_chal(chal_path)
                    message['messages'].append(chal_url)

            chat_messages.append(message)
        chal_out_dir = join(chal_dir, 'chat')
        if os.path.isdir(chal_out_dir):
            rmtree(chal_out_dir)
        os.makedirs(chal_out_dir)

        template_dir = os.path.join(TEMPLATES_DIR, 'secret_chat')
        copy_tree(template_dir, chal_out_dir)
        fwrite(template_dir, 'routes.py', chal_out_dir, 'routes.py', title=title, chat_messages=chat_messages)
        fwrite(template_dir, 'manage.py', chal_out_dir, 'manage.py', users=users)
        self.target_port = 5000
        self.container_id = f'secret_chat-{hash(self)}'
        fwrite(TEMPLATES_DIR, 'docker_make/Makefile', chal_out_dir, 'Makefile', chal_name=self.container_id,
               chal_run_options=f'-it -p 8080:{self.target_port}')

        self.build_docker(chal_out_dir)
