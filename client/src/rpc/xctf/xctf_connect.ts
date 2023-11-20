// @generated by protoc-gen-connect-es v1.1.3 with parameter "target=ts"
// @generated from file xctf/xctf.proto (package xctf, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CurrentUserRequest, CurrentUserResponse, DeleteChallengeRequest, Empty, ForgotPasswordRequest, GetAllChallengesRequest, GetAllChallengesResponse, GetCommentsRequest, GetCommentsResponse, GetDiscoveredEvidenceRequest, GetDiscoveredEvidenceResponse, GetHomePageRequest, GetHomePageResponse, GetTeamsProgressRequest, GetTeamsProgressResponse, GetUserGraphRequest, GetUserGraphResponse, GetWriteupRequest, GetWriteupResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, SetHomePageRequest, SubmitCommentRequest, SubmitEvidenceConnectionRequest, SubmitEvidenceConnectionResponse, SubmitEvidenceReportRequest, SubmitEvidenceRequest, SubmitEvidenceResponse, SubmitFlagRequest, SubmitFlagResponse, SubmitGradeRequest, SubmitWriteupRequest, UpsertChallengeRequest } from "./xctf_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service xctf.Backend
 */
export const Backend = {
  typeName: "xctf.Backend",
  methods: {
    /**
     * @generated from rpc xctf.Backend.Register
     */
    register: {
      name: "Register",
      I: RegisterRequest,
      O: RegisterResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.Login
     */
    login: {
      name: "Login",
      I: LoginRequest,
      O: LoginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.Logout
     */
    logout: {
      name: "Logout",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.CurrentUser
     */
    currentUser: {
      name: "CurrentUser",
      I: CurrentUserRequest,
      O: CurrentUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.SubmitFlag
     */
    submitFlag: {
      name: "SubmitFlag",
      I: SubmitFlagRequest,
      O: SubmitFlagResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.SubmitEvidenceReport
     */
    submitEvidenceReport: {
      name: "SubmitEvidenceReport",
      I: SubmitEvidenceReportRequest,
      O: SubmitEvidenceReportRequest,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.GetDiscoveredEvidence
     */
    getDiscoveredEvidence: {
      name: "GetDiscoveredEvidence",
      I: GetDiscoveredEvidenceRequest,
      O: GetDiscoveredEvidenceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.SubmitEvidence
     */
    submitEvidence: {
      name: "SubmitEvidence",
      I: SubmitEvidenceRequest,
      O: SubmitEvidenceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.SubmitEvidenceConnection
     */
    submitEvidenceConnection: {
      name: "SubmitEvidenceConnection",
      I: SubmitEvidenceConnectionRequest,
      O: SubmitEvidenceConnectionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.GetHomePage
     */
    getHomePage: {
      name: "GetHomePage",
      I: GetHomePageRequest,
      O: GetHomePageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.ForgotPassword
     */
    forgotPassword: {
      name: "ForgotPassword",
      I: ForgotPasswordRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Backend.SubmitWriteup
     */
    submitWriteup: {
      name: "SubmitWriteup",
      I: SubmitWriteupRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * @generated from service xctf.Admin
 */
export const Admin = {
  typeName: "xctf.Admin",
  methods: {
    /**
     * @generated from rpc xctf.Admin.UpsertChallenge
     */
    upsertChallenge: {
      name: "UpsertChallenge",
      I: UpsertChallengeRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.DeleteChallenge
     */
    deleteChallenge: {
      name: "DeleteChallenge",
      I: DeleteChallengeRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.GetTeamsProgress
     */
    getTeamsProgress: {
      name: "GetTeamsProgress",
      I: GetTeamsProgressRequest,
      O: GetTeamsProgressResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.GetAllChallenges
     */
    getAllChallenges: {
      name: "GetAllChallenges",
      I: GetAllChallengesRequest,
      O: GetAllChallengesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.SetHomePage
     */
    setHomePage: {
      name: "SetHomePage",
      I: SetHomePageRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.GetWriteup
     */
    getWriteup: {
      name: "GetWriteup",
      I: GetWriteupRequest,
      O: GetWriteupResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.SubmitGrade
     */
    submitGrade: {
      name: "SubmitGrade",
      I: SubmitGradeRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.SubmitComment
     */
    submitComment: {
      name: "SubmitComment",
      I: SubmitCommentRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.GetComments
     */
    getComments: {
      name: "GetComments",
      I: GetCommentsRequest,
      O: GetCommentsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc xctf.Admin.GetUserGraph
     */
    getUserGraph: {
      name: "GetUserGraph",
      I: GetUserGraphRequest,
      O: GetUserGraphResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

