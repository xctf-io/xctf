// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file chalgen/chalgen.proto (package chalgen, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message chalgen.GenerateRequest
 */
export class GenerateRequest extends Message<GenerateRequest> {
  /**
   * @generated from field: chalgen.Graph graph = 1;
   */
  graph?: Graph;

  constructor(data?: PartialMessage<GenerateRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.GenerateRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "graph", kind: "message", T: Graph },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateRequest {
    return new GenerateRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateRequest {
    return new GenerateRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateRequest {
    return new GenerateRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateRequest | PlainMessage<GenerateRequest> | undefined, b: GenerateRequest | PlainMessage<GenerateRequest> | undefined): boolean {
    return proto3.util.equals(GenerateRequest, a, b);
  }
}

/**
 * Define the response structure here
 *
 * @generated from message chalgen.GenerateResponse
 */
export class GenerateResponse extends Message<GenerateResponse> {
  constructor(data?: PartialMessage<GenerateResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.GenerateResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateResponse {
    return new GenerateResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateResponse {
    return new GenerateResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateResponse {
    return new GenerateResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateResponse | PlainMessage<GenerateResponse> | undefined, b: GenerateResponse | PlainMessage<GenerateResponse> | undefined): boolean {
    return proto3.util.equals(GenerateResponse, a, b);
  }
}

/**
 * @generated from message chalgen.Graph
 */
export class Graph extends Message<Graph> {
  /**
   * @generated from field: repeated chalgen.Node nodes = 1;
   */
  nodes: Node[] = [];

  /**
   * @generated from field: repeated chalgen.Edge edges = 2;
   */
  edges: Edge[] = [];

  constructor(data?: PartialMessage<Graph>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Graph";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "nodes", kind: "message", T: Node, repeated: true },
    { no: 2, name: "edges", kind: "message", T: Edge, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Graph {
    return new Graph().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Graph {
    return new Graph().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Graph {
    return new Graph().fromJsonString(jsonString, options);
  }

  static equals(a: Graph | PlainMessage<Graph> | undefined, b: Graph | PlainMessage<Graph> | undefined): boolean {
    return proto3.util.equals(Graph, a, b);
  }
}

/**
 * @generated from message chalgen.Node
 */
export class Node extends Message<Node> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: string flag = 3;
   */
  flag = "";

  /**
   * @generated from oneof chalgen.Node.challenge
   */
  challenge: {
    /**
     * @generated from field: chalgen.Base64 base64 = 4;
     */
    value: Base64;
    case: "base64";
  } | {
    /**
     * @generated from field: chalgen.Twitter twitter = 5;
     */
    value: Twitter;
    case: "twitter";
  } | {
    /**
     * @generated from field: chalgen.CaesarCipher caesar = 6;
     */
    value: CaesarCipher;
    case: "caesar";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Node>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Node";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "flag", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "base64", kind: "message", T: Base64, oneof: "challenge" },
    { no: 5, name: "twitter", kind: "message", T: Twitter, oneof: "challenge" },
    { no: 6, name: "caesar", kind: "message", T: CaesarCipher, oneof: "challenge" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Node {
    return new Node().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Node {
    return new Node().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Node {
    return new Node().fromJsonString(jsonString, options);
  }

  static equals(a: Node | PlainMessage<Node> | undefined, b: Node | PlainMessage<Node> | undefined): boolean {
    return proto3.util.equals(Node, a, b);
  }
}

/**
 * @generated from message chalgen.Edge
 */
export class Edge extends Message<Edge> {
  /**
   * @generated from field: string from = 1;
   */
  from = "";

  /**
   * @generated from field: string to = 2;
   */
  to = "";

  constructor(data?: PartialMessage<Edge>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Edge";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Edge {
    return new Edge().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Edge {
    return new Edge().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Edge {
    return new Edge().fromJsonString(jsonString, options);
  }

  static equals(a: Edge | PlainMessage<Edge> | undefined, b: Edge | PlainMessage<Edge> | undefined): boolean {
    return proto3.util.equals(Edge, a, b);
  }
}

/**
 * @generated from message chalgen.CaesarCipher
 */
export class CaesarCipher extends Message<CaesarCipher> {
  /**
   * @generated from field: string plaintext = 1;
   */
  plaintext = "";

  /**
   * @generated from field: int32 shift = 2;
   */
  shift = 0;

  constructor(data?: PartialMessage<CaesarCipher>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.CaesarCipher";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "plaintext", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "shift", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CaesarCipher {
    return new CaesarCipher().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CaesarCipher {
    return new CaesarCipher().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CaesarCipher {
    return new CaesarCipher().fromJsonString(jsonString, options);
  }

  static equals(a: CaesarCipher | PlainMessage<CaesarCipher> | undefined, b: CaesarCipher | PlainMessage<CaesarCipher> | undefined): boolean {
    return proto3.util.equals(CaesarCipher, a, b);
  }
}

/**
 * @generated from message chalgen.Base64
 */
export class Base64 extends Message<Base64> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<Base64>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Base64";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Base64 {
    return new Base64().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Base64 {
    return new Base64().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Base64 {
    return new Base64().fromJsonString(jsonString, options);
  }

  static equals(a: Base64 | PlainMessage<Base64> | undefined, b: Base64 | PlainMessage<Base64> | undefined): boolean {
    return proto3.util.equals(Base64, a, b);
  }
}

/**
 * @generated from message chalgen.Twitter
 */
export class Twitter extends Message<Twitter> {
  /**
   * @generated from field: repeated chalgen.User users = 1;
   */
  users: User[] = [];

  /**
   * @generated from field: repeated chalgen.Post posts = 2;
   */
  posts: Post[] = [];

  /**
   * @generated from field: repeated chalgen.Comment comments = 3;
   */
  comments: Comment[] = [];

  constructor(data?: PartialMessage<Twitter>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Twitter";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
    { no: 2, name: "posts", kind: "message", T: Post, repeated: true },
    { no: 3, name: "comments", kind: "message", T: Comment, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Twitter {
    return new Twitter().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Twitter {
    return new Twitter().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Twitter {
    return new Twitter().fromJsonString(jsonString, options);
  }

  static equals(a: Twitter | PlainMessage<Twitter> | undefined, b: Twitter | PlainMessage<Twitter> | undefined): boolean {
    return proto3.util.equals(Twitter, a, b);
  }
}

/**
 * @generated from message chalgen.User
 */
export class User extends Message<User> {
  /**
   * @generated from field: int64 id = 1;
   */
  id = protoInt64.zero;

  /**
   * @generated from field: string username = 2;
   */
  username = "";

  /**
   * @generated from field: string bio = 3;
   */
  bio = "";

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "bio", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

/**
 * Post represents a user's post.
 *
 * @generated from message chalgen.Post
 */
export class Post extends Message<Post> {
  /**
   * @generated from field: int64 id = 1;
   */
  id = protoInt64.zero;

  /**
   * @generated from field: int64 user_id = 2;
   */
  userId = protoInt64.zero;

  /**
   * @generated from field: string content = 3;
   */
  content = "";

  /**
   * Unix timestamp
   *
   * @generated from field: int64 timestamp = 4;
   */
  timestamp = protoInt64.zero;

  constructor(data?: PartialMessage<Post>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Post";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "user_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Post {
    return new Post().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Post {
    return new Post().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Post {
    return new Post().fromJsonString(jsonString, options);
  }

  static equals(a: Post | PlainMessage<Post> | undefined, b: Post | PlainMessage<Post> | undefined): boolean {
    return proto3.util.equals(Post, a, b);
  }
}

/**
 * Comment represents a comment on a post.
 *
 * @generated from message chalgen.Comment
 */
export class Comment extends Message<Comment> {
  /**
   * @generated from field: int64 id = 1;
   */
  id = protoInt64.zero;

  /**
   * @generated from field: int64 post_id = 2;
   */
  postId = protoInt64.zero;

  /**
   * @generated from field: int64 user_id = 3;
   */
  userId = protoInt64.zero;

  /**
   * @generated from field: string content = 4;
   */
  content = "";

  /**
   * Unix timestamp
   *
   * @generated from field: int64 timestamp = 5;
   */
  timestamp = protoInt64.zero;

  constructor(data?: PartialMessage<Comment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Comment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "post_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "user_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Comment {
    return new Comment().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Comment {
    return new Comment().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Comment {
    return new Comment().fromJsonString(jsonString, options);
  }

  static equals(a: Comment | PlainMessage<Comment> | undefined, b: Comment | PlainMessage<Comment> | undefined): boolean {
    return proto3.util.equals(Comment, a, b);
  }
}

