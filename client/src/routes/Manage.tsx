import React, {useEffect} from "react";
import {kubes} from "@/service";
import {Deployment} from "@/rpc/kubes/kubes_pb";
import {Button, Input} from "@nextui-org/react";

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
        const res = await kubes.newDeployment({
            name,
        });
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
                        <li key={d.id}>{d.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}
