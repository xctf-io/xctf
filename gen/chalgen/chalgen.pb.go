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

type Node struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id   string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Flag string `protobuf:"bytes,3,opt,name=flag,proto3" json:"flag,omitempty"`
	// Types that are assignable to Challenge:
	//
	//	*Node_Base64
	//	*Node_Twitter
	//	*Node_Caesar
	Challenge isNode_Challenge `protobuf_oneof:"challenge"`
}

func (x *Node) Reset() {
	*x = Node{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Node) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Node) ProtoMessage() {}

func (x *Node) ProtoReflect() protoreflect.Message {
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

// Deprecated: Use Node.ProtoReflect.Descriptor instead.
func (*Node) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{3}
}

func (x *Node) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Node) GetName() string {
	if x != nil {
		return x.Name
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

func (x *Node) GetTwitter() *Twitter {
	if x, ok := x.GetChallenge().(*Node_Twitter); ok {
		return x.Twitter
	}
	return nil
}

func (x *Node) GetCaesar() *CaesarCipher {
	if x, ok := x.GetChallenge().(*Node_Caesar); ok {
		return x.Caesar
	}
	return nil
}

type isNode_Challenge interface {
	isNode_Challenge()
}

type Node_Base64 struct {
	Base64 *Base64 `protobuf:"bytes,4,opt,name=base64,proto3,oneof"`
}

type Node_Twitter struct {
	Twitter *Twitter `protobuf:"bytes,5,opt,name=twitter,proto3,oneof"`
}

type Node_Caesar struct {
	Caesar *CaesarCipher `protobuf:"bytes,6,opt,name=caesar,proto3,oneof"`
}

func (*Node_Base64) isNode_Challenge() {}

func (*Node_Twitter) isNode_Challenge() {}

func (*Node_Caesar) isNode_Challenge() {}

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
		mi := &file_chalgen_chalgen_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Edge) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Edge) ProtoMessage() {}

func (x *Edge) ProtoReflect() protoreflect.Message {
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

// Deprecated: Use Edge.ProtoReflect.Descriptor instead.
func (*Edge) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{4}
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

type CaesarCipher struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Plaintext string `protobuf:"bytes,1,opt,name=plaintext,proto3" json:"plaintext,omitempty"`
	Shift     int32  `protobuf:"varint,2,opt,name=shift,proto3" json:"shift,omitempty"`
}

func (x *CaesarCipher) Reset() {
	*x = CaesarCipher{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CaesarCipher) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CaesarCipher) ProtoMessage() {}

func (x *CaesarCipher) ProtoReflect() protoreflect.Message {
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

// Deprecated: Use CaesarCipher.ProtoReflect.Descriptor instead.
func (*CaesarCipher) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{5}
}

func (x *CaesarCipher) GetPlaintext() string {
	if x != nil {
		return x.Plaintext
	}
	return ""
}

func (x *CaesarCipher) GetShift() int32 {
	if x != nil {
		return x.Shift
	}
	return 0
}

type Base64 struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Data string `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *Base64) Reset() {
	*x = Base64{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Base64) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Base64) ProtoMessage() {}

func (x *Base64) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[6]
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
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{6}
}

func (x *Base64) GetData() string {
	if x != nil {
		return x.Data
	}
	return ""
}

type Twitter struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Users    []*User    `protobuf:"bytes,1,rep,name=users,proto3" json:"users,omitempty"`
	Posts    []*Post    `protobuf:"bytes,2,rep,name=posts,proto3" json:"posts,omitempty"`
	Comments []*Comment `protobuf:"bytes,3,rep,name=comments,proto3" json:"comments,omitempty"`
}

func (x *Twitter) Reset() {
	*x = Twitter{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Twitter) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Twitter) ProtoMessage() {}

func (x *Twitter) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Twitter.ProtoReflect.Descriptor instead.
func (*Twitter) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{7}
}

func (x *Twitter) GetUsers() []*User {
	if x != nil {
		return x.Users
	}
	return nil
}

func (x *Twitter) GetPosts() []*Post {
	if x != nil {
		return x.Posts
	}
	return nil
}

func (x *Twitter) GetComments() []*Comment {
	if x != nil {
		return x.Comments
	}
	return nil
}

type User struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Username string `protobuf:"bytes,2,opt,name=username,proto3" json:"username,omitempty"`
	Bio      string `protobuf:"bytes,3,opt,name=bio,proto3" json:"bio,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{8}
}

