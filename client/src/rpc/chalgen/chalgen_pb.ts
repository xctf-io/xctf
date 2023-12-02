// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file chalgen/chalgen.proto (package chalgen, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message chalgen.CompetitionList
 */
export class CompetitionList extends Message<CompetitionList> {
  /**
   * @generated from field: repeated chalgen.Competition competitions = 1;
   */
  competitions: Competition[] = [];

  constructor(data?: PartialMessage<CompetitionList>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.CompetitionList";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "competitions", kind: "message", T: Competition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CompetitionList {
    return new CompetitionList().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CompetitionList {
    return new CompetitionList().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CompetitionList {
    return new CompetitionList().fromJsonString(jsonString, options);
  }

  static equals(a: CompetitionList | PlainMessage<CompetitionList> | undefined, b: CompetitionList | PlainMessage<CompetitionList> | undefined): boolean {
    return proto3.util.equals(CompetitionList, a, b);
  }
}

/**
 * @generated from message chalgen.Competition
 */
export class Competition extends Message<Competition> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: chalgen.Graph graph = 3;
   */
  graph?: Graph;

  /**
   * @generated from field: bool active = 4;
   */
  active = false;

  constructor(data?: PartialMessage<Competition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Competition";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "graph", kind: "message", T: Graph },
    { no: 4, name: "active", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Competition {
    return new Competition().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Competition {
    return new Competition().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Competition {
    return new Competition().fromJsonString(jsonString, options);
  }

  static equals(a: Competition | PlainMessage<Competition> | undefined, b: Competition | PlainMessage<Competition> | undefined): boolean {
    return proto3.util.equals(Competition, a, b);
  }
}

/**
 * @generated from message chalgen.Graph
 */
export class Graph extends Message<Graph> {
  /**
   * @generated from field: repeated chalgen.Node nodes = 3;
   */
  nodes: Node[] = [];

  /**
   * @generated from field: repeated chalgen.Edge edges = 4;
   */
  edges: Edge[] = [];

  constructor(data?: PartialMessage<Graph>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Graph";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 3, name: "nodes", kind: "message", T: Node, repeated: true },
    { no: 4, name: "edges", kind: "message", T: Edge, repeated: true },
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
 * @generated from message chalgen.FormUI
 */
export class FormUI extends Message<FormUI> {
  /**
   * @generated from field: bool visible = 1;
   */
  visible = false;

  constructor(data?: PartialMessage<FormUI>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.FormUI";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "visible", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FormUI {
    return new FormUI().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FormUI {
    return new FormUI().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FormUI {
    return new FormUI().fromJsonString(jsonString, options);
  }

  static equals(a: FormUI | PlainMessage<FormUI> | undefined, b: FormUI | PlainMessage<FormUI> | undefined): boolean {
    return proto3.util.equals(FormUI, a, b);
  }
}

/**
 * @generated from message chalgen.Meta
 */
export class Meta extends Message<Meta> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: int32 x = 2;
   */
  x = 0;

  /**
   * @generated from field: int32 y = 3;
   */
  y = 0;

  /**
   * @generated from field: string name = 4;
   */
  name = "";

  /**
   * @generated from field: string flag = 5;
   */
  flag = "";

  /**
   * @generated from field: bool entrypoint = 6;
   */
  entrypoint = false;

  constructor(data?: PartialMessage<Meta>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Meta";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "x", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "y", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "flag", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "entrypoint", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Meta {
    return new Meta().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Meta {
    return new Meta().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Meta {
    return new Meta().fromJsonString(jsonString, options);
  }

  static equals(a: Meta | PlainMessage<Meta> | undefined, b: Meta | PlainMessage<Meta> | undefined): boolean {
    return proto3.util.equals(Meta, a, b);
  }
}

/**
 * @generated from message chalgen.Node
 */
export class Node extends Message<Node> {
  /**
   * @generated from field: chalgen.Meta meta = 1;
   */
  meta?: Meta;

  /**
   * @generated from oneof chalgen.Node.challenge
   */
  challenge: {
    /**
     * @generated from field: chalgen.Base64 base64 = 6;
     */
    value: Base64;
    case: "base64";
  } | {
    /**
     * @generated from field: chalgen.Twitter twitter = 7;
     */
    value: Twitter;
    case: "twitter";
  } | {
    /**
     * @generated from field: chalgen.CaesarCipher caesar = 8;
     */
    value: CaesarCipher;
    case: "caesar";
  } | {
    /**
     * @generated from field: chalgen.PCAP pcap = 9;
     */
    value: PCAP;
    case: "pcap";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Node>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Node";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "meta", kind: "message", T: Meta },
    { no: 6, name: "base64", kind: "message", T: Base64, oneof: "challenge" },
    { no: 7, name: "twitter", kind: "message", T: Twitter, oneof: "challenge" },
    { no: 8, name: "caesar", kind: "message", T: CaesarCipher, oneof: "challenge" },
    { no: 9, name: "pcap", kind: "message", T: PCAP, oneof: "challenge" },
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
 * @generated from message chalgen.PCAP
 */
export class PCAP extends Message<PCAP> {
  /**
   * @generated from field: repeated chalgen.Packet packets = 1;
   */
  packets: Packet[] = [];

  constructor(data?: PartialMessage<PCAP>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.PCAP";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "packets", kind: "message", T: Packet, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PCAP {
    return new PCAP().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PCAP {
    return new PCAP().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PCAP {
    return new PCAP().fromJsonString(jsonString, options);
  }

  static equals(a: PCAP | PlainMessage<PCAP> | undefined, b: PCAP | PlainMessage<PCAP> | undefined): boolean {
    return proto3.util.equals(PCAP, a, b);
  }
}

/**
 * @generated from message chalgen.Packet
 */
export class Packet extends Message<Packet> {
  /**
   * @generated from field: int64 timestamp = 1;
   */
  timestamp = protoInt64.zero;

  /**
   * @generated from field: string source = 2;
   */
  source = "";

  /**
   * @generated from field: string destination = 3;
   */
  destination = "";

  /**
   * @generated from field: string protocol = 4;
   */
  protocol = "";

  /**
   * @generated from field: string data = 5;
   */
  data = "";

  constructor(data?: PartialMessage<Packet>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Packet";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "source", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "destination", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "protocol", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Packet {
    return new Packet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Packet {
    return new Packet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Packet {
    return new Packet().fromJsonString(jsonString, options);
  }

  static equals(a: Packet | PlainMessage<Packet> | undefined, b: Packet | PlainMessage<Packet> | undefined): boolean {
    return proto3.util.equals(Packet, a, b);
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
   * @generated from field: string username = 1;
   */
  username = "";

  /**
   * @generated from field: string bio = 2;
   */
  bio = "";

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bio", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
   * @generated from field: string username = 1;
   */
  username = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  constructor(data?: PartialMessage<Post>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Post";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
   * @generated from field: int64 post_number = 1;
   */
  postNumber = protoInt64.zero;

  /**
   * @generated from field: int64 username = 2;
   */
  username = protoInt64.zero;

  /**
   * @generated from field: string content = 3;
   */
  content = "";

  constructor(data?: PartialMessage<Comment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Comment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "post_number", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "username", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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

