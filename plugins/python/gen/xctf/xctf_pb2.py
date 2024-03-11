# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: xctf/xctf.proto
# Protobuf Python Version: 4.25.3
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from chalgen import graph_pb2 as chalgen_dot_graph__pb2
from google.protobuf import descriptor_pb2 as google_dot_protobuf_dot_descriptor__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0fxctf/xctf.proto\x12\x04xctf\x1a\x13\x63halgen/graph.proto\x1a google/protobuf/descriptor.proto\"\x14\n\x12GetComputerRequest\"\'\n\x13GetComputerResponse\x12\x10\n\x03url\x18\x01 \x01(\tR\x03url\"-\n\x17\x45xportChallengeResponse\x12\x12\n\x04yaml\x18\x01 \x01(\tR\x04yaml\",\n\x16ImportChallengeRequest\x12\x12\n\x04yaml\x18\x01 \x01(\tR\x04yaml\"<\n\x17ImportChallengeResponse\x12!\n\x04\x63hal\x18\x01 \x01(\x0b\x32\r.chalgen.NodeR\x04\x63hal\"&\n\x10SignedURLRequest\x12\x12\n\x04path\x18\x01 \x01(\tR\x04path\"%\n\x11SignedURLResponse\x12\x10\n\x03url\x18\x02 \x01(\tR\x03url\"#\n\rRemoveRequest\x12\x12\n\x04path\x18\x01 \x01(\tR\x04path\"\x10\n\x0eRemoveResponse\"$\n\x0eReaddirRequest\x12\x12\n\x04path\x18\x01 \x01(\tR\x04path\"7\n\x0fReaddirResponse\x12$\n\x05\x66iles\x18\x01 \x03(\x0b\x32\x0e.xctf.FileInfoR\x05\x66iles\"I\n\x08\x46ileInfo\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x12\n\x04size\x18\x02 \x01(\x03R\x04size\x12\x15\n\x06is_dir\x18\x03 \x01(\x08R\x05isDir\"2\n\x16GetUserWriteupResponse\x12\x18\n\x07\x63ontent\x18\x01 \x01(\tR\x07\x63ontent\"\xb5\x03\n\x0cGRPCTypeInfo\x12\x32\n\x03msg\x18\x01 \x01(\x0b\x32 .google.protobuf.DescriptorProtoR\x03msg\x12\x43\n\x0b\x64\x65sc_lookup\x18\x03 \x03(\x0b\x32\".xctf.GRPCTypeInfo.DescLookupEntryR\ndescLookup\x12\x43\n\x0b\x65num_lookup\x18\x04 \x03(\x0b\x32\".xctf.GRPCTypeInfo.EnumLookupEntryR\nenumLookup\x12!\n\x0cpackage_name\x18\x06 \x01(\tR\x0bpackageName\x1a_\n\x0f\x44\x65scLookupEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x36\n\x05value\x18\x02 \x01(\x0b\x32 .google.protobuf.DescriptorProtoR\x05value:\x02\x38\x01\x1a\x63\n\x0f\x45numLookupEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12:\n\x05value\x18\x02 \x01(\x0b\x32$.google.protobuf.EnumDescriptorProtoR\x05value:\x02\x38\x01\"H\n\x15\x43hallengeTypeResponse\x12/\n\ttype_info\x18\x01 \x01(\x0b\x32\x12.xctf.GRPCTypeInfoR\x08typeInfo\"\x07\n\x05\x45mpty\"R\n\x16UpsertChallengeRequest\x12$\n\rchallengeName\x18\x01 \x01(\tR\rchallengeName\x12\x12\n\x04\x66lag\x18\x02 \x01(\tR\x04\x66lag\">\n\x16\x44\x65leteChallengeRequest\x12$\n\rchallengeName\x18\x01 \x01(\tR\rchallengeName\"/\n\x1bSubmitEvidenceReportRequest\x12\x10\n\x03url\x18\x01 \x01(\tR\x03url\"\x1e\n\x1cSubmitEvidenceReportResponse\"@\n\x0cLoginRequest\x12\x14\n\x05\x65mail\x18\x01 \x01(\tR\x05\x65mail\x12\x1a\n\x08password\x18\x02 \x01(\tR\x08password\"G\n\rLoginResponse\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x1a\n\x08userRole\x18\x02 \x01(\tR\x08userRole\"\x84\x01\n\x08\x45vidence\x12\x0e\n\x02id\x18\x01 \x01(\rR\x02id\x12\x12\n\x04name\x18\x02 \x01(\tR\x04name\x12 \n\x0b\x63hallengeID\x18\x03 \x01(\rR\x0b\x63hallengeID\x12\x0c\n\x01x\x18\x04 \x01(\x05R\x01x\x12\x0c\n\x01y\x18\x05 \x01(\x05R\x01y\x12\x16\n\x06isFlag\x18\x06 \x01(\x08R\x06isFlag\"V\n\nConnection\x12\x0e\n\x02id\x18\x01 \x01(\rR\x02id\x12\x16\n\x06source\x18\x02 \x01(\rR\x06source\x12 \n\x0b\x64\x65stination\x18\x03 \x01(\rR\x0b\x64\x65stination\"\x1e\n\x1cGetDiscoveredEvidenceRequest\"\x97\x01\n\x1dGetDiscoveredEvidenceResponse\x12\x16\n\x06report\x18\x01 \x01(\tR\x06report\x12*\n\x08\x65vidence\x18\x02 \x03(\x0b\x32\x0e.xctf.EvidenceR\x08\x65vidence\x12\x32\n\x0b\x63onnections\x18\x03 \x03(\x0b\x32\x10.xctf.ConnectionR\x0b\x63onnections\"\x7f\n\x15SubmitEvidenceRequest\x12\x1a\n\x08\x65vidence\x18\x01 \x01(\tR\x08\x65vidence\x12\x0c\n\x01x\x18\x02 \x01(\x05R\x01x\x12\x0c\n\x01y\x18\x03 \x01(\x05R\x01y\x12\x16\n\x06isFlag\x18\x04 \x01(\x08R\x06isFlag\x12\x16\n\x06remove\x18\x05 \x01(\x08R\x06remove\",\n\x16SubmitEvidenceResponse\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\"s\n\x1fSubmitEvidenceConnectionRequest\x12\x16\n\x06source\x18\x01 \x01(\rR\x06source\x12 \n\x0b\x64\x65stination\x18\x02 \x01(\rR\x0b\x64\x65stination\x12\x16\n\x06remove\x18\x03 \x01(\x08R\x06remove\"<\n SubmitEvidenceConnectionResponse\x12\x18\n\x07\x63reated\x18\x01 \x01(\x08R\x07\x63reated\"_\n\x0fRegisterRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x14\n\x05\x65mail\x18\x02 \x01(\tR\x05\x65mail\x12\x1a\n\x08password\x18\x03 \x01(\tR\x08password\",\n\x10RegisterResponse\x12\x18\n\x07\x63reated\x18\x01 \x01(\x08R\x07\x63reated\"L\n\x04Page\x12\x14\n\x05route\x18\x01 \x01(\tR\x05route\x12\x14\n\x05title\x18\x02 \x01(\tR\x05title\x12\x18\n\x07\x63ontent\x18\x03 \x01(\tR\x07\x63ontent\"\x14\n\x12\x43urrentUserRequest\"o\n\x13\x43urrentUserResponse\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x1a\n\x08userRole\x18\x02 \x01(\tR\x08userRole\x12 \n\x05pages\x18\x03 \x03(\x0b\x32\n.xctf.PageR\x05pages\"\'\n\x11SubmitFlagRequest\x12\x12\n\x04\x66lag\x18\x01 \x01(\tR\x04\x66lag\".\n\x12SubmitFlagResponse\x12\x18\n\x07\x63orrect\x18\x01 \x01(\x08R\x07\x63orrect\"v\n\x0cTeamProgress\x12\x1a\n\x08teamName\x18\x01 \x01(\tR\x08teamName\x12\x1e\n\nhasWriteup\x18\x02 \x01(\x08R\nhasWriteup\x12\x14\n\x05score\x18\x03 \x01(\rR\x05score\x12\x14\n\x05grade\x18\x04 \x01(\rR\x05grade\"\x19\n\x17GetTeamsProgressRequest\"D\n\x18GetTeamsProgressResponse\x12(\n\x05teams\x18\x01 \x03(\x0b\x32\x12.xctf.TeamProgressR\x05teams\"3\n\tChallenge\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x12\n\x04\x66lag\x18\x02 \x01(\tR\x04\x66lag\"\x19\n\x17GetAllChallengesRequest\"K\n\x18GetAllChallengesResponse\x12/\n\nchallenges\x18\x01 \x03(\x0b\x32\x0f.xctf.ChallengeR\nchallenges\".\n\x12SetHomePageRequest\x12\x18\n\x07\x63ontent\x18\x01 \x01(\tR\x07\x63ontent\"\x14\n\x12GetHomePageRequest\"c\n\x13GetHomePageResponse\x12\x18\n\x07\x63ontent\x18\x01 \x01(\tR\x07\x63ontent\x12\x32\n\x0b\x65ntrypoints\x18\x02 \x03(\x0b\x32\x10.xctf.EntrypointR\x0b\x65ntrypoints\"6\n\nEntrypoint\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x12\x14\n\x05route\x18\x02 \x01(\tR\x05route\"-\n\x15\x46orgotPasswordRequest\x12\x14\n\x05\x65mail\x18\x01 \x01(\tR\x05\x65mail\"D\n\x14SubmitWriteupRequest\x12\x18\n\x07\x63ontent\x18\x01 \x01(\tR\x07\x63ontent\x12\x12\n\x04type\x18\x02 \x01(\tR\x04type\"/\n\x11GetWriteupRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\"B\n\x12GetWriteupResponse\x12\x18\n\x07\x63ontent\x18\x01 \x01(\tR\x07\x63ontent\x12\x12\n\x04type\x18\x02 \x01(\tR\x04type\"F\n\x12SubmitGradeRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x14\n\x05score\x18\x02 \x01(\rR\x05score\"\x81\x01\n\rHighlightArea\x12\x16\n\x06height\x18\x01 \x01(\x02R\x06height\x12\x14\n\x05width\x18\x02 \x01(\x02R\x05width\x12\x1c\n\tpageIndex\x18\x03 \x01(\rR\tpageIndex\x12\x10\n\x03top\x18\x04 \x01(\x02R\x03top\x12\x12\n\x04left\x18\x05 \x01(\x02R\x04left\"\x9d\x01\n\x14SubmitCommentRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x0e\n\x02id\x18\x02 \x01(\rR\x02id\x12\x18\n\x07\x63ontent\x18\x03 \x01(\tR\x07\x63ontent\x12)\n\x05\x61reas\x18\x04 \x03(\x0b\x32\x13.xctf.HighlightAreaR\x05\x61reas\x12\x14\n\x05quote\x18\x05 \x01(\tR\x05quote\"0\n\x12GetCommentsRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\"t\n\x07\x43omment\x12\x0e\n\x02id\x18\x02 \x01(\rR\x02id\x12\x18\n\x07\x63ontent\x18\x03 \x01(\tR\x07\x63ontent\x12)\n\x05\x61reas\x18\x04 \x03(\x0b\x32\x13.xctf.HighlightAreaR\x05\x61reas\x12\x14\n\x05quote\x18\x05 \x01(\tR\x05quote\"@\n\x13GetCommentsResponse\x12)\n\x08\x63omments\x18\x01 \x03(\x0b\x32\r.xctf.CommentR\x08\x63omments\"1\n\x13GetUserGraphRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\"v\n\x14GetUserGraphResponse\x12*\n\x08\x65vidence\x18\x01 \x03(\x0b\x32\x0e.xctf.EvidenceR\x08\x65vidence\x12\x32\n\x0b\x63onnections\x18\x02 \x03(\x0b\x32\x10.xctf.ConnectionR\x0b\x63onnections2\xfe\t\n\x07\x42\x61\x63kend\x12\x39\n\x08Register\x12\x15.xctf.RegisterRequest\x1a\x16.xctf.RegisterResponse\x12\x30\n\x05Login\x12\x12.xctf.LoginRequest\x1a\x13.xctf.LoginResponse\x12\"\n\x06Logout\x12\x0b.xctf.Empty\x1a\x0b.xctf.Empty\x12\x42\n\x0b\x43urrentUser\x12\x18.xctf.CurrentUserRequest\x1a\x19.xctf.CurrentUserResponse\x12\x42\n\x0bGetComputer\x12\x18.xctf.GetComputerRequest\x1a\x19.xctf.GetComputerResponse\x12?\n\nSubmitFlag\x12\x17.xctf.SubmitFlagRequest\x1a\x18.xctf.SubmitFlagResponse\x12\\\n\x14SubmitEvidenceReport\x12!.xctf.SubmitEvidenceReportRequest\x1a!.xctf.SubmitEvidenceReportRequest\x12`\n\x15GetDiscoveredEvidence\x12\".xctf.GetDiscoveredEvidenceRequest\x1a#.xctf.GetDiscoveredEvidenceResponse\x12K\n\x0eSubmitEvidence\x12\x1b.xctf.SubmitEvidenceRequest\x1a\x1c.xctf.SubmitEvidenceResponse\x12i\n\x18SubmitEvidenceConnection\x12%.xctf.SubmitEvidenceConnectionRequest\x1a&.xctf.SubmitEvidenceConnectionResponse\x12\x42\n\x0bGetHomePage\x12\x18.xctf.GetHomePageRequest\x1a\x19.xctf.GetHomePageResponse\x12:\n\x0e\x46orgotPassword\x12\x1b.xctf.ForgotPasswordRequest\x1a\x0b.xctf.Empty\x12\x38\n\rSubmitWriteup\x12\x1a.xctf.SubmitWriteupRequest\x1a\x0b.xctf.Empty\x12;\n\x0eGetUserWriteup\x12\x0b.xctf.Empty\x1a\x1c.xctf.GetUserWriteupResponse\x12\x38\n\x0fGetCompetitions\x12\x0b.xctf.Empty\x1a\x18.chalgen.CompetitionList\x12?\n\x11UpdateCompetition\x12\x14.chalgen.Competition\x1a\x14.chalgen.Competition\x12\x36\n\x11\x44\x65leteCompetition\x12\x14.chalgen.Competition\x1a\x0b.xctf.Empty\x12\x39\n\rChallengeType\x12\x0b.xctf.Empty\x1a\x1b.xctf.ChallengeTypeResponse\x12<\n\tSignedURL\x12\x16.xctf.SignedURLRequest\x1a\x17.xctf.SignedURLResponse2\x99\x07\n\x05\x41\x64min\x12<\n\x0fUpsertChallenge\x12\x1c.xctf.UpsertChallengeRequest\x1a\x0b.xctf.Empty\x12<\n\x0f\x44\x65leteChallenge\x12\x1c.xctf.DeleteChallengeRequest\x1a\x0b.xctf.Empty\x12Q\n\x10GetTeamsProgress\x12\x1d.xctf.GetTeamsProgressRequest\x1a\x1e.xctf.GetTeamsProgressResponse\x12Q\n\x10GetAllChallenges\x12\x1d.xctf.GetAllChallengesRequest\x1a\x1e.xctf.GetAllChallengesResponse\x12\x34\n\x0bSetHomePage\x12\x18.xctf.SetHomePageRequest\x1a\x0b.xctf.Empty\x12?\n\nGetWriteup\x12\x17.xctf.GetWriteupRequest\x1a\x18.xctf.GetWriteupResponse\x12\x34\n\x0bSubmitGrade\x12\x18.xctf.SubmitGradeRequest\x1a\x0b.xctf.Empty\x12\x38\n\rSubmitComment\x12\x1a.xctf.SubmitCommentRequest\x1a\x0b.xctf.Empty\x12\x42\n\x0bGetComments\x12\x18.xctf.GetCommentsRequest\x1a\x19.xctf.GetCommentsResponse\x12\x45\n\x0cGetUserGraph\x12\x19.xctf.GetUserGraphRequest\x1a\x1a.xctf.GetUserGraphResponse\x12?\n\x0f\x45xportChallenge\x12\r.chalgen.Node\x1a\x1d.xctf.ExportChallengeResponse\x12N\n\x0fImportChallenge\x12\x1c.xctf.ImportChallengeRequest\x1a\x1d.xctf.ImportChallengeResponse\x12\x36\n\x07Readdir\x12\x14.xctf.ReaddirRequest\x1a\x15.xctf.ReaddirResponse\x12\x33\n\x06Remove\x12\x13.xctf.RemoveRequest\x1a\x14.xctf.RemoveResponseBk\n\x08\x63om.xctfB\tXctfProtoP\x01Z$github.com/xctf-io/xctf/pkg/gen/xctf\xa2\x02\x03XXX\xaa\x02\x04Xctf\xca\x02\x04Xctf\xe2\x02\x10Xctf\\GPBMetadata\xea\x02\x04Xctfb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'xctf.xctf_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  _globals['DESCRIPTOR']._options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\010com.xctfB\tXctfProtoP\001Z$github.com/xctf-io/xctf/pkg/gen/xctf\242\002\003XXX\252\002\004Xctf\312\002\004Xctf\342\002\020Xctf\\GPBMetadata\352\002\004Xctf'
  _globals['_GRPCTYPEINFO_DESCLOOKUPENTRY']._options = None
  _globals['_GRPCTYPEINFO_DESCLOOKUPENTRY']._serialized_options = b'8\001'
  _globals['_GRPCTYPEINFO_ENUMLOOKUPENTRY']._options = None
  _globals['_GRPCTYPEINFO_ENUMLOOKUPENTRY']._serialized_options = b'8\001'
  _globals['_GETCOMPUTERREQUEST']._serialized_start=80
  _globals['_GETCOMPUTERREQUEST']._serialized_end=100
  _globals['_GETCOMPUTERRESPONSE']._serialized_start=102
  _globals['_GETCOMPUTERRESPONSE']._serialized_end=141
  _globals['_EXPORTCHALLENGERESPONSE']._serialized_start=143
  _globals['_EXPORTCHALLENGERESPONSE']._serialized_end=188
  _globals['_IMPORTCHALLENGEREQUEST']._serialized_start=190
  _globals['_IMPORTCHALLENGEREQUEST']._serialized_end=234
  _globals['_IMPORTCHALLENGERESPONSE']._serialized_start=236
  _globals['_IMPORTCHALLENGERESPONSE']._serialized_end=296
  _globals['_SIGNEDURLREQUEST']._serialized_start=298
  _globals['_SIGNEDURLREQUEST']._serialized_end=336
  _globals['_SIGNEDURLRESPONSE']._serialized_start=338
  _globals['_SIGNEDURLRESPONSE']._serialized_end=375
  _globals['_REMOVEREQUEST']._serialized_start=377
  _globals['_REMOVEREQUEST']._serialized_end=412
  _globals['_REMOVERESPONSE']._serialized_start=414
  _globals['_REMOVERESPONSE']._serialized_end=430
  _globals['_READDIRREQUEST']._serialized_start=432
  _globals['_READDIRREQUEST']._serialized_end=468
  _globals['_READDIRRESPONSE']._serialized_start=470
  _globals['_READDIRRESPONSE']._serialized_end=525
  _globals['_FILEINFO']._serialized_start=527
  _globals['_FILEINFO']._serialized_end=600
  _globals['_GETUSERWRITEUPRESPONSE']._serialized_start=602
  _globals['_GETUSERWRITEUPRESPONSE']._serialized_end=652
  _globals['_GRPCTYPEINFO']._serialized_start=655
  _globals['_GRPCTYPEINFO']._serialized_end=1092
  _globals['_GRPCTYPEINFO_DESCLOOKUPENTRY']._serialized_start=896
  _globals['_GRPCTYPEINFO_DESCLOOKUPENTRY']._serialized_end=991
  _globals['_GRPCTYPEINFO_ENUMLOOKUPENTRY']._serialized_start=993
  _globals['_GRPCTYPEINFO_ENUMLOOKUPENTRY']._serialized_end=1092
  _globals['_CHALLENGETYPERESPONSE']._serialized_start=1094
  _globals['_CHALLENGETYPERESPONSE']._serialized_end=1166
  _globals['_EMPTY']._serialized_start=1168
  _globals['_EMPTY']._serialized_end=1175
  _globals['_UPSERTCHALLENGEREQUEST']._serialized_start=1177
  _globals['_UPSERTCHALLENGEREQUEST']._serialized_end=1259
  _globals['_DELETECHALLENGEREQUEST']._serialized_start=1261
  _globals['_DELETECHALLENGEREQUEST']._serialized_end=1323
  _globals['_SUBMITEVIDENCEREPORTREQUEST']._serialized_start=1325
  _globals['_SUBMITEVIDENCEREPORTREQUEST']._serialized_end=1372
  _globals['_SUBMITEVIDENCEREPORTRESPONSE']._serialized_start=1374
  _globals['_SUBMITEVIDENCEREPORTRESPONSE']._serialized_end=1404
  _globals['_LOGINREQUEST']._serialized_start=1406
  _globals['_LOGINREQUEST']._serialized_end=1470
  _globals['_LOGINRESPONSE']._serialized_start=1472
  _globals['_LOGINRESPONSE']._serialized_end=1543
  _globals['_EVIDENCE']._serialized_start=1546
  _globals['_EVIDENCE']._serialized_end=1678
  _globals['_CONNECTION']._serialized_start=1680
  _globals['_CONNECTION']._serialized_end=1766
  _globals['_GETDISCOVEREDEVIDENCEREQUEST']._serialized_start=1768
  _globals['_GETDISCOVEREDEVIDENCEREQUEST']._serialized_end=1798
  _globals['_GETDISCOVEREDEVIDENCERESPONSE']._serialized_start=1801
  _globals['_GETDISCOVEREDEVIDENCERESPONSE']._serialized_end=1952
  _globals['_SUBMITEVIDENCEREQUEST']._serialized_start=1954
  _globals['_SUBMITEVIDENCEREQUEST']._serialized_end=2081
  _globals['_SUBMITEVIDENCERESPONSE']._serialized_start=2083
  _globals['_SUBMITEVIDENCERESPONSE']._serialized_end=2127
  _globals['_SUBMITEVIDENCECONNECTIONREQUEST']._serialized_start=2129
  _globals['_SUBMITEVIDENCECONNECTIONREQUEST']._serialized_end=2244
  _globals['_SUBMITEVIDENCECONNECTIONRESPONSE']._serialized_start=2246
  _globals['_SUBMITEVIDENCECONNECTIONRESPONSE']._serialized_end=2306
  _globals['_REGISTERREQUEST']._serialized_start=2308
  _globals['_REGISTERREQUEST']._serialized_end=2403
  _globals['_REGISTERRESPONSE']._serialized_start=2405
  _globals['_REGISTERRESPONSE']._serialized_end=2449
  _globals['_PAGE']._serialized_start=2451
  _globals['_PAGE']._serialized_end=2527
  _globals['_CURRENTUSERREQUEST']._serialized_start=2529
  _globals['_CURRENTUSERREQUEST']._serialized_end=2549
  _globals['_CURRENTUSERRESPONSE']._serialized_start=2551
  _globals['_CURRENTUSERRESPONSE']._serialized_end=2662
  _globals['_SUBMITFLAGREQUEST']._serialized_start=2664
  _globals['_SUBMITFLAGREQUEST']._serialized_end=2703
  _globals['_SUBMITFLAGRESPONSE']._serialized_start=2705
  _globals['_SUBMITFLAGRESPONSE']._serialized_end=2751
  _globals['_TEAMPROGRESS']._serialized_start=2753
  _globals['_TEAMPROGRESS']._serialized_end=2871
  _globals['_GETTEAMSPROGRESSREQUEST']._serialized_start=2873
  _globals['_GETTEAMSPROGRESSREQUEST']._serialized_end=2898
  _globals['_GETTEAMSPROGRESSRESPONSE']._serialized_start=2900
  _globals['_GETTEAMSPROGRESSRESPONSE']._serialized_end=2968
  _globals['_CHALLENGE']._serialized_start=2970
  _globals['_CHALLENGE']._serialized_end=3021
  _globals['_GETALLCHALLENGESREQUEST']._serialized_start=3023
  _globals['_GETALLCHALLENGESREQUEST']._serialized_end=3048
  _globals['_GETALLCHALLENGESRESPONSE']._serialized_start=3050
  _globals['_GETALLCHALLENGESRESPONSE']._serialized_end=3125
  _globals['_SETHOMEPAGEREQUEST']._serialized_start=3127
  _globals['_SETHOMEPAGEREQUEST']._serialized_end=3173
  _globals['_GETHOMEPAGEREQUEST']._serialized_start=3175
  _globals['_GETHOMEPAGEREQUEST']._serialized_end=3195
  _globals['_GETHOMEPAGERESPONSE']._serialized_start=3197
  _globals['_GETHOMEPAGERESPONSE']._serialized_end=3296
  _globals['_ENTRYPOINT']._serialized_start=3298
  _globals['_ENTRYPOINT']._serialized_end=3352
  _globals['_FORGOTPASSWORDREQUEST']._serialized_start=3354
  _globals['_FORGOTPASSWORDREQUEST']._serialized_end=3399
  _globals['_SUBMITWRITEUPREQUEST']._serialized_start=3401
  _globals['_SUBMITWRITEUPREQUEST']._serialized_end=3469
  _globals['_GETWRITEUPREQUEST']._serialized_start=3471
  _globals['_GETWRITEUPREQUEST']._serialized_end=3518
  _globals['_GETWRITEUPRESPONSE']._serialized_start=3520
  _globals['_GETWRITEUPRESPONSE']._serialized_end=3586
  _globals['_SUBMITGRADEREQUEST']._serialized_start=3588
  _globals['_SUBMITGRADEREQUEST']._serialized_end=3658
  _globals['_HIGHLIGHTAREA']._serialized_start=3661
  _globals['_HIGHLIGHTAREA']._serialized_end=3790
  _globals['_SUBMITCOMMENTREQUEST']._serialized_start=3793
  _globals['_SUBMITCOMMENTREQUEST']._serialized_end=3950
  _globals['_GETCOMMENTSREQUEST']._serialized_start=3952
  _globals['_GETCOMMENTSREQUEST']._serialized_end=4000
  _globals['_COMMENT']._serialized_start=4002
  _globals['_COMMENT']._serialized_end=4118
  _globals['_GETCOMMENTSRESPONSE']._serialized_start=4120
  _globals['_GETCOMMENTSRESPONSE']._serialized_end=4184
  _globals['_GETUSERGRAPHREQUEST']._serialized_start=4186
  _globals['_GETUSERGRAPHREQUEST']._serialized_end=4235
  _globals['_GETUSERGRAPHRESPONSE']._serialized_start=4237
  _globals['_GETUSERGRAPHRESPONSE']._serialized_end=4355
  _globals['_BACKEND']._serialized_start=4358
  _globals['_BACKEND']._serialized_end=5636
  _globals['_ADMIN']._serialized_start=5639
  _globals['_ADMIN']._serialized_end=6560
# @@protoc_insertion_point(module_scope)