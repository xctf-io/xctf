import {DescriptorProto, FieldDescriptorProto, FieldDescriptorProto_Label} from "@bufbuild/protobuf";
import React, {FC} from "react";
import {useFieldArray} from "react-hook-form";
import {InputFormContents, InputFormContentsProps} from "@/components/ProtobufFormSimple/InputFormContents";
import {Button, Radio, RadioGroup} from "@fluentui/react-components";
import {GRPCInputFormProps} from "@/components/ProtobufFormSimple/ProtobufInputForm";
import {Stack} from "@fluentui/react";

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

export const Field: FC<GRPCInputFormContentsProps> = (props) => {
    const [currentField, setCurrentField] = React.useState<string>('');
    const {control, baseFieldName, field, fieldPath, desc} = props;

    const {fields: formFields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control, name: baseFieldName || 'input',
    });

    const formatField = (field: FieldDescriptorProto) => {
        const inputProps: InputFormContentsProps = {
            ...props, field, fieldPath: `${fieldPath}.${desc.name}`
        }

        // TODO breadchris for some reason FieldDescriptorProto_Label.REPEATED is a number and field.label is a string
        // @ts-ignore
        if (field.label === 'LABEL_REPEATED' || field.label === FieldDescriptorProto_Label.REPEATED) {
            return (<div>
                {formFields.map((f, index) => (
                    <div key={f.id}>
                        <InputFormContents {...inputProps} index={index}/>
                        <Button onClick={() => remove(index)}>Remove</Button>
                    </div>
                ))}
                <Button onClick={() => append({})}>Append</Button>
            </div>)
        }
        return (<>
            <InputFormContents {...inputProps} />
        </>)
    }

    const panelContents = () => {
        if (field.type === 'field') {
            return formatField(field.field)
        } else {
            if (!field.fields) {
                return null;
            }
            const fieldLookup = field.fields.reduce((acc, f) => {
                return {
                    ...acc,
                    [f.name || '']: f,
                }
            }, {} as Record<string, FieldDescriptorProto>)
            return (<Stack horizontal>
                <Stack.Item>
                    <RadioGroup
                        value={currentField}
                        onChange={(_, data) => setCurrentField(data.value)}
                    >
                        {field.fields.map((f) => <Radio key={f.name} value={f.name} label={f.name} />)}
                    </RadioGroup>
                </Stack.Item>
                <Stack.Item>
                    {currentField && formatField(fieldLookup[currentField])}
                </Stack.Item>
            </Stack>)
        }
    }
    return (
        <Stack horizontal key={field.name}>
            <Stack.Item>
                {field.name}
            </Stack.Item>
            <Stack.Item>
                {panelContents()}
            </Stack.Item>
        </Stack>
    )
}
