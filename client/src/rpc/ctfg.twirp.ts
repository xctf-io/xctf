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
  SubmitFlagRequest,
  SubmitFlagResponse,
  SubmitEvidenceReportRequest,
  GetDiscoveredEvidenceRequest,
  GetDiscoveredEvidenceResponse,
  SubmitEvidenceRequest,
  SubmitEvidenceResponse,
  SubmitEvidenceConnectionRequest,
  SubmitEvidenceConnectionResponse,
  GetHomePageRequest,
  GetHomePageResponse,
  ForgotPasswordRequest,
  Empty,
  SubmitWriteupRequest,
  UpsertChallengeRequest,
  DeleteChallengeRequest,
  GetTeamsProgressRequest,
  GetTeamsProgressResponse,
  GetAllChallengesRequest,
  GetAllChallengesResponse,
  SetHomePageRequest,
  GetWriteupRequest,
  GetWriteupResponse,
  SubmitGradeRequest,
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
  SubmitFlag(request: SubmitFlagRequest): Promise<SubmitFlagResponse>;
  SubmitEvidenceReport(
    request: SubmitEvidenceReportRequest
  ): Promise<SubmitEvidenceReportRequest>;
  GetDiscoveredEvidence(
    request: GetDiscoveredEvidenceRequest
  ): Promise<GetDiscoveredEvidenceResponse>;
  SubmitEvidence(
    request: SubmitEvidenceRequest
  ): Promise<SubmitEvidenceResponse>;
  SubmitEvidenceConnection(
    request: SubmitEvidenceConnectionRequest
  ): Promise<SubmitEvidenceConnectionResponse>;
  GetHomePage(request: GetHomePageRequest): Promise<GetHomePageResponse>;
  ForgotPassword(request: ForgotPasswordRequest): Promise<Empty>;
  SubmitWriteup(request: SubmitWriteupRequest): Promise<Empty>;
}

