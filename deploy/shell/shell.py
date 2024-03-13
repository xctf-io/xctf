import os
import sys
import yaml
import json
import secrets
import string

def generate_password():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for i in range(16))

def generate_ingress_rules(number):
    rules = []
    hosts = []
    for i in range(number):
        host = "shells.mcpshsf.com".format(i)
        hosts.append(host)
        rules.append(
            {
                "host": host,
                "http": {
                    "paths": [
                        {
                            "pathType": "ImplementationSpecific",
                            "path": "/{}(/|$)(.*)".format(i),
                            "backend": {
                                "service": {
                                    "name": "shell-{}-svc".format(i),
                                    "port": {
                                        "number": 80
                                    }
                                }
                            }
                        }
                    ]
                }
            })

    return {
        "apiVersion": "networking.k8s.io/v1",
        "kind": "Ingress",
        "metadata": {
            "name": "shell-ingress",
            "namespace": "shells",
            "annotations": {
                "kubernetes.io/ingress.class": "nginx",
                "nginx.ingress.kubernetes.io/ssl-redirect": "true",
                "kubernetes.io/ingress.global-static-ip-name": "34.125.64.174",
                "cert-manager.io/cluster-issuer": "letsencrypt-prod",
                "acme.cert-manager.io/http01-edit-in-place": "true",
                "nginx.ingress.kubernetes.io/use-regex": "true",
                "nginx.ingress.kubernetes.io/rewrite-target": "/$2"
            }
        },
        "spec": {
            "tls": [
                {
                    "hosts": hosts,
                    "secretName": "shells-cert-secret"
                }
            ],
            "rules": rules
        }
    }

def create_pod(name, password):
    return {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
            "name": name,
            "namespace": "shells",
            "labels": {
                "application": name
            }
        },
        "spec": {
            "terminationGracePeriodSeconds": 5,
            "containers": [
                {
                    "name": "headless-vnc",
                    "image": "justluk/xfce-desktop",
                    "imagePullPolicy": "Always",
                    "env": [
                        {
                            "name": "VNC_PW",
                            "value": password
                        }
                    ],
                    "livenessProbe": {
                        "tcpSocket": {
                            "port": 5901
                        },
                        "initialDelaySeconds": 1,
                        "timeoutSeconds": 1
                    },
                    "readinessProbe": {
                        "httpGet": {
                            "path": "/",
                            "port": 6901,
                            "scheme": "HTTP"
                        },
                        "initialDelaySeconds": 1,
                        "timeoutSeconds": 1
                    },
                    "resources": {
                        "requests": {
                            "memory": "250Mi",
                            "cpu": "250m"
                        },
                        "limits": {
                            "memory": "750Mi",
                            "cpu": "750m"
                        }
                    }
                }
            ]
        }
    }

def create_service(name):
    return {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
            "labels": {
                "application": name
            },
            "name": f"{name}-svc",
            "namespace": "shells"
        },
        "spec": {
            "ports": [
                {
                    "name": "http-port-tcp",
                    "protocol": "TCP",
                    "port": 80,
                    "targetPort": 6901
                }
            ],
            "selector": {
                "application": name
            },
            "type": "ClusterIP"
        }
    }

# Example usage:
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"usage {sys.argv[0]} <number of shells>")
        sys.exit(1)

    passwords = {}
    password_file = "passwords.json"
    shell_folder = "shells"

    if not os.path.exists(shell_folder):
        os.mkdir(shell_folder)

    if os.path.isfile(password_file):
        with open(password_file, "r+") as f:
            passwords = json.load(f)

    shell_count = int(sys.argv[1])
    ingress = generate_ingress_rules(shell_count)
    with open(os.path.join(shell_folder, "ingress.yaml"), "w") as f:
        yaml.dump(ingress, f)

    for i in range(shell_count):
        name = f"shell-{i}"

        password = passwords.get(i)
        if password is None:
            password = generate_password()

        passwords[i] = password

        deployment = create_pod(name, password)
        service = create_service(name)
        with open(os.path.join(shell_folder, f"shell-{i}.yaml"), "w+") as f:
            yaml.dump(deployment, f)
            f.write("---\n")
            yaml.dump(service, f)

    with open(password_file, "w") as f:
        json.dump(passwords, f)
