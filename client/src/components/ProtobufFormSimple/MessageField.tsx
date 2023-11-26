import {DescriptorProto, FieldDescriptorProto, FieldDescriptorProto_Label} from "@bufbuild/protobuf";
import React, {FC, useState} from "react";
import {useFieldArray} from "react-hook-form";
import {InputFormContents, InputFormContentsProps} from "@/components/ProtobufFormSimple/InputFormContents";
import {GRPCInputFormProps} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {Button} from "@nextui-org/react";

type GrpcFormField = {
    type: 'field'
    name: string
    field: FieldDescriptorProto
}

type GrpcFormOneof = {
    type: 'oneof'
    name: string
    fields: FieldDescriptorProto[]
}

export type ProtobufFormFieldType = GrpcFormField | GrpcFormOneof

interface GRPCInputFormContentsProps extends GRPCInputFormProps {
    field: ProtobufFormFieldType
    desc: DescriptorProto
}

export const MessageField: FC<GRPCInputFormContentsProps> = (props) => {
    const [currentField, setCurrentField] = useState<string|undefined>('');
    const { control, baseFieldName, field, fieldPath, desc } = props;

    const { fields: formFields, append, remove } = useFieldArray({
        control, name: baseFieldName || 'input',
    });

    const formatField = (field: FieldDescriptorProto) => {
        const inputProps: InputFormContentsProps = {
            ...props, field, fieldPath: `${fieldPath}.${desc.name}`
        };

        if (field.label === 'LABEL_REPEATED' || field.label === FieldDescriptorProto_Label.REPEATED) {
            return (<div>
                {formFields.map((f, index) => (
                    <div key={f.id}>
                        <InputFormContents {...inputProps} index={index} />
                        <Button onClick={() => remove(index)}>Remove</Button>
                    </div>
                ))}
                <Button onClick={() => append({})}>Append</Button>
            </div>);
        }
        return (<InputFormContents {...inputProps} />);
    }

    const panelContents = () => {
        if (field.type === 'field') {
            return formatField(field.field);
        } else {
            if (!field.fields) {
                return null;
            }
            const fieldLookup = field.fields.reduce((acc, f) => ({
                ...acc,
                [f.name || '']: f,
            }), {} as Record<string, FieldDescriptorProto>);
            return (
                <div className="oneof">
                    <table>
                        {field.fields.map((f) => (
                            <tr>
                                <td className={"name"}>
                                    <strong>{f.name}</strong>
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        value={f.name}
                                        checked={currentField === f.name}
                                        onChange={() => setCurrentField(f.name)}
                                    />
                                </td>
                                <td>
                                    {(currentField && currentField == f.name) ? formatField(fieldLookup[currentField]) : "unset"}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            );
        }
    }

    return (
        <div className="field-container">
            <div className="field-name">{field.name}</div>
            <div className="field-content">{panelContents()}</div>
        </div>
    );
}
