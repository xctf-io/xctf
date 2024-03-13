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
                    <span>There is someone who is working on making sure you have a computer. Go back to solving challenges and check back here later. If you have been waiting for like 30 minutes for a computer, it is reasonable to let someone know.</span>
                </div>
            ) : (
                <iframe className={"h-screen w-full"} src={comp.url} />
            )}
        </div>
    );
}