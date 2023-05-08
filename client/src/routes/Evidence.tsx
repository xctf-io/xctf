import React, { useCallback } from "react";
import { ctfg } from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	MiniMap,
	applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Text, Input, Dropdown, Button, Checkbox } from "@nextui-org/react";
import dagre from "dagre";
import DownloadButton from "../components/DownloadButton";
import { HiPaperAirplane, HiTrash, HiLink } from "react-icons/hi2";

let evidence: string = "";
let report: string = "";

export default function MyComponent() {
	const [graph, setGraph] = useState<GetDiscoveredEvidenceResponse>({
		report: "",
		connections: [],
		evidence: [],
	});
	const [successMsg, setSuccessMsg] = useState<string | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [submittingFlag, setSubmittingFlag] = useState<boolean>(true);
	const [source, setSource] = useState<number>(0);
	const [destination, setDestination] = useState<number>(0);
	const [sourceName, setSourceName] = useState<string>("");
	const [destinationName, setDestinationName] = useState<string>("");
	const updateSourceSelect = (e) => {
		setSource(Number(e.anchorKey));
		for (let i = 0; i < graph.evidence.length; i++) {
			if (graph.evidence[i].id === Number(e.anchorKey)) {
				setSourceName(graph.evidence[i].name);
				break;
			}
		}
	};
	const updateDestinationSelect = (e) => {
		setDestination(Number(e.anchorKey));
		for (let i = 0; i < graph.evidence.length; i++) {
			if (graph.evidence[i].id === Number(e.anchorKey)) {
				setDestinationName(graph.evidence[i].name);
				break;
			}
		}
	};

	const graphRef: MutableRefObject<GetDiscoveredEvidenceResponse> =
		useRef<GetDiscoveredEvidenceResponse>({
			report: "",
			connections: [],
			evidence: [],
		});

	const dagreGraph = new dagre.graphlib.Graph();
	const nodeWidth = 172;
	const nodeHeight = 36;
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	const getLayoutedElements = (nodes, edges) => {
		dagreGraph.setGraph({ rankdir: "TB" });
		nodes.forEach((node) => {
			dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
		});
		edges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});
		dagre.layout(dagreGraph);

		nodes.forEach((node) => {
			const n = dagreGraph.node(node.id);
			node.targetPosition = "top";
			node.sourcePosition = "bottom";
			node.position = {
				x: n.x - nodeWidth / 2,
				y: n.y - nodeHeight / 2,
			};
		});
		return { nodes, edges };
	};

	async function loadDiscoveredEvidence() {
		try {
			const resp = await ctfg.GetDiscoveredEvidence({});
			graphRef.current = resp;
			setGraph(resp);
			setSource(resp.evidence[0].id);
			setSourceName(resp.evidence[0].name);
			setDestination(resp.evidence[0].id);
			setDestinationName(resp.evidence[0].name);
			const tempNodes = resp.evidence.map((e) => {
				return {
					id: e.id.toString(),
					data: { label: e.name },
					position: {
						x: e.x,
						y: e.y,
					},
				};
			});
			const tempEdges = resp.connections.map((c) => ({
				id: `${c.source}-${c.destination}`,
				source: c.source.toString(),
				target: c.destination.toString(),
				markerEnd: {
					type: MarkerType.ArrowClosed,
					width: 20,
					height: 20,
				},
			}));
			const { nodes, edges } = getLayoutedElements(tempNodes, tempEdges);
			setNodes(nodes);
			setEdges(edges);
			report = resp.report; // report is not a state variable, so we update it directly
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		loadDiscoveredEvidence();
	}, []);

	const initialNodes = graph.evidence.map((e) => {
		return {
			id: e.id.toString(),
			data: { label: e.name },
			position: {
				x: e.x,
				y: e.y,
			},
		};
	});
	const [nodes, setNodes] = useState(initialNodes);
	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);

	const initialEdges = graph.connections.map((c) => ({
		id: `${c.source}-${c.destination}`,
		source: c.source.toString(),
		target: c.destination.toString(),
	}));
	const [edges, setEdges] = useState(initialEdges);

	function submitEvidence(remove: boolean) {
		ctfg
			.SubmitEvidence({
				evidence: evidence,
				x: 100,
				y: 100,
				isFlag: submittingFlag,
				remove: remove,
			})
			.then((resp) => {
				console.log(resp);
				loadDiscoveredEvidence().then(() => {
					setSuccessMsg("submitted evidence!");
				});
			})
			.catch((e) => {
				console.error(e);
				setErrorMsg(e);
			});
	}

	function submitConnection(remove?: boolean) {
		ctfg
			.SubmitEvidenceConnection({
				source: source,
				destination: destination,
				remove: remove,
			})
			.then((resp) => {
				loadDiscoveredEvidence().then(() => {
					setSuccessMsg("created connection!");
				});
			})
			.catch((e) => {
				setErrorMsg(e);
			});
	}

	async function saveReport() {
		try {
			const resp = await ctfg.SubmitEvidenceReport({
				url: report,
			});
			setSuccessMsg("saved report!");
		} catch (e) {
			setErrorMsg(e);
		}
	}

	return (
		<>
			{/* <div className="mb-3">
				{successMsg && <Text color="success">{successMsg}</Text>}
				{errorMsg && <Text color="warning">{errorMsg}</Text>}
			</div> */}
			{/* <div class="mb-3">
        <label for="report">Report URL</label>
        <ButtonGroup class="w-full">
            <Input id="report" type="text" bind:value={$report} />
            <Button color="blue" on:click={saveReport}>Save</Button>
        </ButtonGroup>
    </div> */}
			<div
				className="max-w-2xl flex flex-col"
				style={{
					height: "calc(100vh - 80px)",
				}}
			>
				<div className="grid grid-cols-3 px-12 w-screen flex-1">
					<div className="col-span-1 flex flex-col gap-2 items-center mt-16">
						<h2>Evidence</h2>
						<div className="grid grid-cols-2 gap-x-4">
							<Text>Evidence</Text>
							<Text>Flag?</Text>
							<Input
								type="text"
								onChange={(e) => (evidence = e.target.value)}
								size="lg"
							/>
							<Checkbox
								isSelected={submittingFlag}
								onChange={setSubmittingFlag}
							/>
							<Button
								className="mt-4"
								onPress={() => submitEvidence(false)}
								iconRight={<HiPaperAirplane fill="currentColor" />}
							>
								Submit
							</Button>
							<Button
								className="mt-4"
								color="error"
								onPress={() => submitEvidence(true)}
								iconRight={<HiTrash fill="currentColor" />}
							>
								Delete
							</Button>
						</div>
						{graph.evidence && graph.evidence.length > 0 && (
							<>
								<h2 className="mt-16">Connections</h2>
								<div className="grid grid-cols-2 gap-x-4">
									<Text>Source</Text>
									<Text>Destination</Text>
									<Dropdown>
										<Dropdown.Button flat color="secondary">
											{sourceName}
										</Dropdown.Button>
										<Dropdown.Menu
											aria-label="Source select"
											color="secondary"
											disallowEmptySelection
											selectionMode="single"
											onSelectionChange={updateSourceSelect}
										>
											{graph.evidence.map((e) => (
												<Dropdown.Item key={e.id}>{e.name}</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Dropdown>
									<Dropdown>
										<Dropdown.Button flat color="secondary">
											{destinationName}
										</Dropdown.Button>
										<Dropdown.Menu
											aria-label="Destination select"
											disallowEmptySelection
											selectionMode="single"
											onSelectionChange={updateDestinationSelect}
										>
											{graph.evidence.map((e) => (
												<Dropdown.Item key={e.id}>{e.name}</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Dropdown>
									<Button
										color="success"
										className="mt-4"
										onPress={() => submitConnection(false)}
										iconRight={<HiLink fill="currentColor" />}
									>
										Create
									</Button>
									<Button
										color="error"
										className="mt-4"
										onPress={() => submitConnection(true)}
										iconRight={<HiTrash fill="currentColor" />}
									>
										Delete
									</Button>
								</div>
							</>
						)}
					</div>
					<div className="col-span-2">
						{nodes.length > 0 && (
							<div className="mx-8 h-[95%] w-full relative top-1/2 -translate-y-1/2">
								<DownloadButton />
								<ReactFlow
									nodes={nodes}
									onNodesChange={onNodesChange}
									edges={edges}
									fitView
								>
									<Background />
									<Controls
										style={{
											background: "white",
										}}
									/>
								</ReactFlow>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
