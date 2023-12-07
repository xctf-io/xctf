from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class DeleteDeploymentRequest(_message.Message):
    __slots__ = ("name", "domain_name")
    NAME_FIELD_NUMBER: _ClassVar[int]
    DOMAIN_NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    domain_name: str
    def __init__(self, name: _Optional[str] = ..., domain_name: _Optional[str] = ...) -> None: ...

class DeleteDeploymentResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ListDeploymentsRequest(_message.Message):
    __slots__ = ("namespace",)
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    namespace: str
    def __init__(self, namespace: _Optional[str] = ...) -> None: ...

class ListDeploymentsResponse(_message.Message):
    __slots__ = ("deployments",)
    DEPLOYMENTS_FIELD_NUMBER: _ClassVar[int]
    deployments: _containers.RepeatedCompositeFieldContainer[Deployment]
    def __init__(self, deployments: _Optional[_Iterable[_Union[Deployment, _Mapping]]] = ...) -> None: ...

class NewDeploymentRequest(_message.Message):
    __slots__ = ("name", "domain_name")
    NAME_FIELD_NUMBER: _ClassVar[int]
    DOMAIN_NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    domain_name: str
    def __init__(self, name: _Optional[str] = ..., domain_name: _Optional[str] = ...) -> None: ...

class NewDeploymentResponse(_message.Message):
    __slots__ = ("deployment",)
    DEPLOYMENT_FIELD_NUMBER: _ClassVar[int]
    deployment: Deployment
    def __init__(self, deployment: _Optional[_Union[Deployment, _Mapping]] = ...) -> None: ...

class Deployment(_message.Message):
    __slots__ = ("name", "namespace", "image", "replicas", "status", "id")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    IMAGE_FIELD_NUMBER: _ClassVar[int]
    REPLICAS_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    image: str
    replicas: int
    status: str
    id: str
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., image: _Optional[str] = ..., replicas: _Optional[int] = ..., status: _Optional[str] = ..., id: _Optional[str] = ...) -> None: ...
