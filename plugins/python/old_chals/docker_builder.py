import os

from chals.utils import FixMinikube
if os.name == 'nt':
    import wexpect as px
else:
    import pexpect as px
from os.path import join, isdir, basename
from shutil import copyfile, copytree
from jinja2 import Template
import tempfile
import uuid
from .utils import WorkDir
from rich.console import Console
import subprocess

docker_template = """
FROM {base_img}
ADD {input_dir}/ /{input_dir}
CMD sleep infinity
"""
docker_comp_template = """
version: "3.9"
services:
{% for container in containers %}
   {{ container.name }}:
      build: ./{{ container.name }}
      container_name: {{ container.name }}
{% endfor %}
"""
console = Console()
stat = console.status("[bold white]Running Commands", spinner="point", spinner_style="white")


class Process:
    def __init__(self, shell, name="process", color="blue"):
        self.proc = px.spawn(shell, encoding='utf-8', env=os.environ)
        self.proc.expect('[$#] ')
        self.shell = shell
        self.name = name
        self.color = color

    def run(self, cmd, wait=True, timeout=600, detach=True):
        self.proc.sendline(cmd)
        if wait:
            self.proc.expect('[$#] ', timeout)
        if not detach:
            console.print(self.proc.before)

    def clone(self):
        return Process(self.shell, self.name, self.color)
    
    def print(self, text):
        console.print(f"[bold {self.color}]\[{self.name}][/bold {self.color}] {text}")

class DockerBuilder(object):
    def __init__(
            self,
            name=uuid.uuid4(),
            base_img="scratch",
            input_dir="input",
            color="cyan",
            included_files=[],
            output_files=[],
            outdir=None,
    ):
        self.name = name
        self.base_img = base_img
        self.input_dir = input_dir
        self.color = color
        self.included_files = included_files
        self.docker_outputs = output_files
        self.outdir = outdir

    def build(self, docker_context):
        dockerfile = docker_template.format(
            base_img=self.base_img,
            input_dir=self.input_dir,
        )

        with WorkDir(docker_context):
            input_dir_path = join(docker_context, self.input_dir)
            os.mkdir(input_dir_path)
            for included_file in self.included_files:
                copy_function = copytree if isdir(included_file) else copyfile
                copy_function(included_file, join(
                    input_dir_path, basename(included_file)))

            dockerfile_path = join(docker_context, "Dockerfile")
            with open(dockerfile_path, "w") as dockerfile_file:
                dockerfile_file.write(dockerfile)

    def __enter__(self):
        with FixMinikube(), tempfile.TemporaryDirectory() as temp_dir, console.status("[bold green]Creating Docker Environment", spinner_style="green"):
            self.build(temp_dir)
            subprocess.check_output(f"docker build  --platform linux/amd64 -q {temp_dir} -t {self.name}".split())
            subprocess.check_output(f'docker run -d --name {self.name} {self.name}'.split())
            proc = Process(f'docker exec -it {self.name} /bin/sh', "container", self.color)
        stat.start()
        return proc

    def __exit__(self, exc_type, exc_value, exc_traceback):
        stat.stop()
        with FixMinikube(), console.status("[bold red]Deleting Docker Environment", spinner_style="red"):
            for file in self.docker_outputs:
                os.system(f'docker cp {self.name}:{file} {self.outdir}')
            subprocess.check_output(f'docker rm -f -v {self.name}'.split())
            subprocess.check_output(f'docker rmi -f {self.name}'.split())
        console.print(":tada: [white]Finished Challenge Generation[/white] :tada:")

class DockerNetwork:

    def __init__(self, containers: list, outdir: str, docker_outputs: dict):
        self.containers = containers
        self.outdir = outdir
        self.docker_outputs = docker_outputs

    def __enter__(self):
        docker_compose = Template(docker_comp_template)
        docker_comp_file = docker_compose.render(containers=self.containers)

        self.temp_dir = tempfile.TemporaryDirectory()
        for container in self.containers:
            image_dir = join(self.temp_dir.name, container.name)
            os.mkdir(image_dir)
            container.build(image_dir)

        docker_compose_path = join(self.temp_dir.name, "docker-compose.yml")
        with open(docker_compose_path, "w") as d:
            d.write(docker_comp_file)
        with WorkDir(self.temp_dir.name), FixMinikube(), console.status("[bold green]Creating Docker Network Environment", spinner_style="green"):
            subprocess.run('docker-compose -p temp up --build --detach'.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        procs = []
        with FixMinikube():
            for container in self.containers:
                proc = Process(f'docker exec -it {container.name} /bin/sh', container.name, container.color)
                procs.append(proc)
        stat.start()
        return procs

    def __exit__(self, exc_type, exc_value, exc_traceback):
        stat.stop()
        with WorkDir(self.temp_dir.name), FixMinikube(), console.status("[bold red]Removing Docker Network Environment", spinner_style="red"):
            for name in self.docker_outputs:
                files = self.docker_outputs[name]
                for file in files:
                    os.system(f'docker cp {name}:{file} "{self.outdir}"')
            subprocess.run('docker-compose -p temp down --rmi all'.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        self.temp_dir.cleanup()
        console.print(":tada: [white]Finished Challenge Generation[/white] :tada:")
