import {
  TwirpContext,
  TwirpServer,
  RouterEvents,
  TwirpError,
  TwirpErrorCode,
  Interceptor,
  TwirpContentType,
  chainInterceptors,
} from "twirp-ts";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  CurrentUserRequest,
  CurrentUserResponse,
  GetChallengesRequest,
  GetChallengesResponse,
  SubmitFlagRequest,
  SubmitFlagResponse,
  GetDiscoveredEvidenceRequest,
  GetDiscoveredEvidenceResponse,
  SubmitEvidenceRequest,
  SubmitEvidenceResponse,
  SubmitEvidenceConnectionRequest,
  SubmitEvidenceConnectionResponse,
} from "./ctfg";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>;
}

export interface BackendClient {
  Register(request: RegisterRequest): Promise<RegisterResponse>;
  Login(request: LoginRequest): Promise<LoginResponse>;
  CurrentUser(request: CurrentUserRequest): Promise<CurrentUserResponse>;
  GetChallenges(request: GetChallengesRequest): Promise<GetChallengesResponse>;
  SubmitFlag(request: SubmitFlagRequest): Promise<SubmitFlagResponse>;
  GetDiscoveredEvidence(
    request: GetDiscoveredEvidenceRequest
  ): Promise<GetDiscoveredEvidenceResponse>;
  SubmitEvidence(
    request: SubmitEvidenceRequest
  ): Promise<SubmitEvidenceResponse>;
  SubmitEvidenceConnection(
    request: SubmitEvidenceConnectionRequest
  ): Promise<SubmitEvidenceConnectionResponse>;
}

export class BackendClientJSON implements BackendClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register.bind(this);
    this.Login.bind(this);
    this.CurrentUser.bind(this);
    this.GetChallenges.bind(this);
    this.SubmitFlag.bind(this);
    this.GetDiscoveredEvidence.bind(this);
    this.SubmitEvidence.bind(this);
    this.SubmitEvidenceConnection.bind(this);
  }
  Register(request: RegisterRequest): Promise<RegisterResponse> {
    const data = RegisterRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "Register",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      RegisterResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "Login",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      LoginResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  CurrentUser(request: CurrentUserRequest): Promise<CurrentUserResponse> {
    const data = CurrentUserRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "CurrentUser",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      CurrentUserResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetChallenges(request: GetChallengesRequest): Promise<GetChallengesResponse> {
    const data = GetChallengesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetChallenges",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetChallengesResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  SubmitFlag(request: SubmitFlagRequest): Promise<SubmitFlagResponse> {
    const data = SubmitFlagRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitFlag",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SubmitFlagResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetDiscoveredEvidence(
    request: GetDiscoveredEvidenceRequest
  ): Promise<GetDiscoveredEvidenceResponse> {
    const data = GetDiscoveredEvidenceRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetDiscoveredEvidence",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetDiscoveredEvidenceResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  SubmitEvidence(
    request: SubmitEvidenceRequest
  ): Promise<SubmitEvidenceResponse> {
    const data = SubmitEvidenceRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidence",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SubmitEvidenceResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  SubmitEvidenceConnection(
    request: SubmitEvidenceConnectionRequest
  ): Promise<SubmitEvidenceConnectionResponse> {
    const data = SubmitEvidenceConnectionRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidenceConnection",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SubmitEvidenceConnectionResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class BackendClientProtobuf implements BackendClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register.bind(this);
    this.Login.bind(this);
    this.CurrentUser.bind(this);
    this.GetChallenges.bind(this);
    this.SubmitFlag.bind(this);
    this.GetDiscoveredEvidence.bind(this);
    this.SubmitEvidence.bind(this);
    this.SubmitEvidenceConnection.bind(this);
  }
  Register(request: RegisterRequest): Promise<RegisterResponse> {
    const data = RegisterRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "Register",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      RegisterResponse.fromBinary(data as Uint8Array)
    );
  }

  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "Login",
      "application/protobuf",
      data
    );
    return promise.then((data) => LoginResponse.fromBinary(data as Uint8Array));
  }

  CurrentUser(request: CurrentUserRequest): Promise<CurrentUserResponse> {
    const data = CurrentUserRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "CurrentUser",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      CurrentUserResponse.fromBinary(data as Uint8Array)
    );
  }

  GetChallenges(request: GetChallengesRequest): Promise<GetChallengesResponse> {
    const data = GetChallengesRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetChallenges",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetChallengesResponse.fromBinary(data as Uint8Array)
    );
  }

  SubmitFlag(request: SubmitFlagRequest): Promise<SubmitFlagResponse> {
    const data = SubmitFlagRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitFlag",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SubmitFlagResponse.fromBinary(data as Uint8Array)
    );
  }

  GetDiscoveredEvidence(
    request: GetDiscoveredEvidenceRequest
  ): Promise<GetDiscoveredEvidenceResponse> {
    const data = GetDiscoveredEvidenceRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetDiscoveredEvidence",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetDiscoveredEvidenceResponse.fromBinary(data as Uint8Array)
    );
  }

  SubmitEvidence(
    request: SubmitEvidenceRequest
  ): Promise<SubmitEvidenceResponse> {
    const data = SubmitEvidenceRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidence",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SubmitEvidenceResponse.fromBinary(data as Uint8Array)
    );
  }

  SubmitEvidenceConnection(
    request: SubmitEvidenceConnectionRequest
  ): Promise<SubmitEvidenceConnectionResponse> {
    const data = SubmitEvidenceConnectionRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidenceConnection",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SubmitEvidenceConnectionResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface BackendTwirp<T extends TwirpContext = TwirpContext> {
  Register(ctx: T, request: RegisterRequest): Promise<RegisterResponse>;
  Login(ctx: T, request: LoginRequest): Promise<LoginResponse>;
  CurrentUser(
    ctx: T,
    request: CurrentUserRequest
  ): Promise<CurrentUserResponse>;
  GetChallenges(
    ctx: T,
    request: GetChallengesRequest
  ): Promise<GetChallengesResponse>;
  SubmitFlag(ctx: T, request: SubmitFlagRequest): Promise<SubmitFlagResponse>;
  GetDiscoveredEvidence(
    ctx: T,
    request: GetDiscoveredEvidenceRequest
  ): Promise<GetDiscoveredEvidenceResponse>;
  SubmitEvidence(
    ctx: T,
    request: SubmitEvidenceRequest
  ): Promise<SubmitEvidenceResponse>;
  SubmitEvidenceConnection(
    ctx: T,
    request: SubmitEvidenceConnectionRequest
  ): Promise<SubmitEvidenceConnectionResponse>;
}

