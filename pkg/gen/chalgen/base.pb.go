// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        (unknown)
// source: chalgen/base.proto

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

type Challenge struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Type:
	//
	//	*Challenge_Base64
	//	*Challenge_Twitter
	//	*Challenge_Caesar
	//	*Challenge_Pcap
	//	*Challenge_Exif
	//	*Challenge_Slack
	//	*Challenge_Phone
	Type isChallenge_Type `protobuf_oneof:"type"`
}

func (x *Challenge) Reset() {
	*x = Challenge{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Challenge) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Challenge) ProtoMessage() {}

func (x *Challenge) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Challenge.ProtoReflect.Descriptor instead.
func (*Challenge) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{0}
}

func (m *Challenge) GetType() isChallenge_Type {
	if m != nil {
		return m.Type
	}
	return nil
}

func (x *Challenge) GetBase64() *Base64 {
	if x, ok := x.GetType().(*Challenge_Base64); ok {
		return x.Base64
	}
	return nil
}

func (x *Challenge) GetTwitter() *Twitter {
	if x, ok := x.GetType().(*Challenge_Twitter); ok {
		return x.Twitter
	}
	return nil
}

func (x *Challenge) GetCaesar() *CaesarCipher {
	if x, ok := x.GetType().(*Challenge_Caesar); ok {
		return x.Caesar
	}
	return nil
}

func (x *Challenge) GetPcap() *PCAP {
	if x, ok := x.GetType().(*Challenge_Pcap); ok {
		return x.Pcap
	}
	return nil
}

func (x *Challenge) GetExif() *Exif {
	if x, ok := x.GetType().(*Challenge_Exif); ok {
		return x.Exif
	}
	return nil
}

func (x *Challenge) GetSlack() *Slack {
	if x, ok := x.GetType().(*Challenge_Slack); ok {
		return x.Slack
	}
	return nil
}

func (x *Challenge) GetPhone() *Phone {
	if x, ok := x.GetType().(*Challenge_Phone); ok {
		return x.Phone
	}
	return nil
}

type isChallenge_Type interface {
	isChallenge_Type()
}

type Challenge_Base64 struct {
	Base64 *Base64 `protobuf:"bytes,6,opt,name=base64,proto3,oneof"`
}

type Challenge_Twitter struct {
	Twitter *Twitter `protobuf:"bytes,7,opt,name=twitter,proto3,oneof"`
}

type Challenge_Caesar struct {
	Caesar *CaesarCipher `protobuf:"bytes,8,opt,name=caesar,proto3,oneof"`
}

type Challenge_Pcap struct {
	Pcap *PCAP `protobuf:"bytes,9,opt,name=pcap,proto3,oneof"`
}

type Challenge_Exif struct {
	Exif *Exif `protobuf:"bytes,10,opt,name=exif,proto3,oneof"`
}

type Challenge_Slack struct {
	Slack *Slack `protobuf:"bytes,11,opt,name=slack,proto3,oneof"`
}

type Challenge_Phone struct {
	Phone *Phone `protobuf:"bytes,12,opt,name=phone,proto3,oneof"`
}

func (*Challenge_Base64) isChallenge_Type() {}

func (*Challenge_Twitter) isChallenge_Type() {}

func (*Challenge_Caesar) isChallenge_Type() {}

func (*Challenge_Pcap) isChallenge_Type() {}

func (*Challenge_Exif) isChallenge_Type() {}

func (*Challenge_Slack) isChallenge_Type() {}

func (*Challenge_Phone) isChallenge_Type() {}

type Phone struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Apps []*App `protobuf:"bytes,1,rep,name=apps,proto3" json:"apps,omitempty"`
}

func (x *Phone) Reset() {
	*x = Phone{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Phone) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Phone) ProtoMessage() {}

func (x *Phone) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Phone.ProtoReflect.Descriptor instead.
func (*Phone) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{1}
}

