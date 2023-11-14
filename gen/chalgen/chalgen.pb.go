// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        (unknown)
// source: chalgen/chalgen.proto

package chalgen

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type GenerateRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Graph *Graph `protobuf:"bytes,1,opt,name=graph,proto3" json:"graph,omitempty"`
}

func (x *GenerateRequest) Reset() {
	*x = GenerateRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GenerateRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GenerateRequest) ProtoMessage() {}

func (x *GenerateRequest) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GenerateRequest.ProtoReflect.Descriptor instead.
func (*GenerateRequest) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{0}
}

func (x *GenerateRequest) GetGraph() *Graph {
	if x != nil {
		return x.Graph
	}
	return nil
}

type GenerateResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GenerateResponse) Reset() {
	*x = GenerateResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GenerateResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GenerateResponse) ProtoMessage() {}

func (x *GenerateResponse) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GenerateResponse.ProtoReflect.Descriptor instead.
func (*GenerateResponse) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{1}
}

type Graph struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Nodes []*Node `protobuf:"bytes,1,rep,name=nodes,proto3" json:"nodes,omitempty"`
	Edges []*Edge `protobuf:"bytes,2,rep,name=edges,proto3" json:"edges,omitempty"`
}

func (x *Graph) Reset() {
	*x = Graph{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Graph) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Graph) ProtoMessage() {}

func (x *Graph) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Graph.ProtoReflect.Descriptor instead.
func (*Graph) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{2}
}

func (x *Graph) GetNodes() []*Node {
	if x != nil {
		return x.Nodes
	}
	return nil
}

func (x *Graph) GetEdges() []*Edge {
	if x != nil {
		return x.Edges
	}
	return nil
}

type Edge struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	From string `protobuf:"bytes,1,opt,name=from,proto3" json:"from,omitempty"`
	To   string `protobuf:"bytes,2,opt,name=to,proto3" json:"to,omitempty"`
}

func (x *Edge) Reset() {
	*x = Edge{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Edge) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Edge) ProtoMessage() {}

func (x *Edge) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Edge.ProtoReflect.Descriptor instead.
func (*Edge) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{3}
}

func (x *Edge) GetFrom() string {
	if x != nil {
		return x.From
	}
	return ""
}

func (x *Edge) GetTo() string {
	if x != nil {
		return x.To
	}
	return ""
}

type Node struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id   string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Flag string `protobuf:"bytes,2,opt,name=flag,proto3" json:"flag,omitempty"`
	// Types that are assignable to Challenge:
	//
	//	*Node_Base64
	Challenge isNode_Challenge `protobuf_oneof:"challenge"`
}

func (x *Node) Reset() {
	*x = Node{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Node) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Node) ProtoMessage() {}

func (x *Node) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Node.ProtoReflect.Descriptor instead.
func (*Node) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{4}
}

func (x *Node) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Node) GetFlag() string {
	if x != nil {
		return x.Flag
	}
	return ""
}

func (m *Node) GetChallenge() isNode_Challenge {
	if m != nil {
		return m.Challenge
	}
	return nil
}

func (x *Node) GetBase64() *Base64 {
	if x, ok := x.GetChallenge().(*Node_Base64); ok {
		return x.Base64
	}
	return nil
}

type isNode_Challenge interface {
	isNode_Challenge()
}

type Node_Base64 struct {
	Base64 *Base64 `protobuf:"bytes,3,opt,name=base64,proto3,oneof"`
}

func (*Node_Base64) isNode_Challenge() {}

