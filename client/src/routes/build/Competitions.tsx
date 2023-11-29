import React, {useEffect, useRef} from 'react'
import {Button, Col, Row, Spinner, Dropdown, Table, Input, Card} from "@nextui-org/react";
import {GRPCInputFormProps, ProtobufMessageForm} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {useForm} from "react-hook-form";
import { xctf } from '@/service';
import {Competition, CompetitionList, Graph, Node} from "@/rpc/chalgen/chalgen_pb";
import {toast} from "react-toastify";

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
            data: {
                meta: {},
            },
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
        });
        console.log('updating competition', c);
        setSelectedCompetition(c);
        try {
            const res = await xctf.updateCompetition(c);
            console.log(res);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }

    const onSubmit = async (data: any) => {
        // TODO breadchris these fields are being set to an empty array by default, not sure how this is happening, has to be in react-hook-form
        let d = data.data;
        console.log('data', d);
        if (Array.isArray(d.id)) {
            delete d.id;
        }
        if (Array.isArray(d.name)) {
            delete d.name;
        }
        if (Array.isArray(d.flag)) {
            delete d.flag;
        }
        if (Array.isArray(d.challenge)) {
            delete d.challenge;
        }
        console.log('updated node', d)
        void saveNode(Node.fromJson(d));
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
        switch (n.challenge.case) {
        case 'twitter':
            return (
                <a href={`http://localhost:8000/play/${selectedCompetition?.id}/${n.meta?.id}`}>View</a>
            )
        }
        return null;
    }

    const togglePreview = () => {
        setPreview(!preview);
    }

    return (
        <>
            <div className="mx-[3vw] lg:mx-[6vw] mt-8">
                <Row>
                    {competitionList ? (
                        <>
                            {competitionList.competitions.length === 0 ? (
                                <p>No competitions yet</p>
                            ) : (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <Button>Select Competition</Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu onAction={(id ) => {
                                        const c = competitionList.competitions.find((c) => c.id === id);
                                        if (!c) {
                                            return;
                                        }
                                        setSelectedCompetition(c)
                                        setCompetitionName(c.name)
                                    }}>
                                        {competitionList.competitions.map((c) => {
                                            return (
                                                <Dropdown.Item key={c.id}>
                                                    {c.name}
                                                </Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <Button onClick={togglePreview}>
                        Preview
                    </Button>
                </Row>
                <Row>
                    <Col span={3}>
                        <Input label={"name"} value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} />
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
                                                        <Card.Header onClick={() => selectChallenge(n)}>
                                                            {n.name}{currentChallenge?.meta?.id === n.meta?.id ? ' (editing)' : ''}
                                                            {nodeView(n)}
                                                        </Card.Header>
                                                        <Card.Footer>
                                                            <Button size={"sm"} color={"error"} onClick={() => removeNode(n.meta?.id || '')}>Remove</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td>No Competition Selected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Col>
                    <Col span={9}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2 p-3">
                                {form()}
                            </div>
                            <Row>
                                <Button type="submit">
                                    Save
                                </Button>
                            </Row>
                        </form>
                    </Col>
                </Row>
                {preview && (
                    <Row>
                        <iframe ref={iframeRef} style={{width: '100%', height: 200}} src={`http://localhost:8000/play/${selectedCompetition?.id}/${currentChallenge?.meta?.id}`} />
                    </Row>
                )}
                <Row>
                    <Button color={"error"} onClick={onCompDelete}>Delete Competition</Button>
                </Row>
            </div>
        </>
    )
}