func (x *Phone) GetApps() []*App {
	if x != nil {
		return x.Apps
	}
	return nil
}

type App struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Url  string `protobuf:"bytes,2,opt,name=url,proto3" json:"url,omitempty"`
}

func (x *App) Reset() {
	*x = App{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *App) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*App) ProtoMessage() {}

func (x *App) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use App.ProtoReflect.Descriptor instead.
func (*App) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{2}
}

func (x *App) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *App) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

type Slack struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Users    []*User    `protobuf:"bytes,1,rep,name=users,proto3" json:"users,omitempty"`
	Channels []*Channel `protobuf:"bytes,2,rep,name=channels,proto3" json:"channels,omitempty"`
}

func (x *Slack) Reset() {
	*x = Slack{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Slack) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Slack) ProtoMessage() {}

func (x *Slack) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Slack.ProtoReflect.Descriptor instead.
func (*Slack) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{3}
}

func (x *Slack) GetUsers() []*User {
	if x != nil {
		return x.Users
	}
	return nil
}

func (x *Slack) GetChannels() []*Channel {
	if x != nil {
		return x.Channels
	}
	return nil
}

type Channel struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name      string     `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Usernames []string   `protobuf:"bytes,2,rep,name=usernames,proto3" json:"usernames,omitempty"`
	Messages  []*Message `protobuf:"bytes,3,rep,name=messages,proto3" json:"messages,omitempty"`
}

func (x *Channel) Reset() {
	*x = Channel{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Channel) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Channel) ProtoMessage() {}

func (x *Channel) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Channel.ProtoReflect.Descriptor instead.
func (*Channel) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{4}
}

func (x *Channel) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Channel) GetUsernames() []string {
	if x != nil {
		return x.Usernames
	}
	return nil
}

func (x *Channel) GetMessages() []*Message {
	if x != nil {
		return x.Messages
	}
	return nil
}

type Message struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username  string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	Content   string `protobuf:"bytes,2,opt,name=content,proto3" json:"content,omitempty"`
	Timestamp int64  `protobuf:"varint,3,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
}

func (x *Message) Reset() {
	*x = Message{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Message) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Message) ProtoMessage() {}

func (x *Message) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Message.ProtoReflect.Descriptor instead.
func (*Message) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{5}
}

func (x *Message) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *Message) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *Message) GetTimestamp() int64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

type Exif struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	Value string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
}

func (x *Exif) Reset() {
	*x = Exif{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Exif) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Exif) ProtoMessage() {}

func (x *Exif) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Exif.ProtoReflect.Descriptor instead.
func (*Exif) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{6}
}

func (x *Exif) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *Exif) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

type PCAP struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Packets []*Packet `protobuf:"bytes,1,rep,name=packets,proto3" json:"packets,omitempty"`
}

func (x *PCAP) Reset() {
	*x = PCAP{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PCAP) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PCAP) ProtoMessage() {}

func (x *PCAP) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PCAP.ProtoReflect.Descriptor instead.
func (*PCAP) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{7}
}

func (x *PCAP) GetPackets() []*Packet {
	if x != nil {
		return x.Packets
	}
	return nil
}

