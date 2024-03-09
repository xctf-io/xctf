import { xctf } from '@/service';
import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";

export const Computer = () => {
    const [comp, setComp] = useState<string|undefined>(undefined);
    useEffect(() => {
        void loadComputer();
    }, []);
    const loadComputer = async () => {
        try {
            const res = await xctf.getComputer({});
            setComp(res.url);
        } catch (e: any) {
            toast.error(e.toString());
        }
    }
    if (!comp) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div>
            <iframe className={"h-screen w-full"} src={comp} />
        </div>
    );
}