export enum BackendMethod {
  Register = "Register",
  Login = "Login",
  CurrentUser = "CurrentUser",
  GetChallenges = "GetChallenges",
  SubmitFlag = "SubmitFlag",
  GetDiscoveredEvidence = "GetDiscoveredEvidence",
  SubmitEvidence = "SubmitEvidence",
  SubmitEvidenceConnection = "SubmitEvidenceConnection",
}

export const BackendMethodList = [
  BackendMethod.Register,
  BackendMethod.Login,
  BackendMethod.CurrentUser,
  BackendMethod.GetChallenges,
  BackendMethod.SubmitFlag,
  BackendMethod.GetDiscoveredEvidence,
  BackendMethod.SubmitEvidence,
  BackendMethod.SubmitEvidenceConnection,
];

export function createBackendServer<T extends TwirpContext = TwirpContext>(
  service: BackendTwirp<T>
) {
  return new TwirpServer<BackendTwirp, T>({
    service,
    packageName: "ctfg",
    serviceName: "Backend",
    methodList: BackendMethodList,
    matchRoute: matchBackendRoute,
  });
}

function matchBackendRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "Register":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, RegisterRequest, RegisterResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Register" };
        await events.onMatch(ctx);
        return handleBackendRegisterRequest(ctx, service, data, interceptors);
      };
    case "Login":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, LoginRequest, LoginResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "Login" };
        await events.onMatch(ctx);
        return handleBackendLoginRequest(ctx, service, data, interceptors);
      };
    case "CurrentUser":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, CurrentUserRequest, CurrentUserResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "CurrentUser" };
        await events.onMatch(ctx);
        return handleBackendCurrentUserRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetChallenges":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetChallengesRequest,
          GetChallengesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetChallenges" };
        await events.onMatch(ctx);
        return handleBackendGetChallengesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SubmitFlag":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, SubmitFlagRequest, SubmitFlagResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitFlag" };
        await events.onMatch(ctx);
        return handleBackendSubmitFlagRequest(ctx, service, data, interceptors);
      };
    case "GetDiscoveredEvidence":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetDiscoveredEvidenceRequest,
          GetDiscoveredEvidenceResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetDiscoveredEvidence" };
        await events.onMatch(ctx);
        return handleBackendGetDiscoveredEvidenceRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SubmitEvidence":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          SubmitEvidenceRequest,
          SubmitEvidenceResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitEvidence" };
        await events.onMatch(ctx);
        return handleBackendSubmitEvidenceRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SubmitEvidenceConnection":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          SubmitEvidenceConnectionRequest,
          SubmitEvidenceConnectionResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitEvidenceConnection" };
        await events.onMatch(ctx);
        return handleBackendSubmitEvidenceConnectionRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendRegisterRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterRequest, RegisterResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendRegisterJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleBackendRegisterProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendLoginRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LoginRequest, LoginResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendLoginJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleBackendLoginProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendCurrentUserRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, CurrentUserRequest, CurrentUserResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendCurrentUserJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleBackendCurrentUserProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendGetChallengesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetChallengesRequest, GetChallengesResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendGetChallengesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendGetChallengesProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendSubmitFlagRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitFlagRequest, SubmitFlagResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendSubmitFlagJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleBackendSubmitFlagProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendGetDiscoveredEvidenceRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDiscoveredEvidenceRequest,
    GetDiscoveredEvidenceResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendGetDiscoveredEvidenceJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendGetDiscoveredEvidenceProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendSubmitEvidenceRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitEvidenceRequest, SubmitEvidenceResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendSubmitEvidenceJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendSubmitEvidenceProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleBackendSubmitEvidenceConnectionRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceConnectionRequest,
    SubmitEvidenceConnectionResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendSubmitEvidenceConnectionJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendSubmitEvidenceConnectionProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleBackendRegisterJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterRequest, RegisterResponse>[]
) {
  let request: RegisterRequest;
  let response: RegisterResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = RegisterRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterRequest,
      RegisterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Register(ctx, inputReq);
    });
  } else {
    response = await service.Register(ctx, request!);
  }

  return JSON.stringify(
    RegisterResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendLoginJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LoginRequest, LoginResponse>[]
) {
  let request: LoginRequest;
  let response: LoginResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = LoginRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      LoginRequest,
      LoginResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Login(ctx, inputReq);
    });
  } else {
    response = await service.Login(ctx, request!);
  }

  return JSON.stringify(
    LoginResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendCurrentUserJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, CurrentUserRequest, CurrentUserResponse>[]
) {
  let request: CurrentUserRequest;
  let response: CurrentUserResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = CurrentUserRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CurrentUserRequest,
      CurrentUserResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CurrentUser(ctx, inputReq);
    });
  } else {
    response = await service.CurrentUser(ctx, request!);
  }

  return JSON.stringify(
    CurrentUserResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendGetChallengesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetChallengesRequest, GetChallengesResponse>[]
) {
  let request: GetChallengesRequest;
  let response: GetChallengesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetChallengesRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetChallengesRequest,
      GetChallengesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetChallenges(ctx, inputReq);
    });
  } else {
    response = await service.GetChallenges(ctx, request!);
  }

  return JSON.stringify(
    GetChallengesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendSubmitFlagJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitFlagRequest, SubmitFlagResponse>[]
) {
  let request: SubmitFlagRequest;
  let response: SubmitFlagResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitFlagRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitFlagRequest,
      SubmitFlagResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitFlag(ctx, inputReq);
    });
  } else {
    response = await service.SubmitFlag(ctx, request!);
  }

  return JSON.stringify(
    SubmitFlagResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendGetDiscoveredEvidenceJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDiscoveredEvidenceRequest,
    GetDiscoveredEvidenceResponse
  >[]
) {
  let request: GetDiscoveredEvidenceRequest;
  let response: GetDiscoveredEvidenceResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetDiscoveredEvidenceRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetDiscoveredEvidenceRequest,
      GetDiscoveredEvidenceResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetDiscoveredEvidence(ctx, inputReq);
    });
  } else {
    response = await service.GetDiscoveredEvidence(ctx, request!);
  }

  return JSON.stringify(
    GetDiscoveredEvidenceResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendSubmitEvidenceJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitEvidenceRequest, SubmitEvidenceResponse>[]
) {
  let request: SubmitEvidenceRequest;
  let response: SubmitEvidenceResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitEvidenceRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitEvidenceRequest,
      SubmitEvidenceResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidence(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidence(ctx, request!);
  }

  return JSON.stringify(
    SubmitEvidenceResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendSubmitEvidenceConnectionJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceConnectionRequest,
    SubmitEvidenceConnectionResponse
  >[]
) {
  let request: SubmitEvidenceConnectionRequest;
  let response: SubmitEvidenceConnectionResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitEvidenceConnectionRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitEvidenceConnectionRequest,
      SubmitEvidenceConnectionResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidenceConnection(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidenceConnection(ctx, request!);
  }

  return JSON.stringify(
    SubmitEvidenceConnectionResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleBackendRegisterProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, RegisterRequest, RegisterResponse>[]
) {
  let request: RegisterRequest;
  let response: RegisterResponse;

  try {
    request = RegisterRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      RegisterRequest,
      RegisterResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Register(ctx, inputReq);
    });
  } else {
    response = await service.Register(ctx, request!);
  }

  return Buffer.from(RegisterResponse.toBinary(response));
}

