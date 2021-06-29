FROM ctfd/ctfd:1888-csv-import
USER root
RUN pip install psycopg2-binary
ADD patches/ /patches
RUN ls /patches; cd /opt/CTFd; git apply /patches/*; rm -r /patches
USER 1001