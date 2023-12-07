import os
from os.path import join, abspath, dirname
from shutil import copyfile
from distutils.dir_util import copy_tree
from .challenge import GeneratedChallenge
from .utils import WorkDir, fwrite
from slugify import slugify
from re import search
from .docker_builder import DockerBuilder


class RobotsTxtChallenge(GeneratedChallenge):
    yaml_tag = u'!robots_txt'
    __doc__ = """
    Flag is located in the robots file

    Config:
    
        index - Custom index.html page
        prompt - Custom AI powered generation instructions for a website. (Ex. Make a cooking website...)
        text - Optional additional information
    """

    def gen(self, chal_dir):
        robots_format = '''User-agent: *
        Disallow: {flag}
        '''

        robots_setup = """
        ADD robots.txt $webroot/robots.txt
        ADD index.html $webroot/index.html
        """

        """
        TODO (breadchris) cleanup here
        - this is mostly just for getting down ideas, please refactor
        - Ideally we should be using docker compose
        - Docker templates and makefile templates should exist as helper functions
        """
        self.set_display()

        template_dir = join(dirname(abspath(__file__)),
                            'templates/static_site')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')
        prompt = self.get_value('prompt', required=False)
        index_page = self.get_value('index', required=False)
        text = self.get_value('text', required=False)

        # if an index.html page has not been configured, add the default one
        if index_page is None:
            copyfile(join(template_dir, 'index.html'),
                     join(chal_dir, 'index.html'))
        
        if prompt is not None:
            prompt += " Create unique text to fill the webpage. You should include css in this html file, and any image src= references should be set to a unique vivid description of what the image should be, encapsulated by []."
            ai_imgs = get_img_names()
            for img in ai_imgs:
                robots_setup += f"ADD {img} $webroot/{img}\n"



        with open(join(chal_dir, 'robots.txt'), 'w') as f:
            f.write(robots_format.format(flag=self.flag))
            if text is not None:
                f.write(text)

        fwrite(template_dir, 'Dockerfile', chal_dir,
               'Dockerfile', setup=robots_setup)
        self.container_id = f'robots_txt-{hash(self)}'
        fwrite(makefile_dir, 'Makefile', chal_dir, 'Makefile',
               chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}')

        self.build_docker(chal_dir)

class HtpasswdChallenge(GeneratedChallenge):

    yaml_tag = u'!htpasswd'
    __doc__ = """
    Flag is located in the .htpasswd file

    Config:
        index - Custom index.html page
        prompt - Custom AI powered generation instructions for a website. (Ex. Make a cooking website...)
        username - Username paired with flag as a password in the htpasswd file.
        encrypted: Y/N to hashing for the flag.
    """

    def gen(self, chal_dir):

        htpasswd_setup = """
        ADD .htpasswd $webroot/.htpasswd
        ADD index.html $webroot/index.html
        """

        flag_txt = search(r'\{([^}]+)\}', self.flag).group(1)

        self.set_display()

        template_dir = join(dirname(abspath(__file__)),
                            'templates/static_site')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')
        prompt = self.get_value('prompt', required=False)
        index_page = self.get_value('index', required=False)
        encrypt = self.get_value('encrypt', required=False)== "Y"
        username = self.get_value('username', required=True)

        # if an index.html page has not been configured, add the default one
        if index_page is None:
            copyfile(join(template_dir, 'index.html'),
                     join(chal_dir, 'index.html'))
        
        if prompt is not None:
            prompt += " Create unique text to fill the webpage. You should include css in this html file, and any image src= references should be set to a unique vivid description of what the image should be, encapsulated by []."
            ai_imgs = get_img_names()
            for img in ai_imgs:
                htpasswd_setup += f"ADD {img} $webroot/{img}\n"

        builder = DockerBuilder(
            # TODO Replace with a base image that has htpasswd pre-installed.
            base_img="ubuntu",
            input_dir="input",
            output_files=[".htpasswd"],
            outdir=chal_dir
        )

        with builder as b:
            if encrypt:
                # Only text within curly brackets is grabbed because it will make it far easier to crack the hash.
                b.run("apt-get update && apt-get install -y apache2-utils")
                b.run(f"/usr/bin/htpasswd -bc .htpasswd {username} {flag_txt}")
                
            else:
                b.run("apt-get update && apt-get install -y apache2-utils")
                b.run(f"/usr/bin/htpasswd -bcp .htpasswd {username} {self.flag}")

        fwrite(template_dir, 'Dockerfile', chal_dir,
               'Dockerfile', setup=htpasswd_setup)
        self.container_id = f'htpasswd-{hash(self)}'
        fwrite(makefile_dir, 'Makefile', chal_dir, 'Makefile',
               chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}')

        self.build_docker(chal_dir)