type Packet struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Timestamp   int64  `protobuf:"varint,1,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
	Source      string `protobuf:"bytes,2,opt,name=source,proto3" json:"source,omitempty"`
	Destination string `protobuf:"bytes,3,opt,name=destination,proto3" json:"destination,omitempty"`
	Protocol    string `protobuf:"bytes,4,opt,name=protocol,proto3" json:"protocol,omitempty"`
	Data        string `protobuf:"bytes,5,opt,name=data,proto3" json:"data,omitempty"`
}

func (x *Packet) Reset() {
	*x = Packet{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Packet) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Packet) ProtoMessage() {}

func (x *Packet) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Packet.ProtoReflect.Descriptor instead.
func (*Packet) Descriptor() ([]byte, []int) {
	return file_chalgen_base_proto_rawDescGZIP(), []int{8}
}

func (x *Packet) GetTimestamp() int64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

func (x *Packet) GetSource() string {
	if x != nil {
		return x.Source
	}
	return ""
}

func (x *Packet) GetDestination() string {
	if x != nil {
		return x.Destination
	}
	return ""
}

func (x *Packet) GetProtocol() string {
	if x != nil {
		return x.Protocol
	}
	return ""
}

func (x *Packet) GetData() string {
	if x != nil {
		return x.Data
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
		mi := &file_chalgen_base_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CaesarCipher) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CaesarCipher) ProtoMessage() {}

func (x *CaesarCipher) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[9]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{9}
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
		mi := &file_chalgen_base_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Base64) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Base64) ProtoMessage() {}

func (x *Base64) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[10]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{10}
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
		mi := &file_chalgen_base_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Twitter) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Twitter) ProtoMessage() {}

func (x *Twitter) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[11]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{11}
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

	Username string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	Bio      string `protobuf:"bytes,2,opt,name=bio,proto3" json:"bio,omitempty"`
	Password string `protobuf:"bytes,3,opt,name=password,proto3" json:"password,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[12]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[12]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{12}
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

func (x *User) GetPassword() string {
	if x != nil {
		return x.Password
	}
	return ""
}

// Post represents a user's post.
type Post struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username string `protobuf:"bytes,1,opt,name=username,proto3" json:"username,omitempty"`
	Content  string `protobuf:"bytes,2,opt,name=content,proto3" json:"content,omitempty"`
}

func (x *Post) Reset() {
	*x = Post{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[13]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Post) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Post) ProtoMessage() {}

func (x *Post) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[13]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{13}
}

func (x *Post) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *Post) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

// Comment represents a comment on a post.
type Comment struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PostNumber int64  `protobuf:"varint,1,opt,name=post_number,json=postNumber,proto3" json:"post_number,omitempty"`
	Username   int64  `protobuf:"varint,2,opt,name=username,proto3" json:"username,omitempty"`
	Content    string `protobuf:"bytes,3,opt,name=content,proto3" json:"content,omitempty"`
}

func (x *Comment) Reset() {
	*x = Comment{}
	if protoimpl.UnsafeEnabled {
		mi := &file_chalgen_base_proto_msgTypes[14]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Comment) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Comment) ProtoMessage() {}

func (x *Comment) ProtoReflect() protoreflect.Message {
	mi := &file_chalgen_base_proto_msgTypes[14]
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
	return file_chalgen_base_proto_rawDescGZIP(), []int{14}
}

func (x *Comment) GetPostNumber() int64 {
	if x != nil {
		return x.PostNumber
	}
	return 0
}

func (x *Comment) GetUsername() int64 {
	if x != nil {
		return x.Username
	}
	return 0
}

func (x *Comment) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

var File_chalgen_base_proto protoreflect.FileDescriptor

