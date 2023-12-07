from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor
FORM_UI_FIELD_NUMBER: _ClassVar[int]
form_ui: _descriptor.FieldDescriptor

class FormUI(_message.Message):
    __slots__ = ("visible",)
    VISIBLE_FIELD_NUMBER: _ClassVar[int]
    visible: bool
    def __init__(self, visible: bool = ...) -> None: ...

class Meta(_message.Message):
    __slots__ = ("id", "x", "y", "name", "flag", "entrypoint")
    ID_FIELD_NUMBER: _ClassVar[int]
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    FLAG_FIELD_NUMBER: _ClassVar[int]
    ENTRYPOINT_FIELD_NUMBER: _ClassVar[int]
    id: str
    x: int
    y: int
    name: str
    flag: str
    entrypoint: bool
    def __init__(self, id: _Optional[str] = ..., x: _Optional[int] = ..., y: _Optional[int] = ..., name: _Optional[str] = ..., flag: _Optional[str] = ..., entrypoint: bool = ...) -> None: ...

class Resources(_message.Message):
    __slots__ = ("build_dir",)
    BUILD_DIR_FIELD_NUMBER: _ClassVar[int]
    build_dir: str
    def __init__(self, build_dir: _Optional[str] = ...) -> None: ...
