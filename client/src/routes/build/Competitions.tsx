import React, {useEffect, useRef, useState} from 'react'
import {GRPCInputFormProps, ProtobufMessageForm} from "@/components/ProtobufFormSimple/ProtobufMessageForm";
import {useForm} from "react-hook-form";
import {xctf, xctfAdmin} from '@/service';
import {Competition, CompetitionList, Graph, Node} from "@/rpc/chalgen/graph_pb";
import {removeUndefinedFields} from "@/util/object";
import { Meta } from '@/rpc/chals/config_pb';
import {Spinner} from "@/components/Spinner";
import {FileManager} from "@/routes/build/FileManager";
import toast from "react-hot-toast";
import {generateUUID} from "@/util/uuid";
import {
    Bars3Icon,
    DocumentArrowDownIcon,
    DocumentPlusIcon,
    DocumentTextIcon,
    PlusIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import {Save} from "lucide-react";
import {copyTextToClipboard} from "@/util/copy";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

export const Competitions: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<string|undefined>(undefined);
    const [curComp, setCurComp] = React.useState<Competition|undefined>(undefined);
    const [competitionList, setCompetitionList] = React.useState<CompetitionList|null>(null);
    const [yaml, setYaml] = useState('');

    const tabs = ['edit', 'upload', 'image'];

    const loadCompetitions = async () => {
        try {
            const res = await xctf.getCompetitions({});
            setCompetitionList(res);
            if (res.competitions.length > 0) {
                setCurComp(res.competitions[0]);
            }
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            void updateCompetition()
        }, 1000);
        return () => {
            clearTimeout(handler);
        }
    }, [curComp]);

    const updateCompetition = async () => {
        if (!curComp?.graph) {
            return;
        }
        console.log('updating competition', curComp);
        try {
            const res = await xctf.updateCompetition(curComp);
            toast.success('Saved!');
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }

    useEffect(() => {
        void loadCompetitions();
    }, []);

    const newCompetition = async () => {
        setCurComp(new Competition({
            name: 'demo',
            graph: new Graph({}),
        }));
        await updateCompetition();
        await loadCompetitions();
    }

    const importCompetition = async () => {
        try {
            setCurComp(Competition.fromJsonString(yaml));
        } catch (e: any) {
            toast.error(e.toString());
        }
        closeEvidenceModal();
    }

    const onCompDelete = async () => {
        if (!curComp) {
            toast.error('No competition selected');
            return;
        }
        if (curComp.active) {
            toast.error('Competition must not be active before deleting.')
            return;
        }
        try {
            const res = await xctf.deleteCompetition({
                id: curComp?.id,
            });
            console.log(res);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
        void loadCompetitions();
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        if (!activeTab) {
            const tab = url.searchParams.get('tab');
            if (tab && tabs.includes(tab)) {
                setActiveTab(tab);
            } else {
                setActiveTab(tabs[0]);
            }
        } else {
            url.searchParams.set('tab', activeTab);
            window.history.replaceState({}, '', url.toString());
        }
    }, [activeTab]);

    const openEvidenceModal = () => {
        (
            document.getElementById("import-modal") as HTMLDialogElement
        ).showModal();
    };
    const closeEvidenceModal = () => {
        (document.getElementById("import-modal") as HTMLDialogElement).close();
    };

    return (
        <div className={"mx-8 space-y-6"}>
            <div className="w-full tabs tabs-bordered my-6">
                {tabs.map((tab, index) => (
                    <a
                        className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                        key={index}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </a>
                ))}
            </div>
            {activeTab === 'image' && (
                <iframe className={"w-full h-screen"} src={"https://viliusle.github.io/miniPaint/"} />
            )}
            {activeTab === 'edit' && (
                <>
                    <div className={"flex flex-row space-x-2"}>
                        <p>Competitions</p>
                        <DocumentPlusIcon onClick={newCompetition} className={"h-6 w-6 mouse-pointer"} />
                        <DocumentArrowDownIcon onClick={openEvidenceModal} className={"h-6 w-6 mouse-pointer"} />
                    </div>
                    <dialog
                        id="import-modal"
                        aria-labelledby="modal-title"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <h3 id="modal-title" className="font-bold text-xl">
                                import competition
                            </h3>
                            <textarea className="textarea textarea-bordered w-full h-72" value={yaml} onChange={(e) => {
                                setYaml(e.target.value);
                            }} placeholder="json"></textarea>
                            <div className="modal-action">
                                <button
                                    onClick={importCompetition}
                                    className="btn btn-primary"
                                >
                                    import
                                </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </div>
                    </dialog>
                    <div className={"flex flex-row space-x-4"}>
                        {competitionList ? (
                            <>
                                {competitionList.competitions.length === 0 ? (
                                    <p>No competitions yet</p>
                                ) : (
                                    <details className={"dropdown"}>
                                        <summary className={"m-1 btn"}>
                                            <Bars3Icon className={"h-6 w-6"} />
                                        </summary>
                                        <ul className={"p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"}>
                                            {competitionList.competitions.map((c) => {
                                                return (
                                                    <li key={c.id} onClick={() => {
                                                        setCurComp(c)
                                                    }}>
                                                        {c.name}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </details>
                                )}
                            </>
                        ) : (
                            <Spinner />
                        )}
                        <input type={"text"} className={"input"} value={curComp?.name||''} onChange={(e) => {
                            setCurComp(new Competition({
                                ...curComp,
                                name: e.target.value,
                            }))
                        }} />
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">active</span>
                                <input type="checkbox" className="toggle" checked={curComp?.active||false} onChange={(e) => {
                                    setCurComp(new Competition({
                                        ...curComp,
                                        active: e.target.checked,
                                    }))
                                }} />
                            </label>
                        </div>
                        <button className={"btn btn-error justify-items-end"} onClick={onCompDelete}>
                            <TrashIcon className={"h-6 w-6"} />
                        </button>
                    </div>
                    <div className={"flex flex-row"}>
                    </div>
                    {curComp && <Edit comp={curComp} onUpdate={setCurComp} />}
                </>
            )}
            {activeTab === 'upload' && <FileManager />}
        </div>
    )
}

const Edit: React.FC<{
    comp: Competition,
    onUpdate: (comp: Competition) => void,
}> = ({comp, onUpdate}) => {
    const [nodeInfo, setNodeInfo] = React.useState<any>(null);
    const [curChal, setCurChal] = React.useState<Node|undefined>(undefined);
    const [preview, setPreview] = React.useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [yaml, setYaml] = useState('');
    const [yamlErrors, setYamlErrors] = useState<string|undefined>(undefined);

    const [activeTab, setActiveTab] = React.useState<string>('form');
    const tabs = ['form', 'yaml'];

    useEffect(() => {
        if (activeTab === 'yaml') {
            void loadYaml();
        }
    }, [activeTab]);

    useEffect(() => {
        void loadYaml();
    }, [curChal]);

    const loadYaml = async () => {
        if (!curChal) {
            return;
        }
        try {
            const res = await xctfAdmin.exportChallenge(curChal);
            setYaml(res.yaml);
        } catch (e: any) {
            toast.error(e.toString());
        }
    }

    useEffect(() => {
        (async () => {
            const res = await xctf.challengeType({});
            setNodeInfo(res);
        })();
    }, []);

    const reloadIframe = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.location.reload();
        }
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        resetField,
        watch,
    } = useForm({
        values: {
            data: new Node({
                meta: new Meta().toJson() as any,
            }).toJson() as any,
        },
    });

    // TODO breadchris loops
    // const formValues = watch();
    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         void onSubmit(formValues);
    //     }, 2000);
    //     return () => {
    //         clearTimeout(handler);
    //     }
    // }, [formValues]);

    const removeNode = async (id: string) => {
        console.log(id, comp.graph?.nodes)
        onUpdate(new Competition({
            ...comp,
            graph: new Graph({
                nodes: comp.graph?.nodes.reduce((acc, n) => {
                    if (n.meta?.id !== id) {
                        return [...acc, n];
                    }
                    return acc;
                }, [] as Node[]) || [],
                edges: [],
            })
        }));
    }

    const saveNode = async (node: Node) => {
        const updatedNodes = comp.graph?.nodes.reduce((acc, n) => {
            if (n.meta?.id === node.meta?.id) {
                return [...acc, node];
            }
            return [...acc, n];
        }, [] as Node[]) || [node];
        const newNodes = updatedNodes.some((n) => n.meta?.id === node.meta?.id) ? updatedNodes : [...updatedNodes, node];
        onUpdate(new Competition({
            ...comp,
            graph: new Graph({
                nodes: newNodes,
                edges: [],
            })
        }));
        reloadIframe();
    }

    const saveYaml = async () => {
        try {
            const res = await xctfAdmin.importChallenge({
                yaml: yaml,
            });
            if (res.chal) {
                selectChallenge(res.chal);
                await saveNode(res.chal);
            }
        } catch (e: any) {
            setYamlErrors(e.toString);
            toast.error(e.toString());
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
            await loadYaml();
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    };

    const selectChallenge = (n: Node) => {
        setCurChal(n);
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
            <a href={`/play/${comp.id}/${n.meta?.id}`}>View</a>
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

    const newChallenge = () => {
        selectChallenge(new Node({
            meta: {
                id: generateUUID(),
                name: "new challenge"
            }
        }));
    }

    const playLink = `/play/${comp.id}/${curChal?.meta?.id}`;

    const exportChallenge = async () => {
        if (!curChal) {
            return;
        }
        try {
            const res = await xctfAdmin.exportChallenge(curChal);
            copyTextToClipboard(res.yaml)
        } catch (e: any) {
            toast.error(e.toString());
        }
    }

    return (
        <>
            <div className="mt-8">
                <div className={"flex flex-row"}>
                    <div className={"flex-4"}>
                        {comp.graph ? (
                            <div className={"flex flex-col"}>
                                <ul className={"menu bg-base-200 w-56 rounded-box"}>
                                    {comp.graph.nodes.map((n) => (
                                        <li key={n.meta?.id}>
                                            <a onClick={() => selectChallenge(n)}>
                                                {n.meta?.name}{curChal?.meta?.id === n.meta?.id ? ' (editing)' : ''}
                                            </a>
                                        </li>
                                    ))}
                                    <button className={"btn btn-primary"} onClick={newChallenge}>New</button>
                                </ul>
                            </div>
                        ) : (
                            <p>No Competition Selected</p>
                        )}
                    </div>
                    {curChal && (
                        <div className={"flex-8"}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-2 p-3">
                                    <div className={"flex flex-row space-x-4"}>
                                        <p>{curChal.meta?.name}</p>
                                        <button className={"btn btn-info"} type="submit">
                                            <Save />
                                        </button>
                                    </div>
                                    <label className={"text-sm text-gray-600 cursor-pointer"} onClick={() => copyTextToClipboard(`{{ index .Challenges "${curChal.meta?.name}" }}`)}>
                                        {`{{ index .Challenges "${curChal.meta?.name}" }}`}
                                    </label>
                                    <div className="w-full tabs tabs-bordered my-6">
                                        {tabs.map((tab, index) => (
                                            <a
                                                className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                                                key={index}
                                                onClick={() => setActiveTab(tab)}
                                            >
                                                {tab}
                                            </a>
                                        ))}
                                    </div>
                                    <div className={"h-96 overflow-y-scroll"}>
                                        {activeTab === 'form' && form()}
                                        {activeTab === 'yaml' && (
                                            <>
                                                {yamlErrors && <p>{yamlErrors}</p>}
                                                <textarea className="textarea textarea-bordered w-full h-72" value={yaml} onChange={(e) => {
                                                    setYaml(e.target.value);
                                                }} placeholder="yaml"></textarea>
                                                <button className={"btn"} onClick={saveYaml}>save</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className={"flex flex-row space-x-4"}>
                                    <button className={"btn"} onClick={reloadIframe}>reload</button>
                                    <button className={"btn"} onClick={togglePreview}>
                                        Preview
                                    </button>
                                    <a className={"btn"} href={playLink}>Open</a>
                                    <button className={"btn"} onClick={exportChallenge}>
                                        Export
                                    </button>
                                    <a className={"btn btn-error"} onClick={() => removeNode(curChal.meta?.id || '')}>
                                        Remove
                                    </a>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                {preview && (
                    <div className={"flex flex-row"}>
                        <iframe ref={iframeRef} className={"h-96 w-full"} src={playLink} />
                    </div>
                )}
            </div>
        </>
    )
}