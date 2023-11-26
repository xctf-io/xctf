// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        (unknown)
// source: kubes/kubes.proto

package kubes

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

type ListDeploymentsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Namespace string `protobuf:"bytes,1,opt,name=namespace,proto3" json:"namespace,omitempty"`
}

func (x *ListDeploymentsRequest) Reset() {
	*x = ListDeploymentsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_kubes_kubes_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListDeploymentsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListDeploymentsRequest) ProtoMessage() {}

func (x *ListDeploymentsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_kubes_kubes_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListDeploymentsRequest.ProtoReflect.Descriptor instead.
func (*ListDeploymentsRequest) Descriptor() ([]byte, []int) {
	return file_kubes_kubes_proto_rawDescGZIP(), []int{0}
}

func (x *ListDeploymentsRequest) GetNamespace() string {
	if x != nil {
		return x.Namespace
	}
	return ""
}

type ListDeploymentsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Deployments []*Deployment `protobuf:"bytes,1,rep,name=deployments,proto3" json:"deployments,omitempty"`
}

func (x *ListDeploymentsResponse) Reset() {
	*x = ListDeploymentsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_kubes_kubes_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListDeploymentsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListDeploymentsResponse) ProtoMessage() {}

func (x *ListDeploymentsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_kubes_kubes_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListDeploymentsResponse.ProtoReflect.Descriptor instead.
func (*ListDeploymentsResponse) Descriptor() ([]byte, []int) {
	return file_kubes_kubes_proto_rawDescGZIP(), []int{1}
}

func (x *ListDeploymentsResponse) GetDeployments() []*Deployment {
	if x != nil {
		return x.Deployments
	}
	return nil
}

type NewDeploymentRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *NewDeploymentRequest) Reset() {
	*x = NewDeploymentRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_kubes_kubes_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NewDeploymentRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NewDeploymentRequest) ProtoMessage() {}