class ExposedGitChallenge(GeneratedChallenge):
    yaml_tag = u'!git_exposed'
    __doc__ = """
    Flag is located in the .git file

    Config:
    
        index - Custom index.html page
        prompt - Custom AI powered generation instructions for a website. (Ex. Make a cooking website...)
        file - Directory to file to hide flag in.
        commit_msg - Optional message to show for commit.
    """

    def gen(self, chal_dir):

        git_setup = """
        ADD index.html $webroot/index.html
        ADD .git $webroot/.git
        """

        self.set_display()

        template_dir = join(dirname(abspath(__file__)),
                            'templates/static_site')
        makefile_dir = join(dirname(abspath(__file__)),
                            'templates/docker_make')
        prompt = self.get_value('prompt', required=False)
        file = self.get_value('file', required=True)
        index_page = self.get_value('index', required=False)
        commit_msg = self.get_value('commit_msg', required=True)
        user = self.get_value('user', required=False)
        email = self.get_value('email', required=False)

        if user is None:
            user = "Admin"

        if email is None:
            email = "admin@admin.com"

        # if an index.html page has not been configured, add the default one
        if index_page is None:
            copyfile(join(template_dir, 'index.html'),
                     join(chal_dir, 'index.html'))
        
        if prompt is not None:
            prompt += " Create unique text to fill the webpage. You should include css in this html file, and any image src= references should be set to a unique vivid description of what the image should be, encapsulated by []."
            ai_imgs = get_img_names()
            for img in ai_imgs:
                git_setup += f"ADD {img} $webroot/{img}\n"

        builder = DockerBuilder(
            # TODO Replace with a base image that has git pre-installed.
            base_img="bitnami/git",
            input_dir="input",
            included_files=[join(chal_dir, file)],
            output_files=[".git"],
            outdir=chal_dir
        )

        with builder as b:
            b.run("echo " + self.flag + " >> " + "input/" + file)
            b.run("git init")
            b.run("git add input/" + file)
            b.run(f"git config --local user.email \"{email}\"")
            b.run(f"git config --local user.name \"{user}\"")
            b.run(f"git commit -m \"{commit_msg}\"")


        fwrite(template_dir, 'Dockerfile', chal_dir,
               'Dockerfile', setup=git_setup)
        self.container_id = f'exposed_git-{hash(self)}'
        fwrite(makefile_dir, 'Makefile', chal_dir, 'Makefile',
               chal_name=self.container_id, chal_run_options=f'-p 8080:{self.target_port}')

        self.build_docker(chal_dir)


class TemplateInjection(GeneratedChallenge):
    yaml_tag = u'!temp_inj'
    __doc__ = """
    Flag is located in flag.txt

    Config:

        author - author of mad lib generator
        blacklist - blackist for disallowed words(leave as [] for a blank blacklist)
        files - optional additional files to add to webroot
    """

    def gen(self, chal_dir):
        cur_file_path = dirname(abspath(__file__))
        temp_dir = join(cur_file_path, 'templates/temp_inj')
        nsjail_dir = join(cur_file_path, 'templates/nsjail_flask')
        files = self.get_value("files", required=False)
        blacklist = self.get_value("blacklist")
        author = self.get_value("author")

        self.set_display()

        app_dir = join(chal_dir, 'app')
        copy_tree(temp_dir, app_dir)
        copy_tree(nsjail_dir, chal_dir)
        if files is not None:
            for file in files:
                copyfile(join(chal_dir, file), join(app_dir, file))

        self.container_id = f'temp_inj-{hash(self)}'
        self.target_port = 8080
        fwrite(cur_file_path, 'templates/docker_make/Makefile', chal_dir, 'Makefile', chal_name=self.container_id,
               chal_run_options=f'-p 8080:{self.target_port} --cap-drop all --cap-add chown --cap-add setuid --cap-add setgid \
        --cap-add sys_admin --security-opt apparmor=unconfined --security-opt seccomp=unconfined')
        fwrite(temp_dir, 'flag.txt', app_dir, 'flag.txt', flag=self.flag)
        fwrite(temp_dir, 'main.py', app_dir, 'main.py',
               jinja=True, blacklist=blacklist)
        fwrite(temp_dir, 'templates/base.html', app_dir, 'templates/base.html', jinja=True,
               author=author, content="{% block content %}{% endblock %}")

        self.build_docker(chal_dir)
