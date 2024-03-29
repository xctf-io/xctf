// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file chals/config.proto (package chals, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message chals.FormUI
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
  static readonly typeName = "chals.FormUI";
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
 * @generated from message chals.Meta
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
  static readonly typeName = "chals.Meta";
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
 * @generated from message chals.Resources
 */
export class Resources extends Message<Resources> {
  /**
   * @generated from field: string build_dir = 1;
   */
  buildDir = "";

  constructor(data?: PartialMessage<Resources>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chals.Resources";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "build_dir", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Resources {
    return new Resources().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Resources {
    return new Resources().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Resources {
    return new Resources().fromJsonString(jsonString, options);
  }

  static equals(a: Resources | PlainMessage<Resources> | undefined, b: Resources | PlainMessage<Resources> | undefined): boolean {
    return proto3.util.equals(Resources, a, b);
  }
}

