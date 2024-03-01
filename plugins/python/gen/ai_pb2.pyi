from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Slack(_message.Message):
    __slots__ = ("users", "channels")
    USERS_FIELD_NUMBER: _ClassVar[int]
    CHANNELS_FIELD_NUMBER: _ClassVar[int]
    users: _containers.RepeatedCompositeFieldContainer[User]
    channels: _containers.RepeatedCompositeFieldContainer[Channel]
    def __init__(self, users: _Optional[_Iterable[_Union[User, _Mapping]]] = ..., channels: _Optional[_Iterable[_Union[Channel, _Mapping]]] = ...) -> None: ...

class User(_message.Message):
    __slots__ = ("username", "bio", "password")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    BIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    username: str
    bio: str
    password: str
    def __init__(self, username: _Optional[str] = ..., bio: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

class Channel(_message.Message):
    __slots__ = ("name", "messages")
    NAME_FIELD_NUMBER: _ClassVar[int]
    MESSAGES_FIELD_NUMBER: _ClassVar[int]
    name: str
    messages: _containers.RepeatedCompositeFieldContainer[Message]
    def __init__(self, name: _Optional[str] = ..., messages: _Optional[_Iterable[_Union[Message, _Mapping]]] = ...) -> None: ...

class Message(_message.Message):
    __slots__ = ("username", "content", "timestamp")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    TIMESTAMP_FIELD_NUMBER: _ClassVar[int]
    username: str
    content: str
    timestamp: str
    def __init__(self, username: _Optional[str] = ..., content: _Optional[str] = ..., timestamp: _Optional[str] = ...) -> None: ...
