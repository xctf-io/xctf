# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: chalgen/base.proto
# Protobuf Python Version: 4.25.3
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x12\x63halgen/base.proto\x12\x07\x63halgen\"\x96\x03\n\tChallenge\x12)\n\x06\x62\x61se64\x18\x06 \x01(\x0b\x32\x0f.chalgen.Base64H\x00R\x06\x62\x61se64\x12,\n\x07twitter\x18\x07 \x01(\x0b\x32\x10.chalgen.TwitterH\x00R\x07twitter\x12/\n\x06\x63\x61\x65sar\x18\x08 \x01(\x0b\x32\x15.chalgen.CaesarCipherH\x00R\x06\x63\x61\x65sar\x12#\n\x04pcap\x18\t \x01(\x0b\x32\r.chalgen.PCAPH\x00R\x04pcap\x12#\n\x04\x65xif\x18\n \x01(\x0b\x32\r.chalgen.ExifH\x00R\x04\x65xif\x12&\n\x05slack\x18\x0b \x01(\x0b\x32\x0e.chalgen.SlackH\x00R\x05slack\x12&\n\x05phone\x18\x0c \x01(\x0b\x32\x0e.chalgen.PhoneH\x00R\x05phone\x12\x38\n\x0b\x66ilemanager\x18\r \x01(\x0b\x32\x14.chalgen.FileManagerH\x00R\x0b\x66ilemanager\x12#\n\x04maze\x18\x0e \x01(\x0b\x32\r.chalgen.MazeH\x00R\x04mazeB\x06\n\x04type\"\xe8\x01\n\x04Maze\x12\x12\n\x04rows\x18\x01 \x01(\rR\x04rows\x12\x18\n\x07\x63olumns\x18\x02 \x01(\rR\x07\x63olumns\x12(\n\x05paths\x18\x03 \x03(\x0b\x32\x12.chalgen.Maze.PathR\x05paths\x1a\x87\x01\n\x04Path\x12\x35\n\x06\x63oords\x18\x01 \x03(\x0b\x32\x1d.chalgen.Maze.Path.CoordinateR\x06\x63oords\x12\x16\n\x06result\x18\x02 \x01(\tR\x06result\x1a\x30\n\nCoordinate\x12\x10\n\x03row\x18\x01 \x01(\rR\x03row\x12\x10\n\x03\x63ol\x18\x02 \x01(\rR\x03\x63ol\"=\n\x0b\x46ileManager\x12\x12\n\x04urls\x18\x01 \x03(\tR\x04urls\x12\x1a\n\x08password\x18\x02 \x01(\tR\x08password\")\n\x05Phone\x12 \n\x04\x61pps\x18\x01 \x03(\x0b\x32\x0c.chalgen.AppR\x04\x61pps\"\xb2\x01\n\x03\x41pp\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x10\n\x03url\x18\x02 \x01(\tR\x03url\x12\x12\n\x04html\x18\x03 \x01(\tR\x04html\x12,\n\x07tracker\x18\x04 \x01(\x0b\x32\x10.chalgen.TrackerH\x00R\x07tracker\x12;\n\x0cphotogallery\x18\x05 \x01(\x0b\x32\x15.chalgen.PhotoGalleryH\x00R\x0cphotogalleryB\x06\n\x04type\"K\n\x07Tracker\x12\x1a\n\x08password\x18\x01 \x01(\tR\x08password\x12$\n\x05\x65vent\x18\x02 \x03(\x0b\x32\x0e.chalgen.EventR\x05\x65vent\"9\n\x05\x45vent\x12\x1c\n\ttimestamp\x18\x01 \x01(\x03R\ttimestamp\x12\x12\n\x04name\x18\x02 \x01(\tR\x04name\" \n\x0cPhotoGallery\x12\x10\n\x03url\x18\x01 \x03(\tR\x03url\"Z\n\x05Slack\x12#\n\x05users\x18\x01 \x03(\x0b\x32\r.chalgen.UserR\x05users\x12,\n\x08\x63hannels\x18\x02 \x03(\x0b\x32\x10.chalgen.ChannelR\x08\x63hannels\"i\n\x07\x43hannel\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x1c\n\tusernames\x18\x02 \x03(\tR\tusernames\x12,\n\x08messages\x18\x03 \x03(\x0b\x32\x10.chalgen.MessageR\x08messages\"]\n\x07Message\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x18\n\x07\x63ontent\x18\x02 \x01(\tR\x07\x63ontent\x12\x1c\n\ttimestamp\x18\x03 \x01(\x03R\ttimestamp\".\n\x04\x45xif\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x14\n\x05value\x18\x02 \x01(\tR\x05value\"1\n\x04PCAP\x12)\n\x07packets\x18\x01 \x03(\x0b\x32\x0f.chalgen.PacketR\x07packets\"\x90\x01\n\x06Packet\x12\x1c\n\ttimestamp\x18\x01 \x01(\x03R\ttimestamp\x12\x16\n\x06source\x18\x02 \x01(\tR\x06source\x12 \n\x0b\x64\x65stination\x18\x03 \x01(\tR\x0b\x64\x65stination\x12\x1a\n\x08protocol\x18\x04 \x01(\tR\x08protocol\x12\x12\n\x04\x64\x61ta\x18\x05 \x01(\tR\x04\x64\x61ta\"B\n\x0c\x43\x61\x65sarCipher\x12\x1c\n\tplaintext\x18\x01 \x01(\tR\tplaintext\x12\x14\n\x05shift\x18\x02 \x01(\x05R\x05shift\"\x1c\n\x06\x42\x61se64\x12\x12\n\x04\x64\x61ta\x18\x01 \x01(\tR\x04\x64\x61ta\"\x81\x01\n\x07Twitter\x12#\n\x05users\x18\x01 \x03(\x0b\x32\r.chalgen.UserR\x05users\x12#\n\x05posts\x18\x02 \x03(\x0b\x32\r.chalgen.PostR\x05posts\x12,\n\x08\x63omments\x18\x03 \x03(\x0b\x32\x10.chalgen.CommentR\x08\x63omments\"P\n\x04User\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x10\n\x03\x62io\x18\x02 \x01(\tR\x03\x62io\x12\x1a\n\x08password\x18\x03 \x01(\tR\x08password\"<\n\x04Post\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x18\n\x07\x63ontent\x18\x02 \x01(\tR\x07\x63ontent\"`\n\x07\x43omment\x12\x1f\n\x0bpost_number\x18\x01 \x01(\x03R\npostNumber\x12\x1a\n\x08username\x18\x02 \x01(\x03R\x08username\x12\x18\n\x07\x63ontent\x18\x03 \x01(\tR\x07\x63ontentB}\n\x0b\x63om.chalgenB\tBaseProtoP\x01Z\'github.com/xctf-io/xctf/pkg/gen/chalgen\xa2\x02\x03\x43XX\xaa\x02\x07\x43halgen\xca\x02\x07\x43halgen\xe2\x02\x13\x43halgen\\GPBMetadata\xea\x02\x07\x43halgenb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'chalgen.base_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\013com.chalgenB\tBaseProtoP\001Z\'github.com/xctf-io/xctf/pkg/gen/chalgen\242\002\003CXX\252\002\007Chalgen\312\002\007Chalgen\342\002\023Chalgen\\GPBMetadata\352\002\007Chalgen'
  _globals['_CHALLENGE']._serialized_start=32
  _globals['_CHALLENGE']._serialized_end=438
  _globals['_MAZE']._serialized_start=441
  _globals['_MAZE']._serialized_end=673
  _globals['_MAZE_PATH']._serialized_start=538
  _globals['_MAZE_PATH']._serialized_end=673
  _globals['_MAZE_PATH_COORDINATE']._serialized_start=625
  _globals['_MAZE_PATH_COORDINATE']._serialized_end=673
  _globals['_FILEMANAGER']._serialized_start=675
  _globals['_FILEMANAGER']._serialized_end=736
  _globals['_PHONE']._serialized_start=738
  _globals['_PHONE']._serialized_end=779
  _globals['_APP']._serialized_start=782
  _globals['_APP']._serialized_end=960
  _globals['_TRACKER']._serialized_start=962
  _globals['_TRACKER']._serialized_end=1037
  _globals['_EVENT']._serialized_start=1039
  _globals['_EVENT']._serialized_end=1096
  _globals['_PHOTOGALLERY']._serialized_start=1098
  _globals['_PHOTOGALLERY']._serialized_end=1130
  _globals['_SLACK']._serialized_start=1132
  _globals['_SLACK']._serialized_end=1222
  _globals['_CHANNEL']._serialized_start=1224
  _globals['_CHANNEL']._serialized_end=1329
  _globals['_MESSAGE']._serialized_start=1331
  _globals['_MESSAGE']._serialized_end=1424
  _globals['_EXIF']._serialized_start=1426
  _globals['_EXIF']._serialized_end=1472
  _globals['_PCAP']._serialized_start=1474
  _globals['_PCAP']._serialized_end=1523
  _globals['_PACKET']._serialized_start=1526
  _globals['_PACKET']._serialized_end=1670
  _globals['_CAESARCIPHER']._serialized_start=1672
  _globals['_CAESARCIPHER']._serialized_end=1738
  _globals['_BASE64']._serialized_start=1740
  _globals['_BASE64']._serialized_end=1768
  _globals['_TWITTER']._serialized_start=1771
  _globals['_TWITTER']._serialized_end=1900
  _globals['_USER']._serialized_start=1902
  _globals['_USER']._serialized_end=1982
  _globals['_POST']._serialized_start=1984
  _globals['_POST']._serialized_end=2044
  _globals['_COMMENT']._serialized_start=2046
  _globals['_COMMENT']._serialized_end=2142
# @@protoc_insertion_point(module_scope)
