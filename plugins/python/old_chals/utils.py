import inspect
import logging
import subprocess
from rich.logging import RichHandler
from os.path import join
from jinja2 import Template
import ruamel.yaml
from gtts import gTTS
import os
import logging
from rich.logging import RichHandler
from dirhash import dirhash
import random

from chals.text_transforms import SHA256


class WorkDir(object):
    def __init__(self, chal_dir):
        self.chal_dir = chal_dir
        self.cwd = os.getcwd()

    def __enter__(self):
        os.chdir(self.chal_dir)

    def __exit__(self, *args):
        os.chdir(self.cwd)

def load_chal_from_config(challenge_types, chal_config):
    yaml = ruamel.yaml.YAML()
    for chal_name, chal_type in challenge_types.items():
        yaml.register_class(chal_type)

    with open(chal_config, "r") as c:
        parsed_chals = yaml.load(c)

    if len(parsed_chals) == 1:
        return parsed_chals[0]
    else:
        raise Exception("Unable to parse challenge config")


def text_to_wav(text, path, tld='com'):
    tts = gTTS(text=text, lang='en', tld=tld)
    tts.save(path)


def fwrite(src, src_file, dest, dest_file, jinja=False, **formats):
    with open(join(src, src_file), 'r') as s, open(join(dest, dest_file), 'w') as d:
        if jinja:
            d.write(Template(s.read()).render(**formats))
        else:
            d.write(s.read().format(**formats))


class FixMinikube(object):
    def __init__(self):
        self.env_vars = ['DOCKER_TLS_VERIFY', 'DOCKER_HOST',
                         'DOCKER_CERT_PATH', 'MINIKUBE_ACTIVE_DOCKERD']
        self.env_vars_value = {'DOCKER_TLS_VERIFY': '', 'DOCKER_HOST': '',
                               'DOCKER_CERT_PATH': '', 'MINIKUBE_ACTIVE_DOCKERD': ''}
        if 'MINIKUBE_ACTIVE_DOCKERD' in os.environ:
            self.minikube_active = True
        else:
            self.minikube_active = False

        # TODO talk to luke about this boi
        self.minikube_active = False

    def __enter__(self):
        if self.minikube_active:
            for env_var in self.env_vars:
                self.env_vars_value[env_var] = os.environ.get(env_var)
                os.environ.pop(env_var, None)

    def __exit__(self, *args):
        if self.minikube_active:
            for env_var in self.env_vars:
                os.environ[env_var] = self.env_vars_value[env_var]
used_ports = []
base_port = 8000
def get_open_port():
    global base_port
    base_port += 1
    while base_port in used_ports:
        base_port += 1
    return base_port

def set_used_ports(ports):
    global used_ports
    used_ports = ports

def get_challenge_hash(chal_path, chal):
    directory_hash = dirhash(chal_path, 'sha256')
    full_hash = SHA256(directory_hash + inspect.getsource(chal.gen))
    return full_hash

def place_letter_highlighted(cell, letter):
    cell.value = letter
    cell.fill = openpyxl.styles.PatternFill(start_color="FFFF00", end_color="FFFF00", fill_type="solid")

def place_letter(cell, letter):
    cell.value = letter

def random_alphabet_letter():
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}"
    return random.choice(characters)

def get_cache_state(chal_path_lookup, chal, chals_lock):
    name = chal.name
    if chals_lock == {} or name not in chals_lock:
        return False, None
    images = subprocess.check_output(['docker', 'images', '--format', '{{.Repository}}']).decode().split('\n')
    if 'container_id' in chals_lock[name] and chals_lock[name]['container_id'] not in images:
        return False, None
    hash = get_challenge_hash(chal_path_lookup[name], chal)
    lock_hash = chals_lock[name]['hash']
    return hash == lock_hash, chals_lock[name]

logging.basicConfig(
    level="ERROR", format="%(message)s", datefmt="[%X]", handlers=[RichHandler()]
)
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)
logger = logging.getLogger("rich")