export class BackendClientJSON implements BackendClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Register.bind(this);
    this.Login.bind(this);
    this.CurrentUser.bind(this);
    this.SubmitFlag.bind(this);
    this.SubmitEvidenceReport.bind(this);
    this.GetDiscoveredEvidence.bind(this);
    this.SubmitEvidence.bind(this);
    this.SubmitEvidenceConnection.bind(this);
    this.GetHomePage.bind(this);
    this.ForgotPassword.bind(this);
    this.SubmitWriteup.bind(this);
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

  SubmitEvidenceReport(
    request: SubmitEvidenceReportRequest
  ): Promise<SubmitEvidenceReportRequest> {
    const data = SubmitEvidenceReportRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidenceReport",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      SubmitEvidenceReportRequest.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
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

  GetHomePage(request: GetHomePageRequest): Promise<GetHomePageResponse> {
    const data = GetHomePageRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetHomePage",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetHomePageResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  ForgotPassword(request: ForgotPasswordRequest): Promise<Empty> {
    const data = ForgotPasswordRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "ForgotPassword",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  SubmitWriteup(request: SubmitWriteupRequest): Promise<Empty> {
    const data = SubmitWriteupRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitWriteup",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
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
    this.SubmitFlag.bind(this);
    this.SubmitEvidenceReport.bind(this);
    this.GetDiscoveredEvidence.bind(this);
    this.SubmitEvidence.bind(this);
    this.SubmitEvidenceConnection.bind(this);
    this.GetHomePage.bind(this);
    this.ForgotPassword.bind(this);
    this.SubmitWriteup.bind(this);
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

  SubmitEvidenceReport(
    request: SubmitEvidenceReportRequest
  ): Promise<SubmitEvidenceReportRequest> {
    const data = SubmitEvidenceReportRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitEvidenceReport",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      SubmitEvidenceReportRequest.fromBinary(data as Uint8Array)
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

  GetHomePage(request: GetHomePageRequest): Promise<GetHomePageResponse> {
    const data = GetHomePageRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "GetHomePage",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetHomePageResponse.fromBinary(data as Uint8Array)
    );
  }

  ForgotPassword(request: ForgotPasswordRequest): Promise<Empty> {
    const data = ForgotPasswordRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "ForgotPassword",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
  }

  SubmitWriteup(request: SubmitWriteupRequest): Promise<Empty> {
    const data = SubmitWriteupRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Backend",
      "SubmitWriteup",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
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
  SubmitFlag(ctx: T, request: SubmitFlagRequest): Promise<SubmitFlagResponse>;
  SubmitEvidenceReport(
    ctx: T,
    request: SubmitEvidenceReportRequest
  ): Promise<SubmitEvidenceReportRequest>;
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
  GetHomePage(
    ctx: T,
    request: GetHomePageRequest
  ): Promise<GetHomePageResponse>;
  ForgotPassword(ctx: T, request: ForgotPasswordRequest): Promise<Empty>;
  SubmitWriteup(ctx: T, request: SubmitWriteupRequest): Promise<Empty>;
}

export enum BackendMethod {
  Register = "Register",
  Login = "Login",
  CurrentUser = "CurrentUser",
  SubmitFlag = "SubmitFlag",
  SubmitEvidenceReport = "SubmitEvidenceReport",
  GetDiscoveredEvidence = "GetDiscoveredEvidence",
  SubmitEvidence = "SubmitEvidence",
  SubmitEvidenceConnection = "SubmitEvidenceConnection",
  GetHomePage = "GetHomePage",
  ForgotPassword = "ForgotPassword",
  SubmitWriteup = "SubmitWriteup",
}

export const BackendMethodList = [
  BackendMethod.Register,
  BackendMethod.Login,
  BackendMethod.CurrentUser,
  BackendMethod.SubmitFlag,
  BackendMethod.SubmitEvidenceReport,
  BackendMethod.GetDiscoveredEvidence,
  BackendMethod.SubmitEvidence,
  BackendMethod.SubmitEvidenceConnection,
  BackendMethod.GetHomePage,
  BackendMethod.ForgotPassword,
  BackendMethod.SubmitWriteup,
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
    case "SubmitEvidenceReport":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          SubmitEvidenceReportRequest,
          SubmitEvidenceReportRequest
        >[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitEvidenceReport" };
        await events.onMatch(ctx);
        return handleBackendSubmitEvidenceReportRequest(
          ctx,
          service,
          data,
          interceptors
        );
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
    case "GetHomePage":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetHomePageRequest, GetHomePageResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "GetHomePage" };
        await events.onMatch(ctx);
        return handleBackendGetHomePageRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "ForgotPassword":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, ForgotPasswordRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "ForgotPassword" };
        await events.onMatch(ctx);
        return handleBackendForgotPasswordRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SubmitWriteup":
      return async (
        ctx: T,
        service: BackendTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, SubmitWriteupRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitWriteup" };
        await events.onMatch(ctx);
        return handleBackendSubmitWriteupRequest(
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

function handleBackendSubmitEvidenceReportRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceReportRequest,
    SubmitEvidenceReportRequest
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendSubmitEvidenceReportJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendSubmitEvidenceReportProtobuf<T>(
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

function handleBackendGetHomePageRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHomePageRequest, GetHomePageResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendGetHomePageJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleBackendGetHomePageProtobuf<T>(
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

function handleBackendForgotPasswordRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ForgotPasswordRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendForgotPasswordJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendForgotPasswordProtobuf<T>(
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

function handleBackendSubmitWriteupRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitWriteupRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleBackendSubmitWriteupJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleBackendSubmitWriteupProtobuf<T>(
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

async function handleBackendSubmitEvidenceReportJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceReportRequest,
    SubmitEvidenceReportRequest
  >[]
) {
  let request: SubmitEvidenceReportRequest;
  let response: SubmitEvidenceReportRequest;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitEvidenceReportRequest.fromJson(body, {
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
      SubmitEvidenceReportRequest,
      SubmitEvidenceReportRequest
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidenceReport(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidenceReport(ctx, request!);
  }

  return JSON.stringify(
    SubmitEvidenceReportRequest.toJson(response, {
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

async function handleBackendGetHomePageJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHomePageRequest, GetHomePageResponse>[]
) {
  let request: GetHomePageRequest;
  let response: GetHomePageResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetHomePageRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetHomePageRequest,
      GetHomePageResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetHomePage(ctx, inputReq);
    });
  } else {
    response = await service.GetHomePage(ctx, request!);
  }

  return JSON.stringify(
    GetHomePageResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendForgotPasswordJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ForgotPasswordRequest, Empty>[]
) {
  let request: ForgotPasswordRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = ForgotPasswordRequest.fromJson(body, {
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
      ForgotPasswordRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ForgotPassword(ctx, inputReq);
    });
  } else {
    response = await service.ForgotPassword(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleBackendSubmitWriteupJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitWriteupRequest, Empty>[]
) {
  let request: SubmitWriteupRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitWriteupRequest.fromJson(body, {
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
      SubmitWriteupRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitWriteup(ctx, inputReq);
    });
  } else {
    response = await service.SubmitWriteup(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
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

async function handleBackendSubmitEvidenceReportProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    SubmitEvidenceReportRequest,
    SubmitEvidenceReportRequest
  >[]
) {
  let request: SubmitEvidenceReportRequest;
  let response: SubmitEvidenceReportRequest;

  try {
    request = SubmitEvidenceReportRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitEvidenceReportRequest,
      SubmitEvidenceReportRequest
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitEvidenceReport(ctx, inputReq);
    });
  } else {
    response = await service.SubmitEvidenceReport(ctx, request!);
  }

  return Buffer.from(SubmitEvidenceReportRequest.toBinary(response));
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

async function handleBackendGetHomePageProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetHomePageRequest, GetHomePageResponse>[]
) {
  let request: GetHomePageRequest;
  let response: GetHomePageResponse;

  try {
    request = GetHomePageRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetHomePageRequest,
      GetHomePageResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetHomePage(ctx, inputReq);
    });
  } else {
    response = await service.GetHomePage(ctx, request!);
  }

  return Buffer.from(GetHomePageResponse.toBinary(response));
}

async function handleBackendForgotPasswordProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, ForgotPasswordRequest, Empty>[]
) {
  let request: ForgotPasswordRequest;
  let response: Empty;

  try {
    request = ForgotPasswordRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      ForgotPasswordRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.ForgotPassword(ctx, inputReq);
    });
  } else {
    response = await service.ForgotPassword(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}

async function handleBackendSubmitWriteupProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: BackendTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitWriteupRequest, Empty>[]
) {
  let request: SubmitWriteupRequest;
  let response: Empty;

  try {
    request = SubmitWriteupRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitWriteupRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitWriteup(ctx, inputReq);
    });
  } else {
    response = await service.SubmitWriteup(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}

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

export interface AdminClient {
  UpsertChallenge(request: UpsertChallengeRequest): Promise<Empty>;
  DeleteChallenge(request: DeleteChallengeRequest): Promise<Empty>;
  GetTeamsProgress(
    request: GetTeamsProgressRequest
  ): Promise<GetTeamsProgressResponse>;
  GetAllChallenges(
    request: GetAllChallengesRequest
  ): Promise<GetAllChallengesResponse>;
  SetHomePage(request: SetHomePageRequest): Promise<Empty>;
  GetWriteup(request: GetWriteupRequest): Promise<GetWriteupResponse>;
  SubmitGrade(request: SubmitGradeRequest): Promise<Empty>;
}

export class AdminClientJSON implements AdminClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpsertChallenge.bind(this);
    this.DeleteChallenge.bind(this);
    this.GetTeamsProgress.bind(this);
    this.GetAllChallenges.bind(this);
    this.SetHomePage.bind(this);
    this.GetWriteup.bind(this);
    this.SubmitGrade.bind(this);
  }
  UpsertChallenge(request: UpsertChallengeRequest): Promise<Empty> {
    const data = UpsertChallengeRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "UpsertChallenge",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  DeleteChallenge(request: DeleteChallengeRequest): Promise<Empty> {
    const data = DeleteChallengeRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "DeleteChallenge",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetTeamsProgress(
    request: GetTeamsProgressRequest
  ): Promise<GetTeamsProgressResponse> {
    const data = GetTeamsProgressRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetTeamsProgress",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetTeamsProgressResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetAllChallenges(
    request: GetAllChallengesRequest
  ): Promise<GetAllChallengesResponse> {
    const data = GetAllChallengesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetAllChallenges",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetAllChallengesResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  SetHomePage(request: SetHomePageRequest): Promise<Empty> {
    const data = SetHomePageRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "SetHomePage",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  GetWriteup(request: GetWriteupRequest): Promise<GetWriteupResponse> {
    const data = GetWriteupRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetWriteup",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetWriteupResponse.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }

  SubmitGrade(request: SubmitGradeRequest): Promise<Empty> {
    const data = SubmitGradeRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "ctfg.Admin",
      "SubmitGrade",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      Empty.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }
}

export class AdminClientProtobuf implements AdminClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpsertChallenge.bind(this);
    this.DeleteChallenge.bind(this);
    this.GetTeamsProgress.bind(this);
    this.GetAllChallenges.bind(this);
    this.SetHomePage.bind(this);
    this.GetWriteup.bind(this);
    this.SubmitGrade.bind(this);
  }
  UpsertChallenge(request: UpsertChallengeRequest): Promise<Empty> {
    const data = UpsertChallengeRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "UpsertChallenge",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
  }

  DeleteChallenge(request: DeleteChallengeRequest): Promise<Empty> {
    const data = DeleteChallengeRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "DeleteChallenge",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
  }

  GetTeamsProgress(
    request: GetTeamsProgressRequest
  ): Promise<GetTeamsProgressResponse> {
    const data = GetTeamsProgressRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetTeamsProgress",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetTeamsProgressResponse.fromBinary(data as Uint8Array)
    );
  }

  GetAllChallenges(
    request: GetAllChallengesRequest
  ): Promise<GetAllChallengesResponse> {
    const data = GetAllChallengesRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetAllChallenges",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetAllChallengesResponse.fromBinary(data as Uint8Array)
    );
  }

  SetHomePage(request: SetHomePageRequest): Promise<Empty> {
    const data = SetHomePageRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "SetHomePage",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
  }

  GetWriteup(request: GetWriteupRequest): Promise<GetWriteupResponse> {
    const data = GetWriteupRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "GetWriteup",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetWriteupResponse.fromBinary(data as Uint8Array)
    );
  }

  SubmitGrade(request: SubmitGradeRequest): Promise<Empty> {
    const data = SubmitGradeRequest.toBinary(request);
    const promise = this.rpc.request(
      "ctfg.Admin",
      "SubmitGrade",
      "application/protobuf",
      data
    );
    return promise.then((data) => Empty.fromBinary(data as Uint8Array));
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface AdminTwirp<T extends TwirpContext = TwirpContext> {
  UpsertChallenge(ctx: T, request: UpsertChallengeRequest): Promise<Empty>;
  DeleteChallenge(ctx: T, request: DeleteChallengeRequest): Promise<Empty>;
  GetTeamsProgress(
    ctx: T,
    request: GetTeamsProgressRequest
  ): Promise<GetTeamsProgressResponse>;
  GetAllChallenges(
    ctx: T,
    request: GetAllChallengesRequest
  ): Promise<GetAllChallengesResponse>;
  SetHomePage(ctx: T, request: SetHomePageRequest): Promise<Empty>;
  GetWriteup(ctx: T, request: GetWriteupRequest): Promise<GetWriteupResponse>;
  SubmitGrade(ctx: T, request: SubmitGradeRequest): Promise<Empty>;
}

export enum AdminMethod {
  UpsertChallenge = "UpsertChallenge",
  DeleteChallenge = "DeleteChallenge",
  GetTeamsProgress = "GetTeamsProgress",
  GetAllChallenges = "GetAllChallenges",
  SetHomePage = "SetHomePage",
  GetWriteup = "GetWriteup",
  SubmitGrade = "SubmitGrade",
}

export const AdminMethodList = [
  AdminMethod.UpsertChallenge,
  AdminMethod.DeleteChallenge,
  AdminMethod.GetTeamsProgress,
  AdminMethod.GetAllChallenges,
  AdminMethod.SetHomePage,
  AdminMethod.GetWriteup,
  AdminMethod.SubmitGrade,
];

export function createAdminServer<T extends TwirpContext = TwirpContext>(
  service: AdminTwirp<T>
) {
  return new TwirpServer<AdminTwirp, T>({
    service,
    packageName: "ctfg",
    serviceName: "Admin",
    methodList: AdminMethodList,
    matchRoute: matchAdminRoute,
  });
}

function matchAdminRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "UpsertChallenge":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, UpsertChallengeRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "UpsertChallenge" };
        await events.onMatch(ctx);
        return handleAdminUpsertChallengeRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "DeleteChallenge":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, DeleteChallengeRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "DeleteChallenge" };
        await events.onMatch(ctx);
        return handleAdminDeleteChallengeRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetTeamsProgress":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetTeamsProgressRequest,
          GetTeamsProgressResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetTeamsProgress" };
        await events.onMatch(ctx);
        return handleAdminGetTeamsProgressRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetAllChallenges":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetAllChallengesRequest,
          GetAllChallengesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetAllChallenges" };
        await events.onMatch(ctx);
        return handleAdminGetAllChallengesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "SetHomePage":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, SetHomePageRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "SetHomePage" };
        await events.onMatch(ctx);
        return handleAdminSetHomePageRequest(ctx, service, data, interceptors);
      };
    case "GetWriteup":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, GetWriteupRequest, GetWriteupResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "GetWriteup" };
        await events.onMatch(ctx);
        return handleAdminGetWriteupRequest(ctx, service, data, interceptors);
      };
    case "SubmitGrade":
      return async (
        ctx: T,
        service: AdminTwirp,
        data: Buffer,
        interceptors?: Interceptor<T, SubmitGradeRequest, Empty>[]
      ) => {
        ctx = { ...ctx, methodName: "SubmitGrade" };
        await events.onMatch(ctx);
        return handleAdminSubmitGradeRequest(ctx, service, data, interceptors);
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleAdminUpsertChallengeRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpsertChallengeRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminUpsertChallengeJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleAdminUpsertChallengeProtobuf<T>(
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

function handleAdminDeleteChallengeRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteChallengeRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminDeleteChallengeJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleAdminDeleteChallengeProtobuf<T>(
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

function handleAdminGetTeamsProgressRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetTeamsProgressRequest,
    GetTeamsProgressResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminGetTeamsProgressJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleAdminGetTeamsProgressProtobuf<T>(
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

function handleAdminGetAllChallengesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllChallengesRequest,
    GetAllChallengesResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminGetAllChallengesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleAdminGetAllChallengesProtobuf<T>(
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

function handleAdminSetHomePageRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SetHomePageRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminSetHomePageJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleAdminSetHomePageProtobuf<T>(
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

function handleAdminGetWriteupRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetWriteupRequest, GetWriteupResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminGetWriteupJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleAdminGetWriteupProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleAdminSubmitGradeRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitGradeRequest, Empty>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAdminSubmitGradeJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleAdminSubmitGradeProtobuf<T>(
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
async function handleAdminUpsertChallengeJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpsertChallengeRequest, Empty>[]
) {
  let request: UpsertChallengeRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = UpsertChallengeRequest.fromJson(body, {
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
      UpsertChallengeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpsertChallenge(ctx, inputReq);
    });
  } else {
    response = await service.UpsertChallenge(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminDeleteChallengeJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteChallengeRequest, Empty>[]
) {
  let request: DeleteChallengeRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = DeleteChallengeRequest.fromJson(body, {
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
      DeleteChallengeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteChallenge(ctx, inputReq);
    });
  } else {
    response = await service.DeleteChallenge(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminGetTeamsProgressJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetTeamsProgressRequest,
    GetTeamsProgressResponse
  >[]
) {
  let request: GetTeamsProgressRequest;
  let response: GetTeamsProgressResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetTeamsProgressRequest.fromJson(body, {
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
      GetTeamsProgressRequest,
      GetTeamsProgressResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetTeamsProgress(ctx, inputReq);
    });
  } else {
    response = await service.GetTeamsProgress(ctx, request!);
  }

  return JSON.stringify(
    GetTeamsProgressResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminGetAllChallengesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllChallengesRequest,
    GetAllChallengesResponse
  >[]
) {
  let request: GetAllChallengesRequest;
  let response: GetAllChallengesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetAllChallengesRequest.fromJson(body, {
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
      GetAllChallengesRequest,
      GetAllChallengesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAllChallenges(ctx, inputReq);
    });
  } else {
    response = await service.GetAllChallenges(ctx, request!);
  }

  return JSON.stringify(
    GetAllChallengesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminSetHomePageJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SetHomePageRequest, Empty>[]
) {
  let request: SetHomePageRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SetHomePageRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SetHomePageRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetHomePage(ctx, inputReq);
    });
  } else {
    response = await service.SetHomePage(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminGetWriteupJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetWriteupRequest, GetWriteupResponse>[]
) {
  let request: GetWriteupRequest;
  let response: GetWriteupResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetWriteupRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetWriteupRequest,
      GetWriteupResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetWriteup(ctx, inputReq);
    });
  } else {
    response = await service.GetWriteup(ctx, request!);
  }

  return JSON.stringify(
    GetWriteupResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleAdminSubmitGradeJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitGradeRequest, Empty>[]
) {
  let request: SubmitGradeRequest;
  let response: Empty;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SubmitGradeRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitGradeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitGrade(ctx, inputReq);
    });
  } else {
    response = await service.SubmitGrade(ctx, request!);
  }

  return JSON.stringify(
    Empty.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleAdminUpsertChallengeProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, UpsertChallengeRequest, Empty>[]
) {
  let request: UpsertChallengeRequest;
  let response: Empty;

  try {
    request = UpsertChallengeRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      UpsertChallengeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.UpsertChallenge(ctx, inputReq);
    });
  } else {
    response = await service.UpsertChallenge(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}

async function handleAdminDeleteChallengeProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, DeleteChallengeRequest, Empty>[]
) {
  let request: DeleteChallengeRequest;
  let response: Empty;

  try {
    request = DeleteChallengeRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      DeleteChallengeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.DeleteChallenge(ctx, inputReq);
    });
  } else {
    response = await service.DeleteChallenge(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}

async function handleAdminGetTeamsProgressProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetTeamsProgressRequest,
    GetTeamsProgressResponse
  >[]
) {
  let request: GetTeamsProgressRequest;
  let response: GetTeamsProgressResponse;

  try {
    request = GetTeamsProgressRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetTeamsProgressRequest,
      GetTeamsProgressResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetTeamsProgress(ctx, inputReq);
    });
  } else {
    response = await service.GetTeamsProgress(ctx, request!);
  }

  return Buffer.from(GetTeamsProgressResponse.toBinary(response));
}

async function handleAdminGetAllChallengesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAllChallengesRequest,
    GetAllChallengesResponse
  >[]
) {
  let request: GetAllChallengesRequest;
  let response: GetAllChallengesResponse;

  try {
    request = GetAllChallengesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAllChallengesRequest,
      GetAllChallengesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAllChallenges(ctx, inputReq);
    });
  } else {
    response = await service.GetAllChallenges(ctx, request!);
  }

  return Buffer.from(GetAllChallengesResponse.toBinary(response));
}

async function handleAdminSetHomePageProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SetHomePageRequest, Empty>[]
) {
  let request: SetHomePageRequest;
  let response: Empty;

  try {
    request = SetHomePageRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SetHomePageRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SetHomePage(ctx, inputReq);
    });
  } else {
    response = await service.SetHomePage(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}

async function handleAdminGetWriteupProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetWriteupRequest, GetWriteupResponse>[]
) {
  let request: GetWriteupRequest;
  let response: GetWriteupResponse;

  try {
    request = GetWriteupRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetWriteupRequest,
      GetWriteupResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetWriteup(ctx, inputReq);
    });
  } else {
    response = await service.GetWriteup(ctx, request!);
  }

  return Buffer.from(GetWriteupResponse.toBinary(response));
}

async function handleAdminSubmitGradeProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AdminTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SubmitGradeRequest, Empty>[]
) {
  let request: SubmitGradeRequest;
  let response: Empty;

  try {
    request = SubmitGradeRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SubmitGradeRequest,
      Empty
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SubmitGrade(ctx, inputReq);
    });
  } else {
    response = await service.SubmitGrade(ctx, request!);
  }

  return Buffer.from(Empty.toBinary(response));
}
