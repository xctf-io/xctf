# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: kubes/kubes.proto
# Protobuf Python Version: 4.25.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11kubes/kubes.proto\x12\x05kubes\"-\n\x17\x44\x65leteDeploymentRequest\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\"\x1a\n\x18\x44\x65leteDeploymentResponse\"6\n\x16ListDeploymentsRequest\x12\x1c\n\tnamespace\x18\x01 \x01(\tR\tnamespace\"N\n\x17ListDeploymentsResponse\x12\x33\n\x0b\x64\x65ployments\x18\x01 \x03(\x0b\x32\x11.kubes.DeploymentR\x0b\x64\x65ployments\"*\n\x14NewDeploymentRequest\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\"J\n\x15NewDeploymentResponse\x12\x31\n\ndeployment\x18\x01 \x01(\x0b\x32\x11.kubes.DeploymentR\ndeployment\"\x98\x01\n\nDeployment\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x1c\n\tnamespace\x18\x02 \x01(\tR\tnamespace\x12\x14\n\x05image\x18\x03 \x01(\tR\x05image\x12\x1a\n\x08replicas\x18\x04 \x01(\x05R\x08replicas\x12\x16\n\x06status\x18\x05 \x01(\tR\x06status\x12\x0e\n\x02id\x18\x06 \x01(\tR\x02id2\x81\x02\n\x0cKubesService\x12P\n\x0fListDeployments\x12\x1d.kubes.ListDeploymentsRequest\x1a\x1e.kubes.ListDeploymentsResponse\x12J\n\rNewDeployment\x12\x1b.kubes.NewDeploymentRequest\x1a\x1c.kubes.NewDeploymentResponse\x12S\n\x10\x44\x65leteDeployment\x12\x1e.kubes.DeleteDeploymentRequest\x1a\x1f.kubes.DeleteDeploymentResponseBn\n\tcom.kubesB\nKubesProtoP\x01Z!github.com/xctf-io/xctf/gen/kubes\xa2\x02\x03KXX\xaa\x02\x05Kubes\xca\x02\x05Kubes\xe2\x02\x11Kubes\\GPBMetadata\xea\x02\x05Kubesb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'kubes.kubes_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\tcom.kubesB\nKubesProtoP\001Z!github.com/xctf-io/xctf/gen/kubes\242\002\003KXX\252\002\005Kubes\312\002\005Kubes\342\002\021Kubes\\GPBMetadata\352\002\005Kubes'
  _globals['_DELETEDEPLOYMENTREQUEST']._serialized_start=28
  _globals['_DELETEDEPLOYMENTREQUEST']._serialized_end=73
  _globals['_DELETEDEPLOYMENTRESPONSE']._serialized_start=75
  _globals['_DELETEDEPLOYMENTRESPONSE']._serialized_end=101
  _globals['_LISTDEPLOYMENTSREQUEST']._serialized_start=103
  _globals['_LISTDEPLOYMENTSREQUEST']._serialized_end=157
  _globals['_LISTDEPLOYMENTSRESPONSE']._serialized_start=159
  _globals['_LISTDEPLOYMENTSRESPONSE']._serialized_end=237
  _globals['_NEWDEPLOYMENTREQUEST']._serialized_start=239
  _globals['_NEWDEPLOYMENTREQUEST']._serialized_end=281
  _globals['_NEWDEPLOYMENTRESPONSE']._serialized_start=283
  _globals['_NEWDEPLOYMENTRESPONSE']._serialized_end=357
  _globals['_DEPLOYMENT']._serialized_start=360
  _globals['_DEPLOYMENT']._serialized_end=512
  _globals['_KUBESSERVICE']._serialized_start=515
  _globals['_KUBESSERVICE']._serialized_end=772
# @@protoc_insertion_point(module_scope)
