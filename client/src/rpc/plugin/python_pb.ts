// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file plugin/python.proto (package plugin, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Meta, Resources } from "../chals/config_pb.js";

/**
 * @generated from message plugin.PythonChallenge
 */
export class PythonChallenge extends Message<PythonChallenge> {
  /**
   * @generated from oneof plugin.PythonChallenge.type
   */
  type: {
    /**
     * @generated from field: plugin.Exif exif = 1;
     */
    value: Exif;
    case: "exif";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<PythonChallenge>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "plugin.PythonChallenge";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "exif", kind: "message", T: Exif, oneof: "type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PythonChallenge {
    return new PythonChallenge().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PythonChallenge {
    return new PythonChallenge().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PythonChallenge {
    return new PythonChallenge().fromJsonString(jsonString, options);
  }

  static equals(a: PythonChallenge | PlainMessage<PythonChallenge> | undefined, b: PythonChallenge | PlainMessage<PythonChallenge> | undefined): boolean {
    return proto3.util.equals(PythonChallenge, a, b);
  }
}

/**
 * @generated from message plugin.Exif
 */
export class Exif extends Message<Exif> {
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
  static readonly typeName = "plugin.Exif";
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
 * @generated from message plugin.GenerateRequest
 */
export class GenerateRequest extends Message<GenerateRequest> {
  /**
   * @generated from field: chals.Meta meta = 1;
   */
  meta?: Meta;

  /**
   * @generated from field: plugin.PythonChallenge challenge = 2;
   */
  challenge?: PythonChallenge;

  /**
   * @generated from field: chals.Resources resources = 3;
   */
  resources?: Resources;

  constructor(data?: PartialMessage<GenerateRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "plugin.GenerateRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "meta", kind: "message", T: Meta },
    { no: 2, name: "challenge", kind: "message", T: PythonChallenge },
    { no: 3, name: "resources", kind: "message", T: Resources },
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
 * @generated from message plugin.GenerateResponse
 */
export class GenerateResponse extends Message<GenerateResponse> {
  /**
   * @generated from field: string display = 1;
   */
  display = "";

  /**
   * @generated from field: string file = 2;
   */
  file = "";

  constructor(data?: PartialMessage<GenerateResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "plugin.GenerateResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "display", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