var file_chalgen_base_proto_rawDesc = []byte{
	0x0a, 0x12, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2f, 0x62, 0x61, 0x73, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x12, 0x07, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x22, 0xb7, 0x02,
	0x0a, 0x09, 0x43, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x12, 0x29, 0x0a, 0x06, 0x62,
	0x61, 0x73, 0x65, 0x36, 0x34, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x63, 0x68,
	0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x48, 0x00, 0x52, 0x06,
	0x62, 0x61, 0x73, 0x65, 0x36, 0x34, 0x12, 0x2c, 0x0a, 0x07, 0x74, 0x77, 0x69, 0x74, 0x74, 0x65,
	0x72, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65,
	0x6e, 0x2e, 0x54, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x48, 0x00, 0x52, 0x07, 0x74, 0x77, 0x69,
	0x74, 0x74, 0x65, 0x72, 0x12, 0x2f, 0x0a, 0x06, 0x63, 0x61, 0x65, 0x73, 0x61, 0x72, 0x18, 0x08,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x43,
	0x61, 0x65, 0x73, 0x61, 0x72, 0x43, 0x69, 0x70, 0x68, 0x65, 0x72, 0x48, 0x00, 0x52, 0x06, 0x63,
	0x61, 0x65, 0x73, 0x61, 0x72, 0x12, 0x23, 0x0a, 0x04, 0x70, 0x63, 0x61, 0x70, 0x18, 0x09, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x50, 0x43,
	0x41, 0x50, 0x48, 0x00, 0x52, 0x04, 0x70, 0x63, 0x61, 0x70, 0x12, 0x23, 0x0a, 0x04, 0x65, 0x78,
	0x69, 0x66, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0x2e, 0x45, 0x78, 0x69, 0x66, 0x48, 0x00, 0x52, 0x04, 0x65, 0x78, 0x69, 0x66, 0x12,
	0x26, 0x0a, 0x05, 0x73, 0x6c, 0x61, 0x63, 0x6b, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e,
	0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x53, 0x6c, 0x61, 0x63, 0x6b, 0x48, 0x00,
	0x52, 0x05, 0x73, 0x6c, 0x61, 0x63, 0x6b, 0x12, 0x26, 0x0a, 0x05, 0x70, 0x68, 0x6f, 0x6e, 0x65,
	0x18, 0x0c, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e,
	0x2e, 0x50, 0x68, 0x6f, 0x6e, 0x65, 0x48, 0x00, 0x52, 0x05, 0x70, 0x68, 0x6f, 0x6e, 0x65, 0x42,
	0x06, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x22, 0x29, 0x0a, 0x05, 0x50, 0x68, 0x6f, 0x6e, 0x65,
	0x12, 0x20, 0x0a, 0x04, 0x61, 0x70, 0x70, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0c,
	0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x41, 0x70, 0x70, 0x52, 0x04, 0x61, 0x70,
	0x70, 0x73, 0x22, 0x2b, 0x0a, 0x03, 0x41, 0x70, 0x70, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x10, 0x0a,
	0x03, 0x75, 0x72, 0x6c, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75, 0x72, 0x6c, 0x22,
	0x5a, 0x0a, 0x05, 0x53, 0x6c, 0x61, 0x63, 0x6b, 0x12, 0x23, 0x0a, 0x05, 0x75, 0x73, 0x65, 0x72,
	0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65,
	0x6e, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x05, 0x75, 0x73, 0x65, 0x72, 0x73, 0x12, 0x2c, 0x0a,
	0x08, 0x63, 0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x10, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x43, 0x68, 0x61, 0x6e, 0x6e, 0x65,
	0x6c, 0x52, 0x08, 0x63, 0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x22, 0x69, 0x0a, 0x07, 0x43,
	0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x75, 0x73,
	0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x09, 0x75,
	0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x12, 0x2c, 0x0a, 0x08, 0x6d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x63, 0x68, 0x61,
	0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x08, 0x6d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x22, 0x5d, 0x0a, 0x07, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a,
	0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65,
	0x73, 0x74, 0x61, 0x6d, 0x70, 0x22, 0x2e, 0x0a, 0x04, 0x45, 0x78, 0x69, 0x66, 0x12, 0x10, 0x0a,
	0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12,
	0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x76, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x31, 0x0a, 0x04, 0x50, 0x43, 0x41, 0x50, 0x12, 0x29, 0x0a,
	0x07, 0x70, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0f,
	0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x50, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x52,
	0x07, 0x70, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x73, 0x22, 0x90, 0x01, 0x0a, 0x06, 0x50, 0x61, 0x63,
	0x6b, 0x65, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x06, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73,
	0x74, 0x69, 0x6e, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b,
	0x64, 0x65, 0x73, 0x74, 0x69, 0x6e, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x1a, 0x0a, 0x08, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x61, 0x18,
	0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22, 0x42, 0x0a, 0x0c, 0x43,
	0x61, 0x65, 0x73, 0x61, 0x72, 0x43, 0x69, 0x70, 0x68, 0x65, 0x72, 0x12, 0x1c, 0x0a, 0x09, 0x70,
	0x6c, 0x61, 0x69, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09,
	0x70, 0x6c, 0x61, 0x69, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x73, 0x68, 0x69,
	0x66, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x73, 0x68, 0x69, 0x66, 0x74, 0x22,
	0x1c, 0x0a, 0x06, 0x42, 0x61, 0x73, 0x65, 0x36, 0x34, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x61, 0x74,
	0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x64, 0x61, 0x74, 0x61, 0x22, 0x81, 0x01,
	0x0a, 0x07, 0x54, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x12, 0x23, 0x0a, 0x05, 0x75, 0x73, 0x65,
	0x72, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x05, 0x75, 0x73, 0x65, 0x72, 0x73, 0x12, 0x23,
	0x0a, 0x05, 0x70, 0x6f, 0x73, 0x74, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e,
	0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e, 0x50, 0x6f, 0x73, 0x74, 0x52, 0x05, 0x70, 0x6f,
	0x73, 0x74, 0x73, 0x12, 0x2c, 0x0a, 0x08, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x18,
	0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x2e,
	0x43, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x08, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74,
	0x73, 0x22, 0x50, 0x0a, 0x04, 0x55, 0x73, 0x65, 0x72, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65,
	0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65,
	0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x10, 0x0a, 0x03, 0x62, 0x69, 0x6f, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x03, 0x62, 0x69, 0x6f, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77,
	0x6f, 0x72, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77,
	0x6f, 0x72, 0x64, 0x22, 0x3c, 0x0a, 0x04, 0x50, 0x6f, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x75,
	0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75,
	0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65,
	0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x74, 0x22, 0x60, 0x0a, 0x07, 0x43, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x1f, 0x0a, 0x0b,
	0x70, 0x6f, 0x73, 0x74, 0x5f, 0x6e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x0a, 0x70, 0x6f, 0x73, 0x74, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x1a, 0x0a,
	0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e,
	0x74, 0x65, 0x6e, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74,
	0x65, 0x6e, 0x74, 0x42, 0x7d, 0x0a, 0x0b, 0x63, 0x6f, 0x6d, 0x2e, 0x63, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0x42, 0x09, 0x42, 0x61, 0x73, 0x65, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a,
	0x27, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x78, 0x63, 0x74, 0x66,
	0x2d, 0x69, 0x6f, 0x2f, 0x78, 0x63, 0x74, 0x66, 0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x67, 0x65, 0x6e,
	0x2f, 0x63, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0xa2, 0x02, 0x03, 0x43, 0x58, 0x58, 0xaa, 0x02,
	0x07, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0xca, 0x02, 0x07, 0x43, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0xe2, 0x02, 0x13, 0x43, 0x68, 0x61, 0x6c, 0x67, 0x65, 0x6e, 0x5c, 0x47, 0x50, 0x42,
	0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x07, 0x43, 0x68, 0x61, 0x6c, 0x67,
	0x65, 0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_chalgen_base_proto_rawDescOnce sync.Once
	file_chalgen_base_proto_rawDescData = file_chalgen_base_proto_rawDesc
)

