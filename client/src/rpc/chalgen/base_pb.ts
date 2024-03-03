// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file chalgen/base.proto (package chalgen, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message as Message$1, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message chalgen.Challenge
 */
export class Challenge extends Message$1<Challenge> {
  /**
   * @generated from oneof chalgen.Challenge.type
   */
  type: {
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
  } | {
    /**
     * @generated from field: chalgen.Exif exif = 10;
     */
    value: Exif;
    case: "exif";
  } | {
    /**
     * @generated from field: chalgen.Slack slack = 11;
     */
    value: Slack;
    case: "slack";
  } | {
    /**
     * @generated from field: chalgen.Phone phone = 12;
     */
    value: Phone;
    case: "phone";
  } | {
    /**
     * @generated from field: chalgen.FileManager filemanager = 13;
     */
    value: FileManager;
    case: "filemanager";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Challenge>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Challenge";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 6, name: "base64", kind: "message", T: Base64, oneof: "type" },
    { no: 7, name: "twitter", kind: "message", T: Twitter, oneof: "type" },
    { no: 8, name: "caesar", kind: "message", T: CaesarCipher, oneof: "type" },
    { no: 9, name: "pcap", kind: "message", T: PCAP, oneof: "type" },
    { no: 10, name: "exif", kind: "message", T: Exif, oneof: "type" },
    { no: 11, name: "slack", kind: "message", T: Slack, oneof: "type" },
    { no: 12, name: "phone", kind: "message", T: Phone, oneof: "type" },
    { no: 13, name: "filemanager", kind: "message", T: FileManager, oneof: "type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Challenge {
    return new Challenge().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Challenge {
    return new Challenge().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Challenge {
    return new Challenge().fromJsonString(jsonString, options);
  }

  static equals(a: Challenge | PlainMessage<Challenge> | undefined, b: Challenge | PlainMessage<Challenge> | undefined): boolean {
    return proto3.util.equals(Challenge, a, b);
  }
}

/**
 * @generated from message chalgen.FileManager
 */
export class FileManager extends Message$1<FileManager> {
  /**
   * @generated from field: repeated string urls = 1;
   */
  urls: string[] = [];

  /**
   * @generated from field: string password = 2;
   */
  password = "";

  constructor(data?: PartialMessage<FileManager>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.FileManager";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "urls", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FileManager {
    return new FileManager().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FileManager {
    return new FileManager().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FileManager {
    return new FileManager().fromJsonString(jsonString, options);
  }

  static equals(a: FileManager | PlainMessage<FileManager> | undefined, b: FileManager | PlainMessage<FileManager> | undefined): boolean {
    return proto3.util.equals(FileManager, a, b);
  }
}

/**
 * @generated from message chalgen.Phone
 */
export class Phone extends Message$1<Phone> {
  /**
   * @generated from field: repeated chalgen.App apps = 1;
   */
  apps: App[] = [];

  constructor(data?: PartialMessage<Phone>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Phone";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "apps", kind: "message", T: App, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Phone {
    return new Phone().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Phone {
    return new Phone().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Phone {
    return new Phone().fromJsonString(jsonString, options);
  }

  static equals(a: Phone | PlainMessage<Phone> | undefined, b: Phone | PlainMessage<Phone> | undefined): boolean {
    return proto3.util.equals(Phone, a, b);
  }
}

/**
 * @generated from message chalgen.App
 */
export class App extends Message$1<App> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string url = 2;
   */
  url = "";

  /**
   * @generated from field: string html = 3;
   */
  html = "";

  /**
   * @generated from oneof chalgen.App.type
   */
  type: {
    /**
     * @generated from field: chalgen.Tracker tracker = 4;
     */
    value: Tracker;
    case: "tracker";
  } | {
    /**
     * @generated from field: chalgen.PhotoGallery photogallery = 5;
     */
    value: PhotoGallery;
    case: "photogallery";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<App>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.App";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "html", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "tracker", kind: "message", T: Tracker, oneof: "type" },
    { no: 5, name: "photogallery", kind: "message", T: PhotoGallery, oneof: "type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): App {
    return new App().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): App {
    return new App().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): App {
    return new App().fromJsonString(jsonString, options);
  }

  static equals(a: App | PlainMessage<App> | undefined, b: App | PlainMessage<App> | undefined): boolean {
    return proto3.util.equals(App, a, b);
  }
}

/**
 * https://daisyui.com/components/steps/
 *
 * @generated from message chalgen.Tracker
 */
export class Tracker extends Message$1<Tracker> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: repeated chalgen.Event event = 2;
   */
  event: Event[] = [];

  constructor(data?: PartialMessage<Tracker>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Tracker";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "event", kind: "message", T: Event, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Tracker {
    return new Tracker().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Tracker {
    return new Tracker().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Tracker {
    return new Tracker().fromJsonString(jsonString, options);
  }

  static equals(a: Tracker | PlainMessage<Tracker> | undefined, b: Tracker | PlainMessage<Tracker> | undefined): boolean {
    return proto3.util.equals(Tracker, a, b);
  }
}

/**
 * @generated from message chalgen.Event
 */
export class Event extends Message$1<Event> {
  /**
   * @generated from field: int64 timestamp = 1;
   */
  timestamp = protoInt64.zero;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  constructor(data?: PartialMessage<Event>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Event";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Event {
    return new Event().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Event {
    return new Event().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Event {
    return new Event().fromJsonString(jsonString, options);
  }

  static equals(a: Event | PlainMessage<Event> | undefined, b: Event | PlainMessage<Event> | undefined): boolean {
    return proto3.util.equals(Event, a, b);
  }
}

/**
 * @generated from message chalgen.PhotoGallery
 */
export class PhotoGallery extends Message$1<PhotoGallery> {
  /**
   * @generated from field: repeated string url = 1;
   */
  url: string[] = [];

  constructor(data?: PartialMessage<PhotoGallery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.PhotoGallery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PhotoGallery {
    return new PhotoGallery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PhotoGallery {
    return new PhotoGallery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PhotoGallery {
    return new PhotoGallery().fromJsonString(jsonString, options);
  }

  static equals(a: PhotoGallery | PlainMessage<PhotoGallery> | undefined, b: PhotoGallery | PlainMessage<PhotoGallery> | undefined): boolean {
    return proto3.util.equals(PhotoGallery, a, b);
  }
}

/**
 * @generated from message chalgen.Slack
 */
export class Slack extends Message$1<Slack> {
  /**
   * @generated from field: repeated chalgen.User users = 1;
   */
  users: User[] = [];

  /**
   * @generated from field: repeated chalgen.Channel channels = 2;
   */
  channels: Channel[] = [];

  constructor(data?: PartialMessage<Slack>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Slack";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
    { no: 2, name: "channels", kind: "message", T: Channel, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Slack {
    return new Slack().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Slack {
    return new Slack().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Slack {
    return new Slack().fromJsonString(jsonString, options);
  }

  static equals(a: Slack | PlainMessage<Slack> | undefined, b: Slack | PlainMessage<Slack> | undefined): boolean {
    return proto3.util.equals(Slack, a, b);
  }
}

/**
 * @generated from message chalgen.Channel
 */
export class Channel extends Message$1<Channel> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: repeated string usernames = 2;
   */
  usernames: string[] = [];

  /**
   * @generated from field: repeated chalgen.Message messages = 3;
   */
  messages: Message[] = [];

  constructor(data?: PartialMessage<Channel>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Channel";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "usernames", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 3, name: "messages", kind: "message", T: Message, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Channel {
    return new Channel().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Channel {
    return new Channel().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Channel {
    return new Channel().fromJsonString(jsonString, options);
  }

  static equals(a: Channel | PlainMessage<Channel> | undefined, b: Channel | PlainMessage<Channel> | undefined): boolean {
    return proto3.util.equals(Channel, a, b);
  }
}

/**
 * @generated from message chalgen.Message
 */
export class Message extends Message$1<Message> {
  /**
   * @generated from field: string username = 1;
   */
  username = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: int64 timestamp = 3;
   */
  timestamp = protoInt64.zero;

  constructor(data?: PartialMessage<Message>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Message";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Message {
    return new Message().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Message {
    return new Message().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Message {
    return new Message().fromJsonString(jsonString, options);
  }

  static equals(a: Message | PlainMessage<Message> | undefined, b: Message | PlainMessage<Message> | undefined): boolean {
    return proto3.util.equals(Message, a, b);
  }
}

/**
 * @generated from message chalgen.Exif
 */
export class Exif extends Message$1<Exif> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  constructor(data?: PartialMessage<Exif>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.Exif";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Exif {
    return new Exif().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Exif {
    return new Exif().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Exif {
    return new Exif().fromJsonString(jsonString, options);
  }

  static equals(a: Exif | PlainMessage<Exif> | undefined, b: Exif | PlainMessage<Exif> | undefined): boolean {
    return proto3.util.equals(Exif, a, b);
  }
}

/**
 * @generated from message chalgen.PCAP
 */
export class PCAP extends Message$1<PCAP> {
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
export class Packet extends Message$1<Packet> {
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
export class CaesarCipher extends Message$1<CaesarCipher> {
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
export class Base64 extends Message$1<Base64> {
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
export class Twitter extends Message$1<Twitter> {
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
export class User extends Message$1<User> {
  /**
   * @generated from field: string username = 1;
   */
  username = "";

  /**
   * @generated from field: string bio = 2;
   */
  bio = "";

  /**
   * @generated from field: string password = 3;
   */
  password = "";

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chalgen.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bio", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
export class Post extends Message$1<Post> {
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
export class Comment extends Message$1<Comment> {
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

