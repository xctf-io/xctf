# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: chalgen/graph.proto
# Protobuf Python Version: 4.25.3
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from chals import config_pb2 as chals_dot_config__pb2
from chalgen import base_pb2 as chalgen_dot_base__pb2
from plugin import python_pb2 as plugin_dot_python__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x13\x63halgen/graph.proto\x12\x07\x63halgen\x1a\x12\x63hals/config.proto\x1a\x12\x63halgen/base.proto\x1a\x13plugin/python.proto\"K\n\x0f\x43ompetitionList\x12\x38\n\x0c\x63ompetitions\x18\x01 \x03(\x0b\x32\x14.chalgen.CompetitionR\x0c\x63ompetitions\"o\n\x0b\x43ompetition\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12\x12\n\x04name\x18\x02 \x01(\tR\x04name\x12$\n\x05graph\x18\x03 \x01(\x0b\x32\x0e.chalgen.GraphR\x05graph\x12\x16\n\x06\x61\x63tive\x18\x04 \x01(\x08R\x06\x61\x63tive\"Q\n\x05Graph\x12#\n\x05nodes\x18\x03 \x03(\x0b\x32\r.chalgen.NodeR\x05nodes\x12#\n\x05\x65\x64ges\x18\x04 \x03(\x0b\x32\r.chalgen.EdgeR\x05\x65\x64ges\"\x91\x01\n\x04Node\x12\x1f\n\x04meta\x18\x01 \x01(\x0b\x32\x0b.chals.MetaR\x04meta\x12(\n\x04\x62\x61se\x18\n \x01(\x0b\x32\x12.chalgen.ChallengeH\x00R\x04\x62\x61se\x12\x31\n\x06python\x18\x0b \x01(\x0b\x32\x17.plugin.PythonChallengeH\x00R\x06pythonB\x0b\n\tchallenge\"*\n\x04\x45\x64ge\x12\x12\n\x04\x66rom\x18\x01 \x01(\tR\x04\x66rom\x12\x0e\n\x02to\x18\x02 \x01(\tR\x02toB~\n\x0b\x63om.chalgenB\nGraphProtoP\x01Z\'github.com/xctf-io/xctf/pkg/gen/chalgen\xa2\x02\x03\x43XX\xaa\x02\x07\x43halgen\xca\x02\x07\x43halgen\xe2\x02\x13\x43halgen\\GPBMetadata\xea\x02\x07\x43halgenb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'chalgen.graph_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\013com.chalgenB\nGraphProtoP\001Z\'github.com/xctf-io/xctf/pkg/gen/chalgen\242\002\003CXX\252\002\007Chalgen\312\002\007Chalgen\342\002\023Chalgen\\GPBMetadata\352\002\007Chalgen'
  _globals['_COMPETITIONLIST']._serialized_start=93
  _globals['_COMPETITIONLIST']._serialized_end=168
  _globals['_COMPETITION']._serialized_start=170
  _globals['_COMPETITION']._serialized_end=281
  _globals['_GRAPH']._serialized_start=283
  _globals['_GRAPH']._serialized_end=364
  _globals['_NODE']._serialized_start=367
  _globals['_NODE']._serialized_end=512
  _globals['_EDGE']._serialized_start=514
  _globals['_EDGE']._serialized_end=556
# @@protoc_insertion_point(module_scope)