func (x *User) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *User) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *User) GetBio() string {
	if x != nil {
		return x.Bio
	}
	return ""
}

// Post represents a user's post.
type Post struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	UserId    int64  `protobuf:"varint,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Content   string `protobuf:"bytes,3,opt,name=content,proto3" json:"content,omitempty"`
	Timestamp int64  `protobuf:"varint,4,opt,name=timestamp,proto3" json:"timestamp,omitempty"` // Unix timestamp
}

func (x *Post) Reset() {
	*x = Post{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Post) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Post) ProtoMessage() {}

func (x *Post) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Post.ProtoReflect.Descriptor instead.
func (*Post) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{9}
}

func (x *Post) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Post) GetUserId() int64 {
	if x != nil {
		return x.UserId
	}
	return 0
}

func (x *Post) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *Post) GetTimestamp() int64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

// Comment represents a comment on a post.
type Comment struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	PostId    int64  `protobuf:"varint,2,opt,name=post_id,json=postId,proto3" json:"post_id,omitempty"`
	UserId    int64  `protobuf:"varint,3,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Content   string `protobuf:"bytes,4,opt,name=content,proto3" json:"content,omitempty"`
	Timestamp int64  `protobuf:"varint,5,opt,name=timestamp,proto3" json:"timestamp,omitempty"` // Unix timestamp
}

func (x *Comment) Reset() {
	*x = Comment{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_chalgen_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Comment) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Comment) ProtoMessage() {}

func (x *Comment) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_chalgen_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Comment.ProtoReflect.Descriptor instead.
func (*Comment) Descriptor() ([]byte, []int) {
	return file_chalgen_chalgen_proto_rawDescGZIP(), []int{10}
}

func (x *Comment) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Comment) GetPostId() int64 {
	if x != nil {
		return x.PostId
	}
	return 0
}

func (x *Comment) GetUserId() int64 {
	if x != nil {
		return x.UserId
	}
	return 0
}

func (x *Comment) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *Comment) GetTimestamp() int64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
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
	0x22, 0xd5, 0x01, 0x0a, 0x04, 0x4e, 0x6f, 0x64, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x12, 0x0a,
	0x04, 0x66, 0x6c, 0x61, 0x67, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x66, 0x6c, 0x61,
	0x67, 0x12, 0x29, 0x0a, 0x06, 0x62, 0x61, 0x73, 0x65, 0x36, 0x34, 0x18, 0x04, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x0f, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x42, 0x61, 0x73, 0x65,
	0x36, 0x34, 0x48, 0x00, 0x52, 0x06, 0x62, 0x61, 0x73, 0x65, 0x36, 0x34, 0x12, 0x2c, 0x0a, 0x07,
	0x74, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e,
	0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x54, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x48,
	0x00, 0x52, 0x07, 0x74, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x12, 0x2f, 0x0a, 0x06, 0x63, 0x61,
	0x65, 0x73, 0x61, 0x72, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x63, 0x68, 0x61,
	0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x43, 0x61, 0x65, 0x73, 0x61, 0x72, 0x43, 0x69, 0x70, 0x68, 0x65,
	0x72, 0x48, 0x00, 0x52, 0x06, 0x63, 0x61, 0x65, 0x73, 0x61, 0x72, 0x42, 0x0b, 0x0a, 0x09, 0x63,
	0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x22, 0x2a, 0x0a, 0x04, 0x45, 0x64, 0x67, 0x65,
	0x12, 0x12, 0x0a, 0x04, 0x66, 0x72, 0x6f, 0x6d, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x66, 0x72, 0x6f, 0x6d, 0x12, 0x0e, 0x0a, 0x02, 0x74, 0x6f, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x02, 0x74, 0x6f, 0x22, 0x42, 0x0a, 0x0c, 0x43, 0x61, 0x65, 0x73, 0x61, 0x72, 0x43, 0x69,
	0x70, 0x68, 0x65, 0x72, 0x12, 0x1c, 0x0a, 0x09, 0x70, 0x6c, 0x61, 0x69, 0x6e, 0x74, 0x65, 0x78,
	0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x70, 0x6c, 0x61, 0x69, 0x6e, 0x74, 0x65,
	0x78, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x73, 0x68, 0x69, 0x66, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x05, 0x73, 0x68, 0x69, 0x66, 0x74, 0x22, 0x1c, 0x0a, 0x06, 0x42, 0x61, 0x73, 0x65,
	0x36, 0x34, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22, 0x81, 0x01, 0x0a, 0x07, 0x54, 0x77, 0x69, 0x74, 0x74,
	0x65, 0x72, 0x12, 0x23, 0x0a, 0x05, 0x75, 0x73, 0x65, 0x72, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x55, 0x73, 0x65, 0x72,
	0x52, 0x05, 0x75, 0x73, 0x65, 0x72, 0x73, 0x12, 0x23, 0x0a, 0x05, 0x70, 0x6f, 0x73, 0x74, 0x73,
	0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e,
	0x2e, 0x50, 0x6f, 0x73, 0x74, 0x52, 0x05, 0x70, 0x6f, 0x73, 0x74, 0x73, 0x12, 0x2c, 0x0a, 0x08,
	0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x10,
	0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x43, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74,
	0x52, 0x08, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x22, 0x44, 0x0a, 0x04, 0x55, 0x73,
	0x65, 0x72, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02,
	0x69, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x10,
	0x0a, 0x03, 0x62, 0x69, 0x6f, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x62, 0x69, 0x6f,
	0x22, 0x67, 0x0a, 0x04, 0x50, 0x6f, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72,
	0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49,
	0x64, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x74,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03, 0x52, 0x09,
	0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x22, 0x83, 0x01, 0x0a, 0x07, 0x43, 0x6f,
	0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x70, 0x6f, 0x73, 0x74, 0x5f, 0x69, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x70, 0x6f, 0x73, 0x74, 0x49, 0x64, 0x12, 0x17,
	0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65,
	0x6e, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x74, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x32,
	0x10, 0x0a, 0x0e, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
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

