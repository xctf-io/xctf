import {DescriptorProto, FieldDescriptorProto, FieldDescriptorProto_Label, FieldDescriptorProto_Type} from "@bufbuild/protobuf";
import React, {FC, useState} from "react";
import {useFieldArray} from "react-hook-form";
import {InputFormContents, InputFormContentsProps} from "@/components/ProtobufFormSimple/InputFormContents";
import {GRPCInputFormProps} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {Button} from "@nextui-org/react";
import { typeLookup } from "@/util/proto";

type GrpcFormField = {
    type: 'field'
    name: string
    field: FieldDescriptorProto
    fieldType: FieldDescriptorProto_Type | undefined
}

type GrpcFormOneof = {
    type: 'oneof'
    name: string
    fields: FieldDescriptorProto[]
    fieldType: FieldDescriptorProto_Type | undefined
}

export type ProtobufFormFieldType = GrpcFormField | GrpcFormOneof

interface GRPCInputFormContentsProps extends GRPCInputFormProps {
    field: ProtobufFormFieldType
    desc: DescriptorProto
}

export const MessageField: FC<GRPCInputFormContentsProps> = (props) => {
    const [currentField, setCurrentField] = useState<string|undefined>('');
    const { resetField, control, baseFieldName, field, fieldPath, desc } = props;

    const { fields: formFields, append, remove } = useFieldArray({
        control, name: baseFieldName || 'input',
    });

    const formatField = (baseFieldName: string|undefined, field: FieldDescriptorProto) => {
        const inputProps: InputFormContentsProps = {
            inputFormProps: {
                ...props,
                fieldPath: `${fieldPath}.${field.name}`,
                baseFieldName,
            },
            field,
        };

        if (field.label === FieldDescriptorProto_Label.REPEATED) {
            return (
                <table>
                    <tbody>
                        {formFields.map((f, index) => (
                            <tr className={"array_element"} key={f.id}>
                                <td>
                                    <InputFormContents {...inputProps} index={index} />
                                    <Button color={"error"} onClick={() => remove(index)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <Button onClick={() => append({})}>New</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return (<InputFormContents {...inputProps} />);
    }

    const panelContents = () => {
        if (field.type === 'field') {
            return formatField(props.baseFieldName, field.field);
        } else {
            if (!field.fields) {
                return null;
            }
            const fieldLookup = field.fields.reduce((acc, fd) => ({
                ...acc,
                [fd.name || '']: fd,
            }), {} as Record<string, FieldDescriptorProto>);
            return (
                <div className="oneof">
                    <table>
                        <tbody>
                        {field.fields.map((f) => (
                            <tr key={f.name}>
                                <td className={"name"}>
                                    <strong>{f.name}</strong><br/>{f.type && typeLookup[f.type]}
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        value={f.name}
                                        checked={currentField === f.name}
                                        onChange={() => {
                                            if (baseFieldName) {
                                                resetField(baseFieldName);
                                            }
                                            setCurrentField(f.name)
                                        }}
                                    />
                                </td>
                                <td>
                                    {(currentField && currentField == f.name) ? formatField(`${props.parentFieldName}.${f.name}`, fieldLookup[currentField]) : "unset"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    return (
        <div className="input_container two-of-2 three-of-3 two-of-4 one-of-5">
            <div className="field-content">{panelContents()}</div>
        </div>
    );
}
