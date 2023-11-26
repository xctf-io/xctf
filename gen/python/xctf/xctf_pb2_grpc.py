# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from chalgen import chalgen_pb2 as chalgen_dot_chalgen__pb2
from xctf import xctf_pb2 as xctf_dot_xctf__pb2


class BackendStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.Register = channel.unary_unary(
                '/xctf.Backend/Register',
                request_serializer=xctf_dot_xctf__pb2.RegisterRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.RegisterResponse.FromString,
                )
        self.Login = channel.unary_unary(
                '/xctf.Backend/Login',
                request_serializer=xctf_dot_xctf__pb2.LoginRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.LoginResponse.FromString,
                )
        self.Logout = channel.unary_unary(
                '/xctf.Backend/Logout',
                request_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.CurrentUser = channel.unary_unary(
                '/xctf.Backend/CurrentUser',
                request_serializer=xctf_dot_xctf__pb2.CurrentUserRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.CurrentUserResponse.FromString,
                )
        self.SubmitFlag = channel.unary_unary(
                '/xctf.Backend/SubmitFlag',
                request_serializer=xctf_dot_xctf__pb2.SubmitFlagRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.SubmitFlagResponse.FromString,
                )
        self.SubmitEvidenceReport = channel.unary_unary(
                '/xctf.Backend/SubmitEvidenceReport',
                request_serializer=xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.FromString,
                )
        self.GetDiscoveredEvidence = channel.unary_unary(
                '/xctf.Backend/GetDiscoveredEvidence',
                request_serializer=xctf_dot_xctf__pb2.GetDiscoveredEvidenceRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetDiscoveredEvidenceResponse.FromString,
                )
        self.SubmitEvidence = channel.unary_unary(
                '/xctf.Backend/SubmitEvidence',
                request_serializer=xctf_dot_xctf__pb2.SubmitEvidenceRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceResponse.FromString,
                )
        self.SubmitEvidenceConnection = channel.unary_unary(
                '/xctf.Backend/SubmitEvidenceConnection',
                request_serializer=xctf_dot_xctf__pb2.SubmitEvidenceConnectionRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceConnectionResponse.FromString,
                )
        self.GetHomePage = channel.unary_unary(
                '/xctf.Backend/GetHomePage',
                request_serializer=xctf_dot_xctf__pb2.GetHomePageRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetHomePageResponse.FromString,
                )
        self.ForgotPassword = channel.unary_unary(
                '/xctf.Backend/ForgotPassword',
                request_serializer=xctf_dot_xctf__pb2.ForgotPasswordRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.SubmitWriteup = channel.unary_unary(
                '/xctf.Backend/SubmitWriteup',
                request_serializer=xctf_dot_xctf__pb2.SubmitWriteupRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.Generate = channel.unary_unary(
                '/xctf.Backend/Generate',
                request_serializer=chalgen_dot_chalgen__pb2.GenerateRequest.SerializeToString,
                response_deserializer=chalgen_dot_chalgen__pb2.GenerateResponse.FromString,
                )
        self.ChallengeType = channel.unary_unary(
                '/xctf.Backend/ChallengeType',
                request_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.ChallengeTypeResponse.FromString,
                )


class BackendServicer(object):
    """Missing associated documentation comment in .proto file."""

    def Register(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Login(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Logout(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CurrentUser(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitFlag(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitEvidenceReport(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetDiscoveredEvidence(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitEvidence(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitEvidenceConnection(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetHomePage(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ForgotPassword(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitWriteup(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Generate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ChallengeType(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_BackendServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'Register': grpc.unary_unary_rpc_method_handler(
                    servicer.Register,
                    request_deserializer=xctf_dot_xctf__pb2.RegisterRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.RegisterResponse.SerializeToString,
            ),
            'Login': grpc.unary_unary_rpc_method_handler(
                    servicer.Login,
                    request_deserializer=xctf_dot_xctf__pb2.LoginRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.LoginResponse.SerializeToString,
            ),
            'Logout': grpc.unary_unary_rpc_method_handler(
                    servicer.Logout,
                    request_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'CurrentUser': grpc.unary_unary_rpc_method_handler(
                    servicer.CurrentUser,
                    request_deserializer=xctf_dot_xctf__pb2.CurrentUserRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.CurrentUserResponse.SerializeToString,
            ),
            'SubmitFlag': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitFlag,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitFlagRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.SubmitFlagResponse.SerializeToString,
            ),
            'SubmitEvidenceReport': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitEvidenceReport,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.SerializeToString,
            ),
            'GetDiscoveredEvidence': grpc.unary_unary_rpc_method_handler(
                    servicer.GetDiscoveredEvidence,
                    request_deserializer=xctf_dot_xctf__pb2.GetDiscoveredEvidenceRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetDiscoveredEvidenceResponse.SerializeToString,
            ),
            'SubmitEvidence': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitEvidence,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.SubmitEvidenceResponse.SerializeToString,
            ),
            'SubmitEvidenceConnection': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitEvidenceConnection,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitEvidenceConnectionRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.SubmitEvidenceConnectionResponse.SerializeToString,
            ),
            'GetHomePage': grpc.unary_unary_rpc_method_handler(
                    servicer.GetHomePage,
                    request_deserializer=xctf_dot_xctf__pb2.GetHomePageRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetHomePageResponse.SerializeToString,
            ),
            'ForgotPassword': grpc.unary_unary_rpc_method_handler(
                    servicer.ForgotPassword,
                    request_deserializer=xctf_dot_xctf__pb2.ForgotPasswordRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'SubmitWriteup': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitWriteup,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitWriteupRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'Generate': grpc.unary_unary_rpc_method_handler(
                    servicer.Generate,
                    request_deserializer=chalgen_dot_chalgen__pb2.GenerateRequest.FromString,
                    response_serializer=chalgen_dot_chalgen__pb2.GenerateResponse.SerializeToString,
            ),
            'ChallengeType': grpc.unary_unary_rpc_method_handler(
                    servicer.ChallengeType,
                    request_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                    response_serializer=xctf_dot_xctf__pb2.ChallengeTypeResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'xctf.Backend', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Backend(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def Register(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/Register',
            xctf_dot_xctf__pb2.RegisterRequest.SerializeToString,
            xctf_dot_xctf__pb2.RegisterResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Login(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/Login',
            xctf_dot_xctf__pb2.LoginRequest.SerializeToString,
            xctf_dot_xctf__pb2.LoginResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Logout(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/Logout',
            xctf_dot_xctf__pb2.Empty.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CurrentUser(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/CurrentUser',
            xctf_dot_xctf__pb2.CurrentUserRequest.SerializeToString,
            xctf_dot_xctf__pb2.CurrentUserResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitFlag(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/SubmitFlag',
            xctf_dot_xctf__pb2.SubmitFlagRequest.SerializeToString,
            xctf_dot_xctf__pb2.SubmitFlagResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitEvidenceReport(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/SubmitEvidenceReport',
            xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.SerializeToString,
            xctf_dot_xctf__pb2.SubmitEvidenceReportRequest.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetDiscoveredEvidence(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/GetDiscoveredEvidence',
            xctf_dot_xctf__pb2.GetDiscoveredEvidenceRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetDiscoveredEvidenceResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitEvidence(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/SubmitEvidence',
            xctf_dot_xctf__pb2.SubmitEvidenceRequest.SerializeToString,
            xctf_dot_xctf__pb2.SubmitEvidenceResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitEvidenceConnection(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/SubmitEvidenceConnection',
            xctf_dot_xctf__pb2.SubmitEvidenceConnectionRequest.SerializeToString,
            xctf_dot_xctf__pb2.SubmitEvidenceConnectionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetHomePage(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/GetHomePage',
            xctf_dot_xctf__pb2.GetHomePageRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetHomePageResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ForgotPassword(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/ForgotPassword',
            xctf_dot_xctf__pb2.ForgotPasswordRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitWriteup(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/SubmitWriteup',
            xctf_dot_xctf__pb2.SubmitWriteupRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Generate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/Generate',
            chalgen_dot_chalgen__pb2.GenerateRequest.SerializeToString,
            chalgen_dot_chalgen__pb2.GenerateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ChallengeType(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Backend/ChallengeType',
            xctf_dot_xctf__pb2.Empty.SerializeToString,
            xctf_dot_xctf__pb2.ChallengeTypeResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)


class AdminStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.UpsertChallenge = channel.unary_unary(
                '/xctf.Admin/UpsertChallenge',
                request_serializer=xctf_dot_xctf__pb2.UpsertChallengeRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.DeleteChallenge = channel.unary_unary(
                '/xctf.Admin/DeleteChallenge',
                request_serializer=xctf_dot_xctf__pb2.DeleteChallengeRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.GetTeamsProgress = channel.unary_unary(
                '/xctf.Admin/GetTeamsProgress',
                request_serializer=xctf_dot_xctf__pb2.GetTeamsProgressRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetTeamsProgressResponse.FromString,
                )
        self.GetAllChallenges = channel.unary_unary(
                '/xctf.Admin/GetAllChallenges',
                request_serializer=xctf_dot_xctf__pb2.GetAllChallengesRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetAllChallengesResponse.FromString,
                )
        self.SetHomePage = channel.unary_unary(
                '/xctf.Admin/SetHomePage',
                request_serializer=xctf_dot_xctf__pb2.SetHomePageRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.GetWriteup = channel.unary_unary(
                '/xctf.Admin/GetWriteup',
                request_serializer=xctf_dot_xctf__pb2.GetWriteupRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetWriteupResponse.FromString,
                )
        self.SubmitGrade = channel.unary_unary(
                '/xctf.Admin/SubmitGrade',
                request_serializer=xctf_dot_xctf__pb2.SubmitGradeRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.SubmitComment = channel.unary_unary(
                '/xctf.Admin/SubmitComment',
                request_serializer=xctf_dot_xctf__pb2.SubmitCommentRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.Empty.FromString,
                )
        self.GetComments = channel.unary_unary(
                '/xctf.Admin/GetComments',
                request_serializer=xctf_dot_xctf__pb2.GetCommentsRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetCommentsResponse.FromString,
                )
        self.GetUserGraph = channel.unary_unary(
                '/xctf.Admin/GetUserGraph',
                request_serializer=xctf_dot_xctf__pb2.GetUserGraphRequest.SerializeToString,
                response_deserializer=xctf_dot_xctf__pb2.GetUserGraphResponse.FromString,
                )


class AdminServicer(object):
    """Missing associated documentation comment in .proto file."""

    def UpsertChallenge(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteChallenge(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetTeamsProgress(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetAllChallenges(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SetHomePage(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetWriteup(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitGrade(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SubmitComment(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetComments(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetUserGraph(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AdminServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'UpsertChallenge': grpc.unary_unary_rpc_method_handler(
                    servicer.UpsertChallenge,
                    request_deserializer=xctf_dot_xctf__pb2.UpsertChallengeRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'DeleteChallenge': grpc.unary_unary_rpc_method_handler(
                    servicer.DeleteChallenge,
                    request_deserializer=xctf_dot_xctf__pb2.DeleteChallengeRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'GetTeamsProgress': grpc.unary_unary_rpc_method_handler(
                    servicer.GetTeamsProgress,
                    request_deserializer=xctf_dot_xctf__pb2.GetTeamsProgressRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetTeamsProgressResponse.SerializeToString,
            ),
            'GetAllChallenges': grpc.unary_unary_rpc_method_handler(
                    servicer.GetAllChallenges,
                    request_deserializer=xctf_dot_xctf__pb2.GetAllChallengesRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetAllChallengesResponse.SerializeToString,
            ),
            'SetHomePage': grpc.unary_unary_rpc_method_handler(
                    servicer.SetHomePage,
                    request_deserializer=xctf_dot_xctf__pb2.SetHomePageRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'GetWriteup': grpc.unary_unary_rpc_method_handler(
                    servicer.GetWriteup,
                    request_deserializer=xctf_dot_xctf__pb2.GetWriteupRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetWriteupResponse.SerializeToString,
            ),
            'SubmitGrade': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitGrade,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitGradeRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'SubmitComment': grpc.unary_unary_rpc_method_handler(
                    servicer.SubmitComment,
                    request_deserializer=xctf_dot_xctf__pb2.SubmitCommentRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.Empty.SerializeToString,
            ),
            'GetComments': grpc.unary_unary_rpc_method_handler(
                    servicer.GetComments,
                    request_deserializer=xctf_dot_xctf__pb2.GetCommentsRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetCommentsResponse.SerializeToString,
            ),
            'GetUserGraph': grpc.unary_unary_rpc_method_handler(
                    servicer.GetUserGraph,
                    request_deserializer=xctf_dot_xctf__pb2.GetUserGraphRequest.FromString,
                    response_serializer=xctf_dot_xctf__pb2.GetUserGraphResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'xctf.Admin', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Admin(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def UpsertChallenge(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/UpsertChallenge',
            xctf_dot_xctf__pb2.UpsertChallengeRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteChallenge(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/DeleteChallenge',
            xctf_dot_xctf__pb2.DeleteChallengeRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetTeamsProgress(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/GetTeamsProgress',
            xctf_dot_xctf__pb2.GetTeamsProgressRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetTeamsProgressResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetAllChallenges(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/GetAllChallenges',
            xctf_dot_xctf__pb2.GetAllChallengesRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetAllChallengesResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SetHomePage(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/SetHomePage',
            xctf_dot_xctf__pb2.SetHomePageRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetWriteup(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/GetWriteup',
            xctf_dot_xctf__pb2.GetWriteupRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetWriteupResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitGrade(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/SubmitGrade',
            xctf_dot_xctf__pb2.SubmitGradeRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SubmitComment(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/SubmitComment',
            xctf_dot_xctf__pb2.SubmitCommentRequest.SerializeToString,
            xctf_dot_xctf__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetComments(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/GetComments',
            xctf_dot_xctf__pb2.GetCommentsRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetCommentsResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetUserGraph(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/xctf.Admin/GetUserGraph',
            xctf_dot_xctf__pb2.GetUserGraphRequest.SerializeToString,
            xctf_dot_xctf__pb2.GetUserGraphResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
