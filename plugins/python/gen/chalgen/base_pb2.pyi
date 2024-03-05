from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Challenge(_message.Message):
    __slots__ = ("base64", "twitter", "caesar", "pcap", "exif", "slack", "phone", "filemanager")
    BASE64_FIELD_NUMBER: _ClassVar[int]
    TWITTER_FIELD_NUMBER: _ClassVar[int]
    CAESAR_FIELD_NUMBER: _ClassVar[int]
    PCAP_FIELD_NUMBER: _ClassVar[int]
    EXIF_FIELD_NUMBER: _ClassVar[int]
    SLACK_FIELD_NUMBER: _ClassVar[int]
    PHONE_FIELD_NUMBER: _ClassVar[int]
    FILEMANAGER_FIELD_NUMBER: _ClassVar[int]
    base64: Base64
    twitter: Twitter
    caesar: CaesarCipher
    pcap: PCAP
    exif: Exif
    slack: Slack
    phone: Phone
    filemanager: FileManager
    def __init__(self, base64: _Optional[_Union[Base64, _Mapping]] = ..., twitter: _Optional[_Union[Twitter, _Mapping]] = ..., caesar: _Optional[_Union[CaesarCipher, _Mapping]] = ..., pcap: _Optional[_Union[PCAP, _Mapping]] = ..., exif: _Optional[_Union[Exif, _Mapping]] = ..., slack: _Optional[_Union[Slack, _Mapping]] = ..., phone: _Optional[_Union[Phone, _Mapping]] = ..., filemanager: _Optional[_Union[FileManager, _Mapping]] = ...) -> None: ...

class FileManager(_message.Message):
    __slots__ = ("urls", "password")
    URLS_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    urls: _containers.RepeatedScalarFieldContainer[str]
    password: str
    def __init__(self, urls: _Optional[_Iterable[str]] = ..., password: _Optional[str] = ...) -> None: ...

class Phone(_message.Message):
    __slots__ = ("apps",)
    APPS_FIELD_NUMBER: _ClassVar[int]
    apps: _containers.RepeatedCompositeFieldContainer[App]
    def __init__(self, apps: _Optional[_Iterable[_Union[App, _Mapping]]] = ...) -> None: ...

class App(_message.Message):
    __slots__ = ("name", "url", "html", "tracker", "photogallery")
    NAME_FIELD_NUMBER: _ClassVar[int]
    URL_FIELD_NUMBER: _ClassVar[int]
    HTML_FIELD_NUMBER: _ClassVar[int]
    TRACKER_FIELD_NUMBER: _ClassVar[int]
    PHOTOGALLERY_FIELD_NUMBER: _ClassVar[int]
    name: str
    url: str
    html: str
    tracker: Tracker
    photogallery: PhotoGallery
    def __init__(self, name: _Optional[str] = ..., url: _Optional[str] = ..., html: _Optional[str] = ..., tracker: _Optional[_Union[Tracker, _Mapping]] = ..., photogallery: _Optional[_Union[PhotoGallery, _Mapping]] = ...) -> None: ...

class Tracker(_message.Message):
    __slots__ = ("event",)
    EVENT_FIELD_NUMBER: _ClassVar[int]
    event: _containers.RepeatedCompositeFieldContainer[Event]
    def __init__(self, event: _Optional[_Iterable[_Union[Event, _Mapping]]] = ...) -> None: ...

class Event(_message.Message):
    __slots__ = ("timestamp", "name")
    TIMESTAMP_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    timestamp: int
    name: str
    def __init__(self, timestamp: _Optional[int] = ..., name: _Optional[str] = ...) -> None: ...

class PhotoGallery(_message.Message):
    __slots__ = ("url",)
    URL_FIELD_NUMBER: _ClassVar[int]
    url: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, url: _Optional[_Iterable[str]] = ...) -> None: ...

class Slack(_message.Message):
    __slots__ = ("users", "channels")
    USERS_FIELD_NUMBER: _ClassVar[int]
    CHANNELS_FIELD_NUMBER: _ClassVar[int]
    users: _containers.RepeatedCompositeFieldContainer[User]
    channels: _containers.RepeatedCompositeFieldContainer[Channel]
    def __init__(self, users: _Optional[_Iterable[_Union[User, _Mapping]]] = ..., channels: _Optional[_Iterable[_Union[Channel, _Mapping]]] = ...) -> None: ...

class Channel(_message.Message):
    __slots__ = ("name", "usernames", "messages")
    NAME_FIELD_NUMBER: _ClassVar[int]
    USERNAMES_FIELD_NUMBER: _ClassVar[int]
    MESSAGES_FIELD_NUMBER: _ClassVar[int]
    name: str
    usernames: _containers.RepeatedScalarFieldContainer[str]
    messages: _containers.RepeatedCompositeFieldContainer[Message]
    def __init__(self, name: _Optional[str] = ..., usernames: _Optional[_Iterable[str]] = ..., messages: _Optional[_Iterable[_Union[Message, _Mapping]]] = ...) -> None: ...

class Message(_message.Message):
    __slots__ = ("username", "content", "timestamp")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    TIMESTAMP_FIELD_NUMBER: _ClassVar[int]
    username: str
    content: str
    timestamp: int
    def __init__(self, username: _Optional[str] = ..., content: _Optional[str] = ..., timestamp: _Optional[int] = ...) -> None: ...

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
    __slots__ = ("username", "bio", "password")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    BIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    username: str
    bio: str
    password: str
    def __init__(self, username: _Optional[str] = ..., bio: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

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
