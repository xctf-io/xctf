from chalgen import graph_pb2 as _graph_pb2
from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class SetComputerRequest(_message.Message):
    __slots__ = ("id", "password", "computer_id")
    ID_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    COMPUTER_ID_FIELD_NUMBER: _ClassVar[int]
    id: str
    password: str
    computer_id: str
    def __init__(self, id: _Optional[str] = ..., password: _Optional[str] = ..., computer_id: _Optional[str] = ...) -> None: ...

class GetComputerRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetComputerResponse(_message.Message):
    __slots__ = ("url", "loading")
    URL_FIELD_NUMBER: _ClassVar[int]
    LOADING_FIELD_NUMBER: _ClassVar[int]
    url: str
    loading: bool
    def __init__(self, url: _Optional[str] = ..., loading: bool = ...) -> None: ...

class ExportChallengeResponse(_message.Message):
    __slots__ = ("yaml",)
    YAML_FIELD_NUMBER: _ClassVar[int]
    yaml: str
    def __init__(self, yaml: _Optional[str] = ...) -> None: ...

class ImportChallengeRequest(_message.Message):
    __slots__ = ("yaml",)
    YAML_FIELD_NUMBER: _ClassVar[int]
    yaml: str
    def __init__(self, yaml: _Optional[str] = ...) -> None: ...

class ImportChallengeResponse(_message.Message):
    __slots__ = ("chal",)
    CHAL_FIELD_NUMBER: _ClassVar[int]
    chal: _graph_pb2.Node
    def __init__(self, chal: _Optional[_Union[_graph_pb2.Node, _Mapping]] = ...) -> None: ...

class SignedURLRequest(_message.Message):
    __slots__ = ("path",)
    PATH_FIELD_NUMBER: _ClassVar[int]
    path: str
    def __init__(self, path: _Optional[str] = ...) -> None: ...

class SignedURLResponse(_message.Message):
    __slots__ = ("url",)
    URL_FIELD_NUMBER: _ClassVar[int]
    url: str
    def __init__(self, url: _Optional[str] = ...) -> None: ...

class RemoveRequest(_message.Message):
    __slots__ = ("path",)
    PATH_FIELD_NUMBER: _ClassVar[int]
    path: str
    def __init__(self, path: _Optional[str] = ...) -> None: ...

class RemoveResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ReaddirRequest(_message.Message):
    __slots__ = ("path",)
    PATH_FIELD_NUMBER: _ClassVar[int]
    path: str
    def __init__(self, path: _Optional[str] = ...) -> None: ...

class ReaddirResponse(_message.Message):
    __slots__ = ("files",)
    FILES_FIELD_NUMBER: _ClassVar[int]
    files: _containers.RepeatedCompositeFieldContainer[FileInfo]
    def __init__(self, files: _Optional[_Iterable[_Union[FileInfo, _Mapping]]] = ...) -> None: ...

class FileInfo(_message.Message):
    __slots__ = ("name", "size", "is_dir")
    NAME_FIELD_NUMBER: _ClassVar[int]
    SIZE_FIELD_NUMBER: _ClassVar[int]
    IS_DIR_FIELD_NUMBER: _ClassVar[int]
    name: str
    size: int
    is_dir: bool
    def __init__(self, name: _Optional[str] = ..., size: _Optional[int] = ..., is_dir: bool = ...) -> None: ...

class GetUserWriteupResponse(_message.Message):
    __slots__ = ("content",)
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    content: str
    def __init__(self, content: _Optional[str] = ...) -> None: ...

class GRPCTypeInfo(_message.Message):
    __slots__ = ("msg", "desc_lookup", "enum_lookup", "package_name")
    class DescLookupEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: _descriptor_pb2.DescriptorProto
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[_descriptor_pb2.DescriptorProto, _Mapping]] = ...) -> None: ...
    class EnumLookupEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: _descriptor_pb2.EnumDescriptorProto
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[_descriptor_pb2.EnumDescriptorProto, _Mapping]] = ...) -> None: ...
    MSG_FIELD_NUMBER: _ClassVar[int]
    DESC_LOOKUP_FIELD_NUMBER: _ClassVar[int]
    ENUM_LOOKUP_FIELD_NUMBER: _ClassVar[int]
    PACKAGE_NAME_FIELD_NUMBER: _ClassVar[int]
    msg: _descriptor_pb2.DescriptorProto
    desc_lookup: _containers.MessageMap[str, _descriptor_pb2.DescriptorProto]
    enum_lookup: _containers.MessageMap[str, _descriptor_pb2.EnumDescriptorProto]
    package_name: str
    def __init__(self, msg: _Optional[_Union[_descriptor_pb2.DescriptorProto, _Mapping]] = ..., desc_lookup: _Optional[_Mapping[str, _descriptor_pb2.DescriptorProto]] = ..., enum_lookup: _Optional[_Mapping[str, _descriptor_pb2.EnumDescriptorProto]] = ..., package_name: _Optional[str] = ...) -> None: ...

