FROM accetto/ubuntu-vnc-xfce-firefox-g3
USER 0
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -yq --no-install-recommends exiftool wget wireshark ruby mousepad
RUN apt-get install -yq --no-install-recommends apt-transport-https ca-certificates gnupg lsb-release
RUN wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | apt-key add -
RUN echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list
RUN apt-get update && apt-get install -y \
    code
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN gem install zsteg
RUN echo "headless ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
USER 1000
