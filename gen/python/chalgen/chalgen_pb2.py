# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: chalgen/chalgen.proto
# Protobuf Python Version: 4.25.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x15\x63halgen/chalgen.proto\x12\x07\x63halgen\"7\n\x0fGenerateRequest\x12$\n\x05graph\x18\x01 \x01(\x0b\x32\x0e.chalgen.GraphR\x05graph\"\x12\n\x10GenerateResponse\"Q\n\x05Graph\x12#\n\x05nodes\x18\x01 \x03(\x0b\x32\r.chalgen.NodeR\x05nodes\x12#\n\x05\x65\x64ges\x18\x02 \x03(\x0b\x32\r.chalgen.EdgeR\x05\x65\x64ges\"*\n\x04\x45\x64ge\x12\x12\n\x04\x66rom\x18\x01 \x01(\tR\x04\x66rom\x12\x0e\n\x02to\x18\x02 \x01(\tR\x02to\"b\n\x04Node\x12\x0e\n\x02id\x18\x01 \x01(\tR\x02id\x12\x12\n\x04\x66lag\x18\x02 \x01(\tR\x04\x66lag\x12)\n\x06\x62\x61se64\x18\x03 \x01(\x0b\x32\x0f.chalgen.Base64H\x00R\x06\x62\x61se64B\x0b\n\tchallenge\"\x1c\n\x06\x42\x61se64\x12\x12\n\x04\x64\x61ta\x18\x01 \x01(\tR\x04\x64\x61ta2Q\n\x0e\x43halgenService\x12?\n\x08Generate\x12\x18.chalgen.GenerateRequest\x1a\x19.chalgen.GenerateResponseB|\n\x0b\x63om.chalgenB\x0c\x43halgenProtoP\x01Z#github.com/xctf-io/xctf/gen/chalgen\xa2\x02\x03\x43XX\xaa\x02\x07\x43halgen\xca\x02\x07\x43halgen\xe2\x02\x13\x43halgen\\GPBMetadata\xea\x02\x07\x43halgenb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'chalgen.chalgen_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\013com.chalgenB\014ChalgenProtoP\001Z#github.com/xctf-io/xctf/gen/chalgen\242\002\003CXX\252\002\007Chalgen\312\002\007Chalgen\342\002\023Chalgen\\GPBMetadata\352\002\007Chalgen'
  _globals['_GENERATEREQUEST']._serialized_start=34
  _globals['_GENERATEREQUEST']._serialized_end=89
  _globals['_GENERATERESPONSE']._serialized_start=91
  _globals['_GENERATERESPONSE']._serialized_end=109
  _globals['_GRAPH']._serialized_start=111
  _globals['_GRAPH']._serialized_end=192
  _globals['_EDGE']._serialized_start=194
  _globals['_EDGE']._serialized_end=236
  _globals['_NODE']._serialized_start=238
  _globals['_NODE']._serialized_end=336
  _globals['_BASE64']._serialized_start=338
  _globals['_BASE64']._serialized_end=366
  _globals['_CHALGENSERVICE']._serialized_start=368
  _globals['_CHALGENSERVICE']._serialized_end=449
# @@protoc_insertion_point(module_scope)