async function handleBackendLoginProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, LoginRequest, LoginResponse>[]
) {
  let request: LoginRequest;
  let response: LoginResponse;

  try {
    request = LoginRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      LoginRequest,
      LoginResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Login(ctx, inputReq);
    });
  } else {
    response = await service.Login(ctx, request!);
  }

  return Buffer.from(LoginResponse.toBinary(response));
}

async function handleBackendCurrentUserProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, CurrentUserRequest, CurrentUserResponse>[]
) {
  let request: CurrentUserRequest;
  let response: CurrentUserResponse;

  try {
    request = CurrentUserRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CurrentUserRequest,
      CurrentUserResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CurrentUser(ctx, inputReq);
    });
  } else {
    response = await service.CurrentUser(ctx, request!);
  }

  return Buffer.from(CurrentUserResponse.toBinary(response));
}

async function handleBackendGetChallengesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetChallengesRequest, GetChallengesResponse>[]
) {
  let request: GetChallengesRequest;
  let response: GetChallengesResponse;

  try {
    request = GetChallengesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetChallengesRequest,
      GetChallengesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetChallenges(ctx, inputReq);
    });
  } else {
    response = await service.GetChallenges(ctx, request!);
  }

  return Buffer.from(GetChallengesResponse.toBinary(response));
}

async function handleBackendSubmitFlagProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitFlagRequest, SubmitFlagResponse>[]
) {
  let request: SubmitFlagRequest;
  let response: SubmitFlagResponse;

  try {
    request = SubmitFlagRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitFlagRequest,
      SubmitFlagResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitFlag(ctx, inputReq);
    });
  } else {
    response = await service.SubmitFlag(ctx, request!);
  }

  return Buffer.from(SubmitFlagResponse.toBinary(response));
}

async function handleBackendGetDiscoveredEvidenceProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetDiscoveredEvidenceRequest,
    GetDiscoveredEvidenceResponse
  >[]
) {
  let request: GetDiscoveredEvidenceRequest;
  let response: GetDiscoveredEvidenceResponse;

  try {
    request = GetDiscoveredEvidenceRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetDiscoveredEvidenceRequest,
      GetDiscoveredEvidenceResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetDiscoveredEvidence(ctx, inputReq);
    });
  } else {
    response = await service.GetDiscoveredEvidence(ctx, request!);
  }

  return Buffer.from(GetDiscoveredEvidenceResponse.toBinary(response));
}

async function handleBackendSubmitEvidenceProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitEvidenceRequest, SubmitEvidenceResponse>[]
) {
  let request: SubmitEvidenceRequest;
  let response: SubmitEvidenceResponse;

  try {
    request = SubmitEvidenceRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitEvidenceRequest,
      SubmitEvidenceResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidence(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidence(ctx, request!);
  }

  return Buffer.from(SubmitEvidenceResponse.toBinary(response));
}

async function handleBackendSubmitEvidenceConnectionProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceConnectionRequest,
    SubmitEvidenceConnectionResponse
  >[]
) {
  let request: SubmitEvidenceConnectionRequest;
  let response: SubmitEvidenceConnectionResponse;

  try {
    request = SubmitEvidenceConnectionRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitEvidenceConnectionRequest,
      SubmitEvidenceConnectionResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidenceConnection(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidenceConnection(ctx, request!);
  }

  return Buffer.from(SubmitEvidenceConnectionResponse.toBinary(response));
}
