FROM ctfd/ctfd:latest
USER root
RUN pip install psycopg2-binary
USER 1001