func file_chalgen_base_proto_rawDescGZIP() []byte {
	file_chalgen_base_proto_rawDescOnce.Do(func() {
		file_chalgen_base_proto_rawDescData = protoimpl.X.CompressGZIP(file_chalgen_base_proto_rawDescData)
	})
	return file_chalgen_base_proto_rawDescData
}

var file_chalgen_base_proto_msgTypes = make([]protoimpl.MessageInfo, 15)
var file_chalgen_base_proto_goTypes = []interface{}{
	(*Challenge)(nil),    // 0: chalgen.Challenge
	(*Phone)(nil),        // 1: chalgen.Phone
	(*App)(nil),          // 2: chalgen.App
	(*Slack)(nil),        // 3: chalgen.Slack
	(*Channel)(nil),      // 4: chalgen.Channel
	(*Message)(nil),      // 5: chalgen.Message
	(*Exif)(nil),         // 6: chalgen.Exif
	(*PCAP)(nil),         // 7: chalgen.PCAP
	(*Packet)(nil),       // 8: chalgen.Packet
	(*CaesarCipher)(nil), // 9: chalgen.CaesarCipher
	(*Base64)(nil),       // 10: chalgen.Base64
	(*Twitter)(nil),      // 11: chalgen.Twitter
	(*User)(nil),         // 12: chalgen.User
	(*Post)(nil),         // 13: chalgen.Post
	(*Comment)(nil),      // 14: chalgen.Comment
}
var file_chalgen_base_proto_depIdxs = []int32{
	10, // 0: chalgen.Challenge.base64:type_name -> chalgen.Base64
	11, // 1: chalgen.Challenge.twitter:type_name -> chalgen.Twitter
	9,  // 2: chalgen.Challenge.caesar:type_name -> chalgen.CaesarCipher
	7,  // 3: chalgen.Challenge.pcap:type_name -> chalgen.PCAP
	6,  // 4: chalgen.Challenge.exif:type_name -> chalgen.Exif
	3,  // 5: chalgen.Challenge.slack:type_name -> chalgen.Slack
	1,  // 6: chalgen.Challenge.phone:type_name -> chalgen.Phone
	2,  // 7: chalgen.Phone.apps:type_name -> chalgen.App
	12, // 8: chalgen.Slack.users:type_name -> chalgen.User
	4,  // 9: chalgen.Slack.channels:type_name -> chalgen.Channel
	5,  // 10: chalgen.Channel.messages:type_name -> chalgen.Message
	8,  // 11: chalgen.PCAP.packets:type_name -> chalgen.Packet
	12, // 12: chalgen.Twitter.users:type_name -> chalgen.User
	13, // 13: chalgen.Twitter.posts:type_name -> chalgen.Post
	14, // 14: chalgen.Twitter.comments:type_name -> chalgen.Comment
	15, // [15:15] is the sub-list for method output_type
	15, // [15:15] is the sub-list for method input_type
	15, // [15:15] is the sub-list for extension type_name
	15, // [15:15] is the sub-list for extension extendee
	0,  // [0:15] is the sub-list for field type_name
}

