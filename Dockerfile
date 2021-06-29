FROM ctfd/ctfd:latest
USER root
RUN pip install psycopg2-binary
ADD patches/ /patches
RUN ls /patches; cd /opt/CTFd; git apply /patches/*
USER 1001