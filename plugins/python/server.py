import os

import logging
import sys
from concurrent import futures
from grpc_reflection.v1alpha import reflection
import grpc

from gen.plugin import python_pb2_grpc
from gen.plugin import python_pb2

if os.environ.get('LOG_LEVEL') is not None and os.environ.get('LOG_LEVEL').lower() == "debug":
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
    logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))


class PythonSerivce(python_pb2_grpc.PythonServiceServicer):
    def Generate(self, req: python_pb2.GenerateRequest, context):
        logging.info("Generating challenge", req)
        chal_oneof = req.challenge.WhichOneof('challenge')
        if chal_oneof == "exif":
            return python_pb2.GenerateResponse(display=req.challenge.string)

        raise Exception(f"Unknown challenge type: {chal_oneof}")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    python_pb2_grpc.add_PythonServiceServicer_to_server(
        PythonSerivce(), server)
    SERVICE_NAMES = (
        python_pb2.DESCRIPTOR.services_by_name['PythonService'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)

    server.add_insecure_port('[::]:50051')
    print("Server started on port 50051")
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()