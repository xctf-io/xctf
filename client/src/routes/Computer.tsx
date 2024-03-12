import { xctf } from '@/service';
import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {GetComputerResponse} from "@/rpc/xctf/xctf_pb";

export const Computer = () => {
    const [comp, setComp] = useState<GetComputerResponse|undefined>(undefined);
    useEffect(() => {
        void loadComputer();
    }, []);
    const loadComputer = async () => {
        try {
            const res = await xctf.getComputer({});
            setComp(res);
        } catch (e: any) {
            toast.error(e.toString());
        }
    }
    if (!comp) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div>
            {comp.loading ? (
                <div className={"flex flex-col text-center"}>
                    <div className="loading loading-spinner loading-lg"></div>
                    <span>Setting up computer...</span>
                </div>
            ) : (
                <iframe className={"h-screen w-full"} src={comp.url} />
            )}
        </div>
    );
}