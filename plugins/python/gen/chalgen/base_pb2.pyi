from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Challenge(_message.Message):
    __slots__ = ("base64", "twitter", "caesar", "pcap", "exif", "slack", "phone", "filemanager", "maze", "xor", "zip", "pdf", "search", "passshare", "hashes", "audioplayer")
    BASE64_FIELD_NUMBER: _ClassVar[int]
    TWITTER_FIELD_NUMBER: _ClassVar[int]
    CAESAR_FIELD_NUMBER: _ClassVar[int]
    PCAP_FIELD_NUMBER: _ClassVar[int]
    EXIF_FIELD_NUMBER: _ClassVar[int]
    SLACK_FIELD_NUMBER: _ClassVar[int]
    PHONE_FIELD_NUMBER: _ClassVar[int]
    FILEMANAGER_FIELD_NUMBER: _ClassVar[int]
    MAZE_FIELD_NUMBER: _ClassVar[int]
    XOR_FIELD_NUMBER: _ClassVar[int]
    ZIP_FIELD_NUMBER: _ClassVar[int]
    PDF_FIELD_NUMBER: _ClassVar[int]
    SEARCH_FIELD_NUMBER: _ClassVar[int]
    PASSSHARE_FIELD_NUMBER: _ClassVar[int]
    HASHES_FIELD_NUMBER: _ClassVar[int]
    AUDIOPLAYER_FIELD_NUMBER: _ClassVar[int]
    base64: Base64
    twitter: Twitter
    caesar: CaesarCipher
    pcap: PCAP
    exif: Exif
    slack: Slack
    phone: Phone
    filemanager: FileManager
    maze: Maze
    xor: Xor
    zip: Zip
    pdf: Pdf
    search: Search
    passshare: PassShare
    hashes: Hashes
    audioplayer: AudioPlayer
    def __init__(self, base64: _Optional[_Union[Base64, _Mapping]] = ..., twitter: _Optional[_Union[Twitter, _Mapping]] = ..., caesar: _Optional[_Union[CaesarCipher, _Mapping]] = ..., pcap: _Optional[_Union[PCAP, _Mapping]] = ..., exif: _Optional[_Union[Exif, _Mapping]] = ..., slack: _Optional[_Union[Slack, _Mapping]] = ..., phone: _Optional[_Union[Phone, _Mapping]] = ..., filemanager: _Optional[_Union[FileManager, _Mapping]] = ..., maze: _Optional[_Union[Maze, _Mapping]] = ..., xor: _Optional[_Union[Xor, _Mapping]] = ..., zip: _Optional[_Union[Zip, _Mapping]] = ..., pdf: _Optional[_Union[Pdf, _Mapping]] = ..., search: _Optional[_Union[Search, _Mapping]] = ..., passshare: _Optional[_Union[PassShare, _Mapping]] = ..., hashes: _Optional[_Union[Hashes, _Mapping]] = ..., audioplayer: _Optional[_Union[AudioPlayer, _Mapping]] = ...) -> None: ...

class AudioPlayer(_message.Message):
    __slots__ = ("songs",)
    SONGS_FIELD_NUMBER: _ClassVar[int]
    songs: _containers.RepeatedCompositeFieldContainer[Song]
    def __init__(self, songs: _Optional[_Iterable[_Union[Song, _Mapping]]] = ...) -> None: ...

class Song(_message.Message):
    __slots__ = ("title", "artist", "url")
    TITLE_FIELD_NUMBER: _ClassVar[int]
    ARTIST_FIELD_NUMBER: _ClassVar[int]
    URL_FIELD_NUMBER: _ClassVar[int]
    title: str
    artist: str
    url: str
    def __init__(self, title: _Optional[str] = ..., artist: _Optional[str] = ..., url: _Optional[str] = ...) -> None: ...

class Hashes(_message.Message):
    __slots__ = ("seed", "format", "count", "overrides", "length")
    SEED_FIELD_NUMBER: _ClassVar[int]
    FORMAT_FIELD_NUMBER: _ClassVar[int]
    COUNT_FIELD_NUMBER: _ClassVar[int]
    OVERRIDES_FIELD_NUMBER: _ClassVar[int]
    LENGTH_FIELD_NUMBER: _ClassVar[int]
    seed: str
    format: str
    count: int
    overrides: _containers.RepeatedCompositeFieldContainer[Override]
    length: int
    def __init__(self, seed: _Optional[str] = ..., format: _Optional[str] = ..., count: _Optional[int] = ..., overrides: _Optional[_Iterable[_Union[Override, _Mapping]]] = ..., length: _Optional[int] = ...) -> None: ...

