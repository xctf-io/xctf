from chals import config_pb2 as _config_pb2
from chalgen import base_pb2 as _base_pb2
from plugin import python_pb2 as _python_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CompetitionList(_message.Message):
    __slots__ = ("competitions",)
    COMPETITIONS_FIELD_NUMBER: _ClassVar[int]
    competitions: _containers.RepeatedCompositeFieldContainer[Competition]
    def __init__(self, competitions: _Optional[_Iterable[_Union[Competition, _Mapping]]] = ...) -> None: ...

class Competition(_message.Message):
    __slots__ = ("id", "name", "graph", "active")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    GRAPH_FIELD_NUMBER: _ClassVar[int]
    ACTIVE_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    graph: Graph
    active: bool
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., graph: _Optional[_Union[Graph, _Mapping]] = ..., active: bool = ...) -> None: ...

class Graph(_message.Message):
    __slots__ = ("nodes", "edges")
    NODES_FIELD_NUMBER: _ClassVar[int]
    EDGES_FIELD_NUMBER: _ClassVar[int]
    nodes: _containers.RepeatedCompositeFieldContainer[Node]
    edges: _containers.RepeatedCompositeFieldContainer[Edge]
    def __init__(self, nodes: _Optional[_Iterable[_Union[Node, _Mapping]]] = ..., edges: _Optional[_Iterable[_Union[Edge, _Mapping]]] = ...) -> None: ...

class Node(_message.Message):
    __slots__ = ("meta", "base", "python")
    META_FIELD_NUMBER: _ClassVar[int]
    BASE_FIELD_NUMBER: _ClassVar[int]
    PYTHON_FIELD_NUMBER: _ClassVar[int]
    meta: _config_pb2.Meta
    base: _base_pb2.Challenge
    python: _python_pb2.PythonChallenge
    def __init__(self, meta: _Optional[_Union[_config_pb2.Meta, _Mapping]] = ..., base: _Optional[_Union[_base_pb2.Challenge, _Mapping]] = ..., python: _Optional[_Union[_python_pb2.PythonChallenge, _Mapping]] = ...) -> None: ...

class Edge(_message.Message):
    __slots__ = ("to",)
    FROM_FIELD_NUMBER: _ClassVar[int]
    TO_FIELD_NUMBER: _ClassVar[int]
    to: str
    def __init__(self, to: _Optional[str] = ..., **kwargs) -> None: ...
