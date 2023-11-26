// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: chalgen/chalgen.proto

package chalgen

import (
	grpc "google.golang.org/grpc"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ChalgenServiceClient is the client API for ChalgenService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChalgenServiceClient interface {
}

type chalgenServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewChalgenServiceClient(cc grpc.ClientConnInterface) ChalgenServiceClient {
	return &chalgenServiceClient{cc}
}

// ChalgenServiceServer is the server API for ChalgenService service.
// All implementations should embed UnimplementedChalgenServiceServer
// for forward compatibility
type ChalgenServiceServer interface {
}

// UnimplementedChalgenServiceServer should be embedded to have forward compatible implementations.
type UnimplementedChalgenServiceServer struct {
}

// UnsafeChalgenServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ChalgenServiceServer will
// result in compilation errors.
type UnsafeChalgenServiceServer interface {
	mustEmbedUnimplementedChalgenServiceServer()
}

func RegisterChalgenServiceServer(s grpc.ServiceRegistrar, srv ChalgenServiceServer) {
	s.RegisterService(&ChalgenService_ServiceDesc, srv)
}

// ChalgenService_ServiceDesc is the grpc.ServiceDesc for ChalgenService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ChalgenService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "chalgen.ChalgenService",
	HandlerType: (*ChalgenServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "chalgen/chalgen.proto",
}