class Override(_message.Message):
    __slots__ = ("index", "text")
    INDEX_FIELD_NUMBER: _ClassVar[int]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    index: int
    text: str
    def __init__(self, index: _Optional[int] = ..., text: _Optional[str] = ...) -> None: ...

class PassShare(_message.Message):
    __slots__ = ("password", "hash")
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    HASH_FIELD_NUMBER: _ClassVar[int]
    password: str
    hash: str
    def __init__(self, password: _Optional[str] = ..., hash: _Optional[str] = ...) -> None: ...

class Search(_message.Message):
    __slots__ = ("entry", "password")
    ENTRY_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    entry: _containers.RepeatedScalarFieldContainer[str]
    password: str
    def __init__(self, entry: _Optional[_Iterable[str]] = ..., password: _Optional[str] = ...) -> None: ...

class Pdf(_message.Message):
    __slots__ = ("content",)
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    content: str
    def __init__(self, content: _Optional[str] = ...) -> None: ...

class Xor(_message.Message):
    __slots__ = ("plaintext", "key")
    PLAINTEXT_FIELD_NUMBER: _ClassVar[int]
    KEY_FIELD_NUMBER: _ClassVar[int]
    plaintext: str
    key: str
    def __init__(self, plaintext: _Optional[str] = ..., key: _Optional[str] = ...) -> None: ...

class Zip(_message.Message):
    __slots__ = ("files", "password")
    FILES_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    files: _containers.RepeatedCompositeFieldContainer[File]
    password: str
    def __init__(self, files: _Optional[_Iterable[_Union[File, _Mapping]]] = ..., password: _Optional[str] = ...) -> None: ...

class File(_message.Message):
    __slots__ = ("url", "text")
    URL_FIELD_NUMBER: _ClassVar[int]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    url: str
    text: str
    def __init__(self, url: _Optional[str] = ..., text: _Optional[str] = ...) -> None: ...

class Maze(_message.Message):
    __slots__ = ("rows", "columns", "paths")
    class Path(_message.Message):
        __slots__ = ("coords", "result")
        class Coordinate(_message.Message):
            __slots__ = ("row", "col")
            ROW_FIELD_NUMBER: _ClassVar[int]
            COL_FIELD_NUMBER: _ClassVar[int]
            row: int
            col: int
            def __init__(self, row: _Optional[int] = ..., col: _Optional[int] = ...) -> None: ...
        COORDS_FIELD_NUMBER: _ClassVar[int]
        RESULT_FIELD_NUMBER: _ClassVar[int]
        coords: _containers.RepeatedCompositeFieldContainer[Maze.Path.Coordinate]
        result: str
        def __init__(self, coords: _Optional[_Iterable[_Union[Maze.Path.Coordinate, _Mapping]]] = ..., result: _Optional[str] = ...) -> None: ...
    ROWS_FIELD_NUMBER: _ClassVar[int]
    COLUMNS_FIELD_NUMBER: _ClassVar[int]
    PATHS_FIELD_NUMBER: _ClassVar[int]
    rows: int
    columns: int
    paths: _containers.RepeatedCompositeFieldContainer[Maze.Path]
    def __init__(self, rows: _Optional[int] = ..., columns: _Optional[int] = ..., paths: _Optional[_Iterable[_Union[Maze.Path, _Mapping]]] = ...) -> None: ...

class FileManager(_message.Message):
    __slots__ = ("urls", "password")
    URLS_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    urls: _containers.RepeatedScalarFieldContainer[str]
    password: str
    def __init__(self, urls: _Optional[_Iterable[str]] = ..., password: _Optional[str] = ...) -> None: ...

class Phone(_message.Message):
    __slots__ = ("apps", "name")
    APPS_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    apps: _containers.RepeatedCompositeFieldContainer[App]
    name: str
    def __init__(self, apps: _Optional[_Iterable[_Union[App, _Mapping]]] = ..., name: _Optional[str] = ...) -> None: ...

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
    __slots__ = ("password", "event")
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    EVENT_FIELD_NUMBER: _ClassVar[int]
    password: str
    event: _containers.RepeatedCompositeFieldContainer[Event]
    def __init__(self, password: _Optional[str] = ..., event: _Optional[_Iterable[_Union[Event, _Mapping]]] = ...) -> None: ...

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
