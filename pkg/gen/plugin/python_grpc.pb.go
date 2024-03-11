// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: plugin/python.proto

package plugin

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// PythonServiceClient is the client API for PythonService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PythonServiceClient interface {
	Generate(ctx context.Context, in *GenerateRequest, opts ...grpc.CallOption) (*GenerateResponse, error)
}

type pythonServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewPythonServiceClient(cc grpc.ClientConnInterface) PythonServiceClient {
	return &pythonServiceClient{cc}
}

func (c *pythonServiceClient) Generate(ctx context.Context, in *GenerateRequest, opts ...grpc.CallOption) (*GenerateResponse, error) {
	out := new(GenerateResponse)
	err := c.cc.Invoke(ctx, "/plugin.PythonService/Generate", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PythonServiceServer is the server API for PythonService service.
// All implementations should embed UnimplementedPythonServiceServer
// for forward compatibility
type PythonServiceServer interface {
	Generate(context.Context, *GenerateRequest) (*GenerateResponse, error)
}

// UnimplementedPythonServiceServer should be embedded to have forward compatible implementations.
type UnimplementedPythonServiceServer struct {
}

func (UnimplementedPythonServiceServer) Generate(context.Context, *GenerateRequest) (*GenerateResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Generate not implemented")
}

// UnsafePythonServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PythonServiceServer will
// result in compilation errors.
type UnsafePythonServiceServer interface {
	mustEmbedUnimplementedPythonServiceServer()
}

func RegisterPythonServiceServer(s grpc.ServiceRegistrar, srv PythonServiceServer) {
	s.RegisterService(&PythonService_ServiceDesc, srv)
}

func _PythonService_Generate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PythonServiceServer).Generate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/plugin.PythonService/Generate",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PythonServiceServer).Generate(ctx, req.(*GenerateRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// PythonService_ServiceDesc is the grpc.ServiceDesc for PythonService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PythonService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "plugin.PythonService",
	HandlerType: (*PythonServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Generate",
			Handler:    _PythonService_Generate_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "plugin/python.proto",
}