import {
    FieldDescriptorProto,
} from "@bufbuild/protobuf";
import React, {FC} from "react";
import {Control, UseFormRegister} from "react-hook-form";
import {GRPCTypeInfo} from "@/rpc/xctf/xctf_pb";
import {MessageField, ProtobufFormFieldType} from "@/components/ProtobufFormSimple/MessageField";
import "./styles.css";

export interface GRPCInputFormProps {
    grpcInfo: GRPCTypeInfo
    register: UseFormRegister<any>
    control: Control
    fieldPath: string
    baseFieldName?: string
    setValue: (name: any, value: any) => void
}

export const ProtobufMessageForm: FC<GRPCInputFormProps> = (props) => {
    const {
        grpcInfo,
    } = props;

    const { msg: desc } = grpcInfo;
    if (!desc) {
        return null;
    }

    const formattedFields: ProtobufFormFieldType[] = [];
    desc.field.forEach((field: FieldDescriptorProto) => {
        if (field.oneofIndex !== undefined) {
            const oneofType = desc.oneofDecl[field.oneofIndex]
            const existingOneof = formattedFields.find((f) => f.type === 'oneof' && f.name === oneofType.name);
            if (!existingOneof) {
                formattedFields.push({
                    type: 'oneof',
                    name: oneofType.name || 'unknown',
                    fields: [field],
                })
            } else {
                if (existingOneof.type === 'oneof') {
                    existingOneof.fields.push(field);
                }
            }
        } else {
            formattedFields.push({
                type: 'field',
                name: field.name || 'unknown',
                field,
            });
        }
    });
    return (
        <div className={"grpc-request-form"}>
            <table>
                <tr>
                    <th>{desc.name}</th>
                </tr>
                {formattedFields.map((field) => {
                    return (
                        <tr key={field.name} className={"message_field"}>
                            <td className={"name"}>
                                <strong>{field.name}</strong>
                            </td>
                            <td className={"toggle_prescence"}>
                                <input type={"checkbox"} />
                            </td>
                            <td>
                                <MessageField {...props} field={field} desc={desc} />
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
