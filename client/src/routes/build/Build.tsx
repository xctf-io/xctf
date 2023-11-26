import React, {useEffect} from 'react'
import {SelectList} from "@/routes/build/SelectList";
import {Button} from "@nextui-org/react";
import {GRPCInputFormProps, ProtobufMessageForm} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {useForm} from "react-hook-form";
import { xctf } from '@/service';

const ChallengeForm: React.FC = () => {
    return (
        <>
            <h1>Challenge Form</h1>
        </>
    )
}

export const Build: React.FC = () => {
    const [nodeInfo, setNodeInfo] = React.useState<any>(null);

    useEffect(() => {
        (async () => {
            const res = await xctf.challengeType({});
            setNodeInfo(res);
        })();
    }, []);

    const {register, handleSubmit, control, setValue} = useForm({
        values: {
            data: {},
        },
    });

    const onSubmit = async (data: any) => {
        console.log(data);
    };


    const form = () => {
        if (!nodeInfo || !nodeInfo.typeInfo) {
            return null;
        }

        const inputFormProps: GRPCInputFormProps = {
            grpcInfo: nodeInfo.typeInfo,
            // some random key to separate data from the form
            baseFieldName: 'data',
            //@ts-ignore
            register,
            setValue,
            // TODO breadchris without this ignore, my computer wants to take flight https://github.com/react-hook-form/react-hook-form/issues/6679
            //@ts-ignore
            control,
            fieldPath: nodeInfo?.typeInfo?.packageName || '',
        }
        return (
            <ProtobufMessageForm {...inputFormProps} />
        );
    }

    return (
        <>
            <div className="mx-[3vw] lg:mx-[6vw] mt-8">
                <h1>Build Page</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 p-3">
                        {form()}
                    </div>
                    <div className="flex items-center">
                        <Button appearance="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}