var file_chalgen_chalgen_proto_msgTypes = make([]protoimpl.MessageInfo, 11)
var file_chalgen_chalgen_proto_goTypes = []interface{}{
	(*GenerateRequest)(nil),  // 0: chalgen.GenerateRequest
	(*GenerateResponse)(nil), // 1: chalgen.GenerateResponse
	(*Graph)(nil),            // 2: chalgen.Graph
	(*Node)(nil),             // 3: chalgen.Node
	(*Edge)(nil),             // 4: chalgen.Edge
	(*CaesarCipher)(nil),     // 5: chalgen.CaesarCipher
	(*Base64)(nil),           // 6: chalgen.Base64
	(*Twitter)(nil),          // 7: chalgen.Twitter
	(*User)(nil),             // 8: chalgen.User
	(*Post)(nil),             // 9: chalgen.Post
	(*Comment)(nil),          // 10: chalgen.Comment
}
var file_chalgen_chalgen_proto_depIdxs = []int32{
	2,  // 0: chalgen.GenerateRequest.graph:type_name -> chalgen.Graph
	3,  // 1: chalgen.Graph.nodes:type_name -> chalgen.Node
	4,  // 2: chalgen.Graph.edges:type_name -> chalgen.Edge
	6,  // 3: chalgen.Node.base64:type_name -> chalgen.Base64
	7,  // 4: chalgen.Node.twitter:type_name -> chalgen.Twitter
	5,  // 5: chalgen.Node.caesar:type_name -> chalgen.CaesarCipher
	8,  // 6: chalgen.Twitter.users:type_name -> chalgen.User
	9,  // 7: chalgen.Twitter.posts:type_name -> chalgen.Post
	10, // 8: chalgen.Twitter.comments:type_name -> chalgen.Comment
	9,  // [9:9] is the sub-list for method output_type
	9,  // [9:9] is the sub-list for method input_type
	9,  // [9:9] is the sub-list for extension type_name
	9,  // [9:9] is the sub-list for extension extendee
	0,  // [0:9] is the sub-list for field type_name
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
		file_chalgen_chalgen_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_chalgen_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CaesarCipher); i {
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
		file_chalgen_chalgen_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_chalgen_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Twitter); i {
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
		file_chalgen_chalgen_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User); i {
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
		file_chalgen_chalgen_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Post); i {
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
		file_chalgen_chalgen_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Comment); i {
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
	file_chalgen_chalgen_proto_msgTypes[3].OneofWrappers = []interface{}{
		(*Node_Base64)(nil),
		(*Node_Twitter)(nil),
		(*Node_Caesar)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_chalgen_chalgen_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   11,
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