func (x *NewDeploymentRequest) ProtoReflect() protoreflect.Message {
	mi := &file_kubes_kubes_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NewDeploymentRequest.ProtoReflect.Descriptor instead.
func (*NewDeploymentRequest) Descriptor() ([]byte, []int) {
	return file_kubes_kubes_proto_rawDescGZIP(), []int{2}
}

func (x *NewDeploymentRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type NewDeploymentResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Deployment *Deployment `protobuf:"bytes,1,opt,name=deployment,proto3" json:"deployment,omitempty"`
}

func (x *NewDeploymentResponse) Reset() {
	*x = NewDeploymentResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_kubes_kubes_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NewDeploymentResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NewDeploymentResponse) ProtoMessage() {}

func (x *NewDeploymentResponse) ProtoReflect() protoreflect.Message {
	mi := &file_kubes_kubes_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NewDeploymentResponse.ProtoReflect.Descriptor instead.
func (*NewDeploymentResponse) Descriptor() ([]byte, []int) {
	return file_kubes_kubes_proto_rawDescGZIP(), []int{3}
}

func (x *NewDeploymentResponse) GetDeployment() *Deployment {
	if x != nil {
		return x.Deployment
	}
	return nil
}

type Deployment struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name      string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Namespace string `protobuf:"bytes,2,opt,name=namespace,proto3" json:"namespace,omitempty"`
	Image     string `protobuf:"bytes,3,opt,name=image,proto3" json:"image,omitempty"`
	Replicas  int32  `protobuf:"varint,4,opt,name=replicas,proto3" json:"replicas,omitempty"`
	Status    string `protobuf:"bytes,5,opt,name=status,proto3" json:"status,omitempty"`
	Id        string `protobuf:"bytes,6,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *Deployment) Reset() {
	*x = Deployment{}
	if protoimpl.UnsafeEnabled {
		mi := &file_kubes_kubes_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Deployment) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Deployment) ProtoMessage() {}

func (x *Deployment) ProtoReflect() protoreflect.Message {
	mi := &file_kubes_kubes_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Deployment.ProtoReflect.Descriptor instead.
func (*Deployment) Descriptor() ([]byte, []int) {
	return file_kubes_kubes_proto_rawDescGZIP(), []int{4}
}

func (x *Deployment) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Deployment) GetNamespace() string {
	if x != nil {
		return x.Namespace
	}
	return ""
}

func (x *Deployment) GetImage() string {
	if x != nil {
		return x.Image
	}
	return ""
}

func (x *Deployment) GetReplicas() int32 {
	if x != nil {
		return x.Replicas
	}
	return 0
}

func (x *Deployment) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

func (x *Deployment) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

var File_kubes_kubes_proto protoreflect.FileDescriptor

var file_kubes_kubes_proto_rawDesc = []byte{
	0x0a, 0x11, 0x6b, 0x75, 0x62, 0x65, 0x73, 0x2f, 0x6b, 0x75, 0x62, 0x65, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x05, 0x6b, 0x75, 0x62, 0x65, 0x73, 0x22, 0x36, 0x0a, 0x16, 0x4c, 0x69,
	0x73, 0x74, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x70, 0x61, 0x63,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x70, 0x61,
	0x63, 0x65, 0x22, 0x4e, 0x0a, 0x17, 0x4c, 0x69, 0x73, 0x74, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79,
	0x6d, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x33, 0x0a,
	0x0b, 0x64, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03,
	0x28, 0x0b, 0x32, 0x11, 0x2e, 0x6b, 0x75, 0x62, 0x65, 0x73, 0x2e, 0x44, 0x65, 0x70, 0x6c, 0x6f,
	0x79, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x0b, 0x64, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e,
	0x74, 0x73, 0x22, 0x2a, 0x0a, 0x14, 0x4e, 0x65, 0x77, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d,
	0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x4a,
	0x0a, 0x15, 0x4e, 0x65, 0x77, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x31, 0x0a, 0x0a, 0x64, 0x65, 0x70, 0x6c, 0x6f,
	0x79, 0x6d, 0x65, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x6b, 0x75,
	0x62, 0x65, 0x73, 0x2e, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x0a,
	0x64, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x22, 0x98, 0x01, 0x0a, 0x0a, 0x44,
	0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1c, 0x0a,
	0x09, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x70, 0x61, 0x63, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x09, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x70, 0x61, 0x63, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x69,
	0x6d, 0x61, 0x67, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x69, 0x6d, 0x61, 0x67,
	0x65, 0x12, 0x1a, 0x0a, 0x08, 0x72, 0x65, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x73, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x08, 0x72, 0x65, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x73, 0x12, 0x16, 0x0a,
	0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73,
	0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x06, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x02, 0x69, 0x64, 0x32, 0xac, 0x01, 0x0a, 0x0c, 0x4b, 0x75, 0x62, 0x65, 0x73, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x50, 0x0a, 0x0f, 0x4c, 0x69, 0x73, 0x74, 0x44, 0x65,
	0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x12, 0x1d, 0x2e, 0x6b, 0x75, 0x62, 0x65,
	0x73, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74,
	0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e, 0x6b, 0x75, 0x62, 0x65, 0x73,
	0x2e, 0x4c, 0x69, 0x73, 0x74, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4a, 0x0a, 0x0d, 0x4e, 0x65, 0x77, 0x44,
	0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x1b, 0x2e, 0x6b, 0x75, 0x62, 0x65,
	0x73, 0x2e, 0x4e, 0x65, 0x77, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1c, 0x2e, 0x6b, 0x75, 0x62, 0x65, 0x73, 0x2e, 0x4e,
	0x65, 0x77, 0x44, 0x65, 0x70, 0x6c, 0x6f, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x42, 0x6e, 0x0a, 0x09, 0x63, 0x6f, 0x6d, 0x2e, 0x6b, 0x75, 0x62, 0x65,
	0x73, 0x42, 0x0a, 0x4b, 0x75, 0x62, 0x65, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a,
	0x21, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x78, 0x63, 0x74, 0x66,
	0x2d, 0x69, 0x6f, 0x2f, 0x78, 0x63, 0x74, 0x66, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x6b, 0x75, 0x62,
	0x65, 0x73, 0xa2, 0x02, 0x03, 0x4b, 0x58, 0x58, 0xaa, 0x02, 0x05, 0x4b, 0x75, 0x62, 0x65, 0x73,
	0xca, 0x02, 0x05, 0x4b, 0x75, 0x62, 0x65, 0x73, 0xe2, 0x02, 0x11, 0x4b, 0x75, 0x62, 0x65, 0x73,
	0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x05, 0x4b,
	0x75, 0x62, 0x65, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_kubes_kubes_proto_rawDescOnce sync.Once
	file_kubes_kubes_proto_rawDescData = file_kubes_kubes_proto_rawDesc
)

func file_kubes_kubes_proto_rawDescGZIP() []byte {
	file_kubes_kubes_proto_rawDescOnce.Do(func() {
		file_kubes_kubes_proto_rawDescData = protoimpl.X.CompressGZIP(file_kubes_kubes_proto_rawDescData)
	})
	return file_kubes_kubes_proto_rawDescData
}

var file_kubes_kubes_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_kubes_kubes_proto_goTypes = []interface{}{
	(*ListDeploymentsRequest)(nil),  // 0: kubes.ListDeploymentsRequest
	(*ListDeploymentsResponse)(nil), // 1: kubes.ListDeploymentsResponse
	(*NewDeploymentRequest)(nil),    // 2: kubes.NewDeploymentRequest
	(*NewDeploymentResponse)(nil),   // 3: kubes.NewDeploymentResponse
	(*Deployment)(nil),              // 4: kubes.Deployment
}
var file_kubes_kubes_proto_depIdxs = []int32{
	4, // 0: kubes.ListDeploymentsResponse.deployments:type_name -> kubes.Deployment
	4, // 1: kubes.NewDeploymentResponse.deployment:type_name -> kubes.Deployment
	0, // 2: kubes.KubesService.ListDeployments:input_type -> kubes.ListDeploymentsRequest
	2, // 3: kubes.KubesService.NewDeployment:input_type -> kubes.NewDeploymentRequest
	1, // 4: kubes.KubesService.ListDeployments:output_type -> kubes.ListDeploymentsResponse
	3, // 5: kubes.KubesService.NewDeployment:output_type -> kubes.NewDeploymentResponse
	4, // [4:6] is the sub-list for method output_type
	2, // [2:4] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_kubes_kubes_proto_init() }
func file_kubes_kubes_proto_init() {
	if File_kubes_kubes_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_kubes_kubes_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListDeploymentsRequest); i {
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
		file_kubes_kubes_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListDeploymentsResponse); i {
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
		file_kubes_kubes_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NewDeploymentRequest); i {
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
		file_kubes_kubes_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NewDeploymentResponse); i {
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
		file_kubes_kubes_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Deployment); i {
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
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_kubes_kubes_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_kubes_kubes_proto_goTypes,
		DependencyIndexes: file_kubes_kubes_proto_depIdxs,
		MessageInfos:      file_kubes_kubes_proto_msgTypes,
	}.Build()
	File_kubes_kubes_proto = out.File
	file_kubes_kubes_proto_rawDesc = nil
	file_kubes_kubes_proto_goTypes = nil
	file_kubes_kubes_proto_depIdxs = nil
}