class ChallengeTypeResponse(_message.Message):
    __slots__ = ("type_info",)
    TYPE_INFO_FIELD_NUMBER: _ClassVar[int]
    type_info: GRPCTypeInfo
    def __init__(self, type_info: _Optional[_Union[GRPCTypeInfo, _Mapping]] = ...) -> None: ...

class Empty(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class UpsertChallengeRequest(_message.Message):
    __slots__ = ("challengeName", "flag")
    CHALLENGENAME_FIELD_NUMBER: _ClassVar[int]
    FLAG_FIELD_NUMBER: _ClassVar[int]
    challengeName: str
    flag: str
    def __init__(self, challengeName: _Optional[str] = ..., flag: _Optional[str] = ...) -> None: ...

class DeleteChallengeRequest(_message.Message):
    __slots__ = ("challengeName",)
    CHALLENGENAME_FIELD_NUMBER: _ClassVar[int]
    challengeName: str
    def __init__(self, challengeName: _Optional[str] = ...) -> None: ...

class SubmitEvidenceReportRequest(_message.Message):
    __slots__ = ("url",)
    URL_FIELD_NUMBER: _ClassVar[int]
    url: str
    def __init__(self, url: _Optional[str] = ...) -> None: ...

class SubmitEvidenceReportResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class LoginRequest(_message.Message):
    __slots__ = ("email", "password")
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    email: str
    password: str
    def __init__(self, email: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

class LoginResponse(_message.Message):
    __slots__ = ("username", "userRole")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    USERROLE_FIELD_NUMBER: _ClassVar[int]
    username: str
    userRole: str
    def __init__(self, username: _Optional[str] = ..., userRole: _Optional[str] = ...) -> None: ...

class Evidence(_message.Message):
    __slots__ = ("id", "name", "challengeID", "x", "y", "isFlag")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    CHALLENGEID_FIELD_NUMBER: _ClassVar[int]
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    ISFLAG_FIELD_NUMBER: _ClassVar[int]
    id: int
    name: str
    challengeID: int
    x: int
    y: int
    isFlag: bool
    def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ..., challengeID: _Optional[int] = ..., x: _Optional[int] = ..., y: _Optional[int] = ..., isFlag: bool = ...) -> None: ...

class Connection(_message.Message):
    __slots__ = ("id", "source", "destination")
    ID_FIELD_NUMBER: _ClassVar[int]
    SOURCE_FIELD_NUMBER: _ClassVar[int]
    DESTINATION_FIELD_NUMBER: _ClassVar[int]
    id: int
    source: int
    destination: int
    def __init__(self, id: _Optional[int] = ..., source: _Optional[int] = ..., destination: _Optional[int] = ...) -> None: ...

class GetDiscoveredEvidenceRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetDiscoveredEvidenceResponse(_message.Message):
    __slots__ = ("report", "evidence", "connections")
    REPORT_FIELD_NUMBER: _ClassVar[int]
    EVIDENCE_FIELD_NUMBER: _ClassVar[int]
    CONNECTIONS_FIELD_NUMBER: _ClassVar[int]
    report: str
    evidence: _containers.RepeatedCompositeFieldContainer[Evidence]
    connections: _containers.RepeatedCompositeFieldContainer[Connection]
    def __init__(self, report: _Optional[str] = ..., evidence: _Optional[_Iterable[_Union[Evidence, _Mapping]]] = ..., connections: _Optional[_Iterable[_Union[Connection, _Mapping]]] = ...) -> None: ...

class SubmitEvidenceRequest(_message.Message):
    __slots__ = ("evidence", "x", "y", "isFlag", "remove")
    EVIDENCE_FIELD_NUMBER: _ClassVar[int]
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    ISFLAG_FIELD_NUMBER: _ClassVar[int]
    REMOVE_FIELD_NUMBER: _ClassVar[int]
    evidence: str
    x: int
    y: int
    isFlag: bool
    remove: bool
    def __init__(self, evidence: _Optional[str] = ..., x: _Optional[int] = ..., y: _Optional[int] = ..., isFlag: bool = ..., remove: bool = ...) -> None: ...

class SubmitEvidenceResponse(_message.Message):
    __slots__ = ("name",)
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class SubmitEvidenceConnectionRequest(_message.Message):
    __slots__ = ("source", "destination", "remove")
    SOURCE_FIELD_NUMBER: _ClassVar[int]
    DESTINATION_FIELD_NUMBER: _ClassVar[int]
    REMOVE_FIELD_NUMBER: _ClassVar[int]
    source: int
    destination: int
    remove: bool
    def __init__(self, source: _Optional[int] = ..., destination: _Optional[int] = ..., remove: bool = ...) -> None: ...

class SubmitEvidenceConnectionResponse(_message.Message):
    __slots__ = ("created",)
    CREATED_FIELD_NUMBER: _ClassVar[int]
    created: bool
    def __init__(self, created: bool = ...) -> None: ...

class RegisterRequest(_message.Message):
    __slots__ = ("username", "email", "password")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    username: str
    email: str
    password: str
    def __init__(self, username: _Optional[str] = ..., email: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

class RegisterResponse(_message.Message):
    __slots__ = ("created",)
    CREATED_FIELD_NUMBER: _ClassVar[int]
    created: bool
    def __init__(self, created: bool = ...) -> None: ...

class Page(_message.Message):
    __slots__ = ("route", "title", "content")
    ROUTE_FIELD_NUMBER: _ClassVar[int]
    TITLE_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    route: str
    title: str
    content: str
    def __init__(self, route: _Optional[str] = ..., title: _Optional[str] = ..., content: _Optional[str] = ...) -> None: ...

class CurrentUserRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class CurrentUserResponse(_message.Message):
    __slots__ = ("username", "userRole", "pages")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    USERROLE_FIELD_NUMBER: _ClassVar[int]
    PAGES_FIELD_NUMBER: _ClassVar[int]
    username: str
    userRole: str
    pages: _containers.RepeatedCompositeFieldContainer[Page]
    def __init__(self, username: _Optional[str] = ..., userRole: _Optional[str] = ..., pages: _Optional[_Iterable[_Union[Page, _Mapping]]] = ...) -> None: ...

class SubmitFlagRequest(_message.Message):
    __slots__ = ("flag",)
    FLAG_FIELD_NUMBER: _ClassVar[int]
    flag: str
    def __init__(self, flag: _Optional[str] = ...) -> None: ...

class SubmitFlagResponse(_message.Message):
    __slots__ = ("correct",)
    CORRECT_FIELD_NUMBER: _ClassVar[int]
    correct: bool
    def __init__(self, correct: bool = ...) -> None: ...

class TeamProgress(_message.Message):
    __slots__ = ("teamName", "hasWriteup", "score", "grade")
    TEAMNAME_FIELD_NUMBER: _ClassVar[int]
    HASWRITEUP_FIELD_NUMBER: _ClassVar[int]
    SCORE_FIELD_NUMBER: _ClassVar[int]
    GRADE_FIELD_NUMBER: _ClassVar[int]
    teamName: str
    hasWriteup: bool
    score: int
    grade: int
    def __init__(self, teamName: _Optional[str] = ..., hasWriteup: bool = ..., score: _Optional[int] = ..., grade: _Optional[int] = ...) -> None: ...

class GetTeamsProgressRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetTeamsProgressResponse(_message.Message):
    __slots__ = ("teams",)
    TEAMS_FIELD_NUMBER: _ClassVar[int]
    teams: _containers.RepeatedCompositeFieldContainer[TeamProgress]
    def __init__(self, teams: _Optional[_Iterable[_Union[TeamProgress, _Mapping]]] = ...) -> None: ...

class Challenge(_message.Message):
    __slots__ = ("name", "flag")
    NAME_FIELD_NUMBER: _ClassVar[int]
    FLAG_FIELD_NUMBER: _ClassVar[int]
    name: str
    flag: str
    def __init__(self, name: _Optional[str] = ..., flag: _Optional[str] = ...) -> None: ...

class GetAllChallengesRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetAllChallengesResponse(_message.Message):
    __slots__ = ("challenges",)
    CHALLENGES_FIELD_NUMBER: _ClassVar[int]
    challenges: _containers.RepeatedCompositeFieldContainer[Challenge]
    def __init__(self, challenges: _Optional[_Iterable[_Union[Challenge, _Mapping]]] = ...) -> None: ...

class SetHomePageRequest(_message.Message):
    __slots__ = ("content",)
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    content: str
    def __init__(self, content: _Optional[str] = ...) -> None: ...

class GetHomePageRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetHomePageResponse(_message.Message):
    __slots__ = ("content", "entrypoints")
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    ENTRYPOINTS_FIELD_NUMBER: _ClassVar[int]
    content: str
    entrypoints: _containers.RepeatedCompositeFieldContainer[Entrypoint]
    def __init__(self, content: _Optional[str] = ..., entrypoints: _Optional[_Iterable[_Union[Entrypoint, _Mapping]]] = ...) -> None: ...

class Entrypoint(_message.Message):
    __slots__ = ("name", "route")
    NAME_FIELD_NUMBER: _ClassVar[int]
    ROUTE_FIELD_NUMBER: _ClassVar[int]
    name: str
    route: str
    def __init__(self, name: _Optional[str] = ..., route: _Optional[str] = ...) -> None: ...

class ForgotPasswordRequest(_message.Message):
    __slots__ = ("email",)
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    email: str
    def __init__(self, email: _Optional[str] = ...) -> None: ...

class SubmitWriteupRequest(_message.Message):
    __slots__ = ("content", "type")
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    content: str
    type: str
    def __init__(self, content: _Optional[str] = ..., type: _Optional[str] = ...) -> None: ...

class GetWriteupRequest(_message.Message):
    __slots__ = ("username",)
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    username: str
    def __init__(self, username: _Optional[str] = ...) -> None: ...

class GetWriteupResponse(_message.Message):
    __slots__ = ("content", "type")
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    content: str
    type: str
    def __init__(self, content: _Optional[str] = ..., type: _Optional[str] = ...) -> None: ...

class SubmitGradeRequest(_message.Message):
    __slots__ = ("username", "score")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    SCORE_FIELD_NUMBER: _ClassVar[int]
    username: str
    score: int
    def __init__(self, username: _Optional[str] = ..., score: _Optional[int] = ...) -> None: ...

class HighlightArea(_message.Message):
    __slots__ = ("height", "width", "pageIndex", "top", "left")
    HEIGHT_FIELD_NUMBER: _ClassVar[int]
    WIDTH_FIELD_NUMBER: _ClassVar[int]
    PAGEINDEX_FIELD_NUMBER: _ClassVar[int]
    TOP_FIELD_NUMBER: _ClassVar[int]
    LEFT_FIELD_NUMBER: _ClassVar[int]
    height: float
    width: float
    pageIndex: int
    top: float
    left: float
    def __init__(self, height: _Optional[float] = ..., width: _Optional[float] = ..., pageIndex: _Optional[int] = ..., top: _Optional[float] = ..., left: _Optional[float] = ...) -> None: ...

class SubmitCommentRequest(_message.Message):
    __slots__ = ("username", "id", "content", "areas", "quote")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    AREAS_FIELD_NUMBER: _ClassVar[int]
    QUOTE_FIELD_NUMBER: _ClassVar[int]
    username: str
    id: int
    content: str
    areas: _containers.RepeatedCompositeFieldContainer[HighlightArea]
    quote: str
    def __init__(self, username: _Optional[str] = ..., id: _Optional[int] = ..., content: _Optional[str] = ..., areas: _Optional[_Iterable[_Union[HighlightArea, _Mapping]]] = ..., quote: _Optional[str] = ...) -> None: ...

class GetCommentsRequest(_message.Message):
    __slots__ = ("username",)
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    username: str
    def __init__(self, username: _Optional[str] = ...) -> None: ...

class Comment(_message.Message):
    __slots__ = ("id", "content", "areas", "quote")
    ID_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    AREAS_FIELD_NUMBER: _ClassVar[int]
    QUOTE_FIELD_NUMBER: _ClassVar[int]
    id: int
    content: str
    areas: _containers.RepeatedCompositeFieldContainer[HighlightArea]
    quote: str
    def __init__(self, id: _Optional[int] = ..., content: _Optional[str] = ..., areas: _Optional[_Iterable[_Union[HighlightArea, _Mapping]]] = ..., quote: _Optional[str] = ...) -> None: ...

class GetCommentsResponse(_message.Message):
    __slots__ = ("comments",)
    COMMENTS_FIELD_NUMBER: _ClassVar[int]
    comments: _containers.RepeatedCompositeFieldContainer[Comment]
    def __init__(self, comments: _Optional[_Iterable[_Union[Comment, _Mapping]]] = ...) -> None: ...

class GetUserGraphRequest(_message.Message):
    __slots__ = ("username",)
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    username: str
    def __init__(self, username: _Optional[str] = ...) -> None: ...

class GetUserGraphResponse(_message.Message):
    __slots__ = ("evidence", "connections")
    EVIDENCE_FIELD_NUMBER: _ClassVar[int]
    CONNECTIONS_FIELD_NUMBER: _ClassVar[int]
    evidence: _containers.RepeatedCompositeFieldContainer[Evidence]
    connections: _containers.RepeatedCompositeFieldContainer[Connection]
    def __init__(self, evidence: _Optional[_Iterable[_Union[Evidence, _Mapping]]] = ..., connections: _Optional[_Iterable[_Union[Connection, _Mapping]]] = ...) -> None: ...
