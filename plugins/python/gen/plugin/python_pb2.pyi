from chals import config_pb2 as _config_pb2
from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class PythonChallenge(_message.Message):
    __slots__ = ("exif",)
    EXIF_FIELD_NUMBER: _ClassVar[int]
    exif: Exif
    def __init__(self, exif: _Optional[_Union[Exif, _Mapping]] = ...) -> None: ...

class Exif(_message.Message):
    __slots__ = ("key", "value")
    KEY_FIELD_NUMBER: _ClassVar[int]
    VALUE_FIELD_NUMBER: _ClassVar[int]
    key: str
    value: str
    def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...

class GenerateRequest(_message.Message):
    __slots__ = ("meta", "challenge", "resources")
    META_FIELD_NUMBER: _ClassVar[int]
    CHALLENGE_FIELD_NUMBER: _ClassVar[int]
    RESOURCES_FIELD_NUMBER: _ClassVar[int]
    meta: _config_pb2.Meta
    challenge: PythonChallenge
    resources: _config_pb2.Resources
    def __init__(self, meta: _Optional[_Union[_config_pb2.Meta, _Mapping]] = ..., challenge: _Optional[_Union[PythonChallenge, _Mapping]] = ..., resources: _Optional[_Union[_config_pb2.Resources, _Mapping]] = ...) -> None: ...

class GenerateResponse(_message.Message):
    __slots__ = ("display", "file")
    DISPLAY_FIELD_NUMBER: _ClassVar[int]
    FILE_FIELD_NUMBER: _ClassVar[int]
    display: str
    file: str
    def __init__(self, display: _Optional[str] = ..., file: _Optional[str] = ...) -> None: ...