func init() { file_chalgen_base_proto_init() }
func file_chalgen_base_proto_init() {
	if File_chalgen_base_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_chalgen_base_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Challenge); i {
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
		file_chalgen_base_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Phone); i {
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
		file_chalgen_base_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*App); i {
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
		file_chalgen_base_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Slack); i {
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
		file_chalgen_base_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Channel); i {
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
		file_chalgen_base_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Message); i {
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
		file_chalgen_base_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Exif); i {
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
		file_chalgen_base_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PCAP); i {
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
		file_chalgen_base_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Packet); i {
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
		file_chalgen_base_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_base_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_base_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_base_proto_msgTypes[12].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_base_proto_msgTypes[13].Exporter = func(v interface{}, i int) interface{} {
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
		file_chalgen_base_proto_msgTypes[14].Exporter = func(v interface{}, i int) interface{} {
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
	file_chalgen_base_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*Challenge_Base64)(nil),
		(*Challenge_Twitter)(nil),
		(*Challenge_Caesar)(nil),
		(*Challenge_Pcap)(nil),
		(*Challenge_Exif)(nil),
		(*Challenge_Slack)(nil),
		(*Challenge_Phone)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_chalgen_base_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   15,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_chalgen_base_proto_goTypes,
		DependencyIndexes: file_chalgen_base_proto_depIdxs,
		MessageInfos:      file_chalgen_base_proto_msgTypes,
	}.Build()
	File_chalgen_base_proto = out.File
	file_chalgen_base_proto_rawDesc = nil
	file_chalgen_base_proto_goTypes = nil
	file_chalgen_base_proto_depIdxs = nil
}
