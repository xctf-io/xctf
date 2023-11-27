import React, {useEffect} from "react";
import {kubes} from "@/service";
import {Deployment} from "@/rpc/kubes/kubes_pb";
import {Button, Input} from "@nextui-org/react";
import {toast} from "react-toastify";

export const Manage: React.FC = () => {
    const [deployments, setDeployments] = React.useState<Deployment[]>([]);
    const [name, setName] = React.useState<string>('');
    useEffect(() => {
        (async () => {
            const res = await kubes.listDeployments({});
            setDeployments(res.deployments);
        })();
    }, []);
    const newDeployment = async () => {
        try {
            const res = await kubes.newDeployment({
                name,
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    const deleteDeployment = async (deploymentName: string) => {
        try {
            const res = await kubes.deleteDeployment({
                name: deploymentName,
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    return (
        <div className="mx-[3vw] lg:mx-[6vw] mt-8">
            <h1>Manage</h1>
            <h3>New</h3>
            <Input aria-label={"name"} placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <Button aria-label={"create"} onClick={newDeployment}>Create</Button>
            <hr />
            <ul>
                {deployments.map((d) => {
                    return (
                        <li key={d.id}>{d.name} <Button onClick={() => deleteDeployment(d.name)}>Delete</Button></li>
                    )
                })}
            </ul>
        </div>
    )
}