type Base64 struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Data string `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *Base64) Reset() {
	*x = Base64{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Base64) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Base64) ProtoMessage() {}

func (x *Base64) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Base64.ProtoReflect.Descriptor instead.
func (*Base64) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{5}
}

func (x *Base64) GetData() string {
	if x != nil {
		return x.Data
	}
	return ""
}

var File_chalgen_chalgen_proto protoreflect.FileDescriptor

var file_chalgen_chalgen_proto_rawDesc = []byte{
	0x0a, 0x15, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2f, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65,
	0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x07, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e,
	0x22, 0x37, 0x0a, 0x0f, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x24, 0x0a, 0x05, 0x67, 0x72, 0x61, 0x70, 0x68, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x47, 0x72, 0x61,
	0x70, 0x68, 0x52, 0x05, 0x67, 0x72, 0x61, 0x70, 0x68, 0x22, 0x12, 0x0a, 0x10, 0x47, 0x65, 0x6e,
	0x65, 0x72, 0x61, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x51, 0x0a,
	0x05, 0x47, 0x72, 0x61, 0x70, 0x68, 0x12, 0x23, 0x0a, 0x05, 0x6e, 0x6f, 0x64, 0x65, 0x73, 0x18,
	0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e,
	0x4e, 0x6f, 0x64, 0x65, 0x52, 0x05, 0x6e, 0x6f, 0x64, 0x65, 0x73, 0x12, 0x23, 0x0a, 0x05, 0x65,
	0x64, 0x67, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61,
	0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x45, 0x64, 0x67, 0x65, 0x52, 0x05, 0x65, 0x64, 0x67, 0x65, 0x73,
	0x22, 0x2a, 0x0a, 0x04, 0x45, 0x64, 0x67, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x66, 0x72, 0x6f, 0x6d,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x66, 0x72, 0x6f, 0x6d, 0x12, 0x0e, 0x0a, 0x02,
	0x74, 0x6f, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x74, 0x6f, 0x22, 0x62, 0x0a, 0x04,
	0x4e, 0x6f, 0x64, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x66, 0x6c, 0x61, 0x67, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x66, 0x6c, 0x61, 0x67, 0x12, 0x29, 0x0a, 0x06, 0x62, 0x61, 0x73, 0x65,
	0x36, 0x34, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0x2e, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x48, 0x00, 0x52, 0x06, 0x62, 0x61, 0x73,
	0x65, 0x36, 0x34, 0x42, 0x0b, 0x0a, 0x09, 0x63, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65,
	0x22, 0x1c, 0x0a, 0x06, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61,
	0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x32, 0x51,
	0x0a, 0x0e, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x3f, 0x0a, 0x08, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x12, 0x18, 0x2e, 0x63,
	0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x19, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e,
	0x2e, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x42, 0x7c, 0x0a, 0x0b, 0x63, 0x6f, 0x6d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e,
	0x42, 0x0c, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x23, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x78, 0x63, 0x74,
	0x66, 0x2d, 0x69, 0x6f, 0x2f, 0x78, 0x63, 0x74, 0x66, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x63, 0x68,
	0x61, 0x6c, 0x67, 0x65, 0x6e, 0xa2, 0x02, 0x03, 0x43, 0x58, 0x58, 0xaa, 0x02, 0x07, 0x43, 0x68,
	0x61, 0x6c, 0x67, 0x65, 0x6e, 0xca, 0x02, 0x07, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0xe2,
	0x02, 0x13, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x07, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_chalgen_chalgen_proto_rawDescOnce sync.Once
	file_chalgen_chalgen_proto_rawDescData = file_chalgen_chalgen_proto_rawDesc
)

func file_chalgen_chalgen_proto_rawDescGZIP() []byte {
	file_chalgen_chalgen_proto_rawDescOnce.Do(func() {
		file_chalgen_chalgen_proto_rawDescData = protoimpl.X.CompressGZIP(file_chalgen_chalgen_proto_rawDescData)
	})
	return file_chalgen_chalgen_proto_rawDescData
}

var file_chalgen_chalgen_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_chalgen_chalgen_proto_goTypes = []interface{}{
	(*GenerateRequest)(nil),  // 0: chalgen.GenerateRequest
	(*GenerateResponse)(nil), // 1: chalgen.GenerateResponse
	(*Graph)(nil),            // 2: chalgen.Graph
	(*Edge)(nil),             // 3: chalgen.Edge
	(*Node)(nil),             // 4: chalgen.Node
	(*Base64)(nil),           // 5: chalgen.Base64
}
var file_chalgen_chalgen_proto_depIdxs = []int32{
	2, // 0: chalgen.GenerateRequest.graph:type_name -> chalgen.Graph
	4, // 1: chalgen.Graph.nodes:type_name -> chalgen.Node
	3, // 2: chalgen.Graph.edges:type_name -> chalgen.Edge
	5, // 3: chalgen.Node.base64:type_name -> chalgen.Base64
	0, // 4: chalgen.ChalgenService.Generate:input_type -> chalgen.GenerateRequest
	1, // 5: chalgen.ChalgenService.Generate:output_type -> chalgen.GenerateResponse
	5, // [5:6] is the sub-list for method output_type
	4, // [4:5] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_chalgen_chalgen_proto_init() }
func file_chalgen_chalgen_proto_init() {
	if File_chalgen_chalgen_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_chalgen_chalgen_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GenerateRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_chalgen_chalgen_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GenerateResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_chalgen_chalgen_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Graph); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_chalgen_chalgen_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Edge); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_chalgen_chalgen_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Node); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_chalgen_chalgen_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Base64); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_chalgen_chalgen_proto_msgTypes[4].OneofWrappers = []interface{}{
		(*Node_Base64)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_chalgen_chalgen_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_chalgen_chalgen_proto_goTypes,
		DependencyIndexes: file_chalgen_chalgen_proto_depIdxs,
		MessageInfos:      file_chalgen_chalgen_proto_msgTypes,
	}.Build()
	File_chalgen_chalgen_proto = out.File
	file_chalgen_chalgen_proto_rawDesc = nil
	file_chalgen_chalgen_proto_goTypes = nil
	file_chalgen_chalgen_proto_depIdxs = nil
}
