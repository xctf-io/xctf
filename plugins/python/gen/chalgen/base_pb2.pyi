from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Challenge(_message.Message):
    __slots__ = ("base64", "twitter", "caesar", "pcap", "exif")
    BASE64_FIELD_NUMBER: _ClassVar[int]
    TWITTER_FIELD_NUMBER: _ClassVar[int]
    CAESAR_FIELD_NUMBER: _ClassVar[int]
    PCAP_FIELD_NUMBER: _ClassVar[int]
    EXIF_FIELD_NUMBER: _ClassVar[int]
    base64: Base64
    twitter: Twitter
    caesar: CaesarCipher
    pcap: PCAP
    exif: Exif
    def __init__(self, base64: _Optional[_Union[Base64, _Mapping]] = ..., twitter: _Optional[_Union[Twitter, _Mapping]] = ..., caesar: _Optional[_Union[CaesarCipher, _Mapping]] = ..., pcap: _Optional[_Union[PCAP, _Mapping]] = ..., exif: _Optional[_Union[Exif, _Mapping]] = ...) -> None: ...

class Exif(_message.Message):
    __slots__ = ("key", "value")
    KEY_FIELD_NUMBER: _ClassVar[int]
    VALUE_FIELD_NUMBER: _ClassVar[int]
    key: str
    value: str
    def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...

class PCAP(_message.Message):
    __slots__ = ("packets",)
    PACKETS_FIELD_NUMBER: _ClassVar[int]
    packets: _containers.RepeatedCompositeFieldContainer[Packet]
    def __init__(self, packets: _Optional[_Iterable[_Union[Packet, _Mapping]]] = ...) -> None: ...

class Packet(_message.Message):
    __slots__ = ("timestamp", "source", "destination", "protocol", "data")
    TIMESTAMP_FIELD_NUMBER: _ClassVar[int]
    SOURCE_FIELD_NUMBER: _ClassVar[int]
    DESTINATION_FIELD_NUMBER: _ClassVar[int]
    PROTOCOL_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    timestamp: int
    source: str
    destination: str
    protocol: str
    data: str
    def __init__(self, timestamp: _Optional[int] = ..., source: _Optional[str] = ..., destination: _Optional[str] = ..., protocol: _Optional[str] = ..., data: _Optional[str] = ...) -> None: ...

class CaesarCipher(_message.Message):
    __slots__ = ("plaintext", "shift")
    PLAINTEXT_FIELD_NUMBER: _ClassVar[int]
    SHIFT_FIELD_NUMBER: _ClassVar[int]
    plaintext: str
    shift: int
    def __init__(self, plaintext: _Optional[str] = ..., shift: _Optional[int] = ...) -> None: ...

class Base64(_message.Message):
    __slots__ = ("data",)
    DATA_FIELD_NUMBER: _ClassVar[int]
    data: str
    def __init__(self, data: _Optional[str] = ...) -> None: ...

class Twitter(_message.Message):
    __slots__ = ("users", "posts", "comments")
    USERS_FIELD_NUMBER: _ClassVar[int]
    POSTS_FIELD_NUMBER: _ClassVar[int]
    COMMENTS_FIELD_NUMBER: _ClassVar[int]
    users: _containers.RepeatedCompositeFieldContainer[User]
    posts: _containers.RepeatedCompositeFieldContainer[Post]
    comments: _containers.RepeatedCompositeFieldContainer[Comment]
    def __init__(self, users: _Optional[_Iterable[_Union[User, _Mapping]]] = ..., posts: _Optional[_Iterable[_Union[Post, _Mapping]]] = ..., comments: _Optional[_Iterable[_Union[Comment, _Mapping]]] = ...) -> None: ...

class User(_message.Message):
    __slots__ = ("username", "bio")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    BIO_FIELD_NUMBER: _ClassVar[int]
    username: str
    bio: str
    def __init__(self, username: _Optional[str] = ..., bio: _Optional[str] = ...) -> None: ...

class Post(_message.Message):
    __slots__ = ("username", "content")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    username: str
    content: str
    def __init__(self, username: _Optional[str] = ..., content: _Optional[str] = ...) -> None: ...

class Comment(_message.Message):
    __slots__ = ("post_number", "username", "content")
    POST_NUMBER_FIELD_NUMBER: _ClassVar[int]
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    post_number: int
    username: int
    content: str
    def __init__(self, post_number: _Optional[int] = ..., username: _Optional[int] = ..., content: _Optional[str] = ...) -> None: ...
