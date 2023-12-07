import React, {useEffect, useRef} from 'react'
import {
    Button,
    Spinner,
    Dropdown,
    Input,
    Card,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    CardHeader, CardFooter
} from "@nextui-org/react";
import {GRPCInputFormProps, ProtobufMessageForm} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {useForm} from "react-hook-form";
import { xctf } from '@/service';
import {Competition, CompetitionList, Graph, Node} from "@/rpc/chalgen/graph_pb";
import {toast} from "react-toastify";
import {removeUndefinedFields} from "@/util/object";
import { Meta } from '@/rpc/chals/config_pb';

export const Competitions: React.FC = () => {
    return (
        <Edit />
    )
}

const Edit: React.FC = () => {
    const [nodeInfo, setNodeInfo] = React.useState<any>(null);
    const [selectedCompetition, setSelectedCompetition] = React.useState<Competition|undefined>(undefined);
    const [competitionList, setCompetitionList] = React.useState<CompetitionList|null>(null);
    const [competitionName, setCompetitionName] = React.useState<string>('');
    const [active, setActive] = React.useState<boolean>(false);
    const [currentChallenge, setCurrentChallenge] = React.useState<Node|undefined>(undefined);
    const [preview, setPreview] = React.useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const reloadIframe = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.location.reload();
        }
    };

    const loadCompetitions = async () => {
        try {
            const res = await xctf.getCompetitions({});
            setCompetitionList(res);
            if (res.competitions.length > 0) {
                setSelectedCompetition(res.competitions[0]);
                setCompetitionName(res.competitions[0].name);
                setActive(res.competitions[0].active)
            }
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }

    useEffect(() => {
        (async () => {
            const res = await xctf.challengeType({});
            setNodeInfo(res);
        })();
        void loadCompetitions();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        resetField,
    } = useForm({
        values: {
            data: new Node({
                meta: new Meta().toJson() as any,
            }).toJson() as any,
        },
    });

    const removeNode = async (id: string) => {
        void updateCompetition(new Graph({
            nodes: selectedCompetition?.graph?.nodes.reduce((acc, n) => {
                if (n.meta?.id !== id) {
                    return [...acc, n];
                }
                return acc;
            }, [] as Node[]) || [],
            edges: [],
        }));
    }

    const saveNode = async (node: Node) => {
        const updatedNodes = selectedCompetition?.graph?.nodes.reduce((acc, n) => {
            if (n.meta?.id === node.meta?.id) {
                return [...acc, node];
            }
            return [...acc, n];
        }, [] as Node[]) || [node];
        const newNodes = updatedNodes.some((n) => n.meta?.id === node.meta?.id) ? updatedNodes : [...updatedNodes, node];
        await updateCompetition(new Graph({
            nodes: newNodes,
            edges: [],
        }));
        reloadIframe();
    }

    const updateCompetition = async (g: Graph) => {
        const c = new Competition({
            id: selectedCompetition?.id || '',
            name: competitionName || '',
            graph: g,
            active: active,
        });
        console.log('updating competition', c);
        setSelectedCompetition(c);
        try {
            const res = await xctf.updateCompetition(c);
            console.log(res);
            toast.success('Saved!');
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }

    const onSubmit = async (data: any) => {
        // TODO breadchris these fields are being set to an empty array by default, not sure how this is happening, has to be in react-hook-form
        removeUndefinedFields(data.data)
        let d = data.data;
        console.log('data', d);
        if (Array.isArray(d.id)) {
            delete d.id;
        }
        if (Array.isArray(d.name)) {
            delete d.name;
        }
        if (Array.isArray(d.meta.flag)) {
            toast.error('Please enter a flag');
            return;
        }
        if (Array.isArray(d.challenge)) {
            delete d.challenge;
        }
        console.log('updated node', d)
        try {
            await saveNode(Node.fromJson(d));
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    };

    const onCompDelete = async () => {
        if (!selectedCompetition) {
            toast.error('No competition selected');
            return;
        }
        try {
            const res = await xctf.deleteCompetition({
                id: selectedCompetition?.id,
            });
            console.log(res);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
        void loadCompetitions();
    }

    const selectChallenge = (n: Node) => {
        setCurrentChallenge(n);
        const ser = n.toJson();
        console.log(ser)
        if (!ser) {
            return;
        }
        //@ts-ignore
        setValue('data', ser);
    }

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
            resetField,
        }
        return (
            <ProtobufMessageForm {...inputFormProps} />
        );
    }

    const nodeView = (n: Node) => {
        if (!n.meta?.id) {
            return null;
        }
        const url = (
            <a href={`/play/${selectedCompetition?.id}/${n.meta?.id}`}>View</a>
        )
        switch (n.challenge.case) {
        case 'base':
            const t = n.challenge.value;
            switch (t.type.case) {
            case 'twitter':
                return url;
            case 'pcap':
                return url;
            }
            return null;
        case 'python':
            return url;
        }
        return null;
    }

    const togglePreview = () => {
        setPreview(!preview);
    }

    const newCompetition = () => {
        setSelectedCompetition(undefined);
        setActive(false);
        setCompetitionName('');
    }

    const newChallenge = () => {
        selectChallenge(new Node({}));
    }

    return (
        <>
            <div className="mx-[3vw] lg:mx-[6vw] mt-8">
                <div className={"flex flex-row space-x-4"}>
                    {competitionList ? (
                        <>
                            {competitionList.competitions.length === 0 ? (
                                <p>No competitions yet</p>
                            ) : (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>Select Competition</Button>
                                    </DropdownTrigger>
                                    <DropdownMenu onAction={(id ) => {
                                        const c = competitionList.competitions.find((c) => c.id === id);
                                        if (!c) {
                                            return;
                                        }
                                        setSelectedCompetition(c)
                                        setCompetitionName(c.name)
                                    }}>
                                        {competitionList.competitions.map((c) => {
                                            return (
                                                <DropdownItem key={c.id}>
                                                    {c.name}
                                                </DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <Button onClick={newCompetition}>
                        New Competition
                    </Button>
                </div>
                <div className={"flex flex-row"}>
                    <div className={"flex-4"}>
                        <Input label={"name"} value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} />
                        <label>
                            <input aria-label={"active"} type={"checkbox"} checked={active} onChange={(e) => setActive(e.target.checked)} />
                            active
                        </label>
                        <table>
                            <thead>
                                <tr>
                                    <td>Challenges</td>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCompetition && selectedCompetition.graph ? (
                                    <>
                                        {selectedCompetition.graph.nodes.map((n) => (
                                            <tr key={n.meta?.id}>
                                                <td>
                                                    <Card className={"cursor-pointer"}>
                                                        <CardHeader onClick={() => selectChallenge(n)}>
                                                            {n.meta?.name}{currentChallenge?.meta?.id === n.meta?.id ? ' (editing)' : ''}
                                                        </CardHeader>
                                                        <CardFooter>
                                                            <Button size={"sm"} color={"danger"} onClick={() => removeNode(n.meta?.id || '')}>Remove</Button>
                                                        </CardFooter>
                                                    </Card>
                                                </td>
                                            </tr>
                                        ))}
                                        <Button onClick={newChallenge}>New</Button>
                                    </>
                                ) : (
                                    <tr>
                                        <td>No Competition Selected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={"flex-8"}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2 p-3">
                                {form()}
                            </div>
                            <div className={"flex flex-row space-x-4"}>
                                <Button color={'secondary'} onClick={togglePreview}>
                                    Preview
                                </Button>
                                <Button type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                {preview && (
                    <div className={"flex flex-row"}>
                        <iframe ref={iframeRef} style={{width: '100%', height: 200}} src={`/play/${selectedCompetition?.id}/${currentChallenge?.meta?.id}`} />
                    </div>
                )}
                <div className={"flex flex-row"}>
                    <Button color={"danger"} onClick={onCompDelete}>Delete Competition</Button>
                </div>
            </div>
        </>
    )
}