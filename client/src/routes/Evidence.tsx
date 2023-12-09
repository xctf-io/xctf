import React, { useCallback } from "react";
import { xctf } from "../service";
import { GetDiscoveredEvidenceResponse } from "@/rpc/xctf/xctf_pb";
import ReactFlow, {
	Background,
	Connection,
	Controls,
	Edge,
	EdgeChange,
	MarkerType,
	NodeChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import dagre from "dagre";
import Menu from "../components/Menu";
import { HiPaperAirplane } from "react-icons/hi2";
import {
	createSuccessToast,
	createErrorToast,
	createCelebrateToast,
} from "../store/user";
import { useDarkMode } from "usehooks-ts";

let report = "";

export function Evidence() {
	const [evidence, setEvidence] = useState("");

	const { isDarkMode } = useDarkMode(false);
	const [graph, setGraph] = useState<GetDiscoveredEvidenceResponse>(
		new GetDiscoveredEvidenceResponse({
			report: "",
			connections: [],
			evidence: [],
		})
	);
	const [submittingFlag, setSubmittingFlag] = useState<boolean>(true);

	const graphRef: MutableRefObject<GetDiscoveredEvidenceResponse> =
		useRef<GetDiscoveredEvidenceResponse>(
			new GetDiscoveredEvidenceResponse({
				report: "",
				connections: [],
				evidence: [],
			})
		);

	const dagreGraph = new dagre.graphlib.Graph();
	const nodeWidth = 172;
	const nodeHeight = 36;
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	const getLayoutedElements = (nodes: any[], edges: any[]) => {
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
		return [nodes, edges];
	};

	async function loadDiscoveredEvidence() {
		try {
			const resp = await xctf.getDiscoveredEvidence({});
			graphRef.current = resp;
			setGraph(resp);
			const tempNodes = resp.evidence.map((e) => {
				return {
					id: e.id.toString(),
					data: { label: e.name },
					position: {
						x: e.x,
						y: e.y,
					},
					style: {
						background: e.isFlag
							? isDarkMode
								? "#002e62"
								: "#cce3fd"
							: isDarkMode
							? "#27272a"
							: "#f4f4f5",
						borderColor: e.isFlag
							? isDarkMode
								? "#005bc4"
								: "#66aaf9"
							: isDarkMode
							? "#52525b"
							: "#d4d4d8",
						color: isDarkMode ? "#ECEDEE" : "#11181C",
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
					color: "#4C5155",
				},
				style: {
					stroke: "#4C5155",
				},
			}));
			const [nodes, edges] = getLayoutedElements(tempNodes, tempEdges);
			setNodes(nodes);
			setEdges(edges);
			report = resp.report;
		} catch (e: any) {
			createErrorToast(e, isDarkMode);
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
			style: {
				background: e.isFlag
					? isDarkMode
						? "#002e62"
						: "#cce3fd"
					: isDarkMode
					? "#27272a"
					: "#f4f4f5",
				borderColor: e.isFlag
					? isDarkMode
						? "#005bc4"
						: "#66aaf9"
					: isDarkMode
					? "#52525b"
					: "#d4d4d8",
				color: isDarkMode ? "#ECEDEE" : "#11181C",
			},
		};
	});
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
		[]
	);

	function submitEvidence(remove: boolean, newEvidence: string) {
		xctf
			.submitEvidence({
				evidence: newEvidence,
				x: 100,
				y: 100,
				isFlag: submittingFlag && !remove,
				remove: remove,
			})
			.then((resp) => {
				console.log(resp);
				loadDiscoveredEvidence().then(() => {
					if (remove) {
						createSuccessToast("Removed evidence!", isDarkMode);
					} else if (submittingFlag) {
						createCelebrateToast("You got a flag!", isDarkMode);
					} else {
						createSuccessToast("Submitted evidence!", isDarkMode);
					}
				});
			})
			.catch((e) => {
				createErrorToast(e.toString(), isDarkMode);
			});
	}

	function submitConnection(src: number, dst: number, remove?: boolean) {
		xctf
			.submitEvidenceConnection({
				source: src,
				destination: dst,
				remove: remove,
			})
			.then((resp) => {
				loadDiscoveredEvidence().then(() => {
					if (remove) {
						createSuccessToast("Removed connection!", isDarkMode);
					} else {
						createSuccessToast("Created connection!", isDarkMode);
					}
				});
			})
			.catch((e) => {
				createErrorToast(e.toString(), isDarkMode);
			});
	}

	const initialEdges = graph.connections.map((c) => ({
		id: `${c.source}-${c.destination}`,
		source: c.source.toString(),
		target: c.destination.toString(),
		markerEnd: {
			type: MarkerType.ArrowClosed,
			width: 20,
			height: 20,
			color: "#4C5155",
		},
		style: {
			stroke: "#4C5155",
		},
	}));
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges((eds) => {
				if (changes[0].type === "remove" && changes.length === 1) {
					const ids = changes[0]["id"].split("-");
					submitConnection(Number(ids[0]), Number(ids[1]), true);
				}
				return applyEdgeChanges(changes, eds);
			}),
		[]
	);
	const onConnect = useCallback(
		(params: Edge | Connection) =>
			setEdges((eds) => {
				const exists = eds.find(
					(e) => e.source === params.source && e.target === params.target
				);
				if (!exists) {
					submitConnection(Number(params.source), Number(params.target), false);
				}
				return addEdge(params, eds);
			}),
		[]
	);

	const openEvidenceModal = () => {
		(
			document.getElementById("evidence-modal") as HTMLDialogElement
		).showModal();
	};
	const closeEvidenceModal = () => {
		(document.getElementById("evidence-modal") as HTMLDialogElement).close();
	};
	const openDeleteModal = () => {
		(document.getElementById("delete-modal") as HTMLDialogElement).showModal();
	};
	const closeDeleteModal = () => {
		(document.getElementById("delete-modal") as HTMLDialogElement).close();
	};

	const [deleteNode, setDeleteNode] = useState<Node>();
	const onNodesDelete = useCallback(
		(deleted: Node[]) => {
			openDeleteModal();
			setDeleteNode(deleted[0]);
		},
		[nodes, edges]
	);

	return (
		<>
			{/* <div className="mb-3">
				{successMsg && <Text color="success">{successMsg}</Text>}
				{errorMsg && <Text color="warning">{errorMsg}</Text>}
			</div> */}
			{/* <div class="mb-3">
        <label for="report">Report URL</label>
        <Button.Group class="w-full">
            <Input id="report" type="text" bind:value={$report} />
            <Button color="blue" on:click={saveReport}>Save</Button>
        </Button.Group>
    </div> */}
			<div
				className="w-screen flex flex-col"
				style={{
					height: "calc(100vh - 86px)",
				}}
			>
				<Menu openModal={openEvidenceModal} />
				<div className="h-full w-full relative">
					<ReactFlow
						nodes={nodes}
						onNodesChange={onNodesChange}
						edges={edges}
						onEdgesChange={onEdgesChange}
						onNodesDelete={onNodesDelete}
						onConnect={onConnect}
						fitView
					>
						<Background />
						<Controls
							position="top-left"
							style={{
								background: "white",
							}}
						></Controls>
					</ReactFlow>
				</div>
				<dialog
					id="evidence-modal"
					className="modal modal-bottom sm:modal-middle"
					role="dialog"
					aria-labelledby="modal-title"
				>
					<div className="modal-box">
						<h3 id="modal-title" className="font-bold text-2xl">
							Add Evidence
						</h3>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Evidence</span>
							</div>
							<input
								id="email"
								className="w-full input input-bordered"
								type="email"
								value={evidence}
								onChange={(e) => setEvidence(e.target.value)}
							/>
						</label>
						<div className="form-control mt-4">
							<label className="label cursor-pointer">
								<span className="label-text">Flag?</span>
								<input
									type="checkbox"
									checked={submittingFlag}
									className="checkbox checkbox-primary"
									onClick={() => setSubmittingFlag(!submittingFlag)}
								/>
							</label>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
						<div className="modal-action mt-0">
							<button
								className="btn btn-primary"
								onClick={() => {
									closeEvidenceModal();
									submitEvidence(false, evidence);
								}}
							>
								Submit
								<HiPaperAirplane fill="currentColor" />
							</button>
							<form method="dialog">
								<button className="btn">Close</button>
							</form>
						</div>
					</div>
				</dialog>
				<dialog
					id="delete-modal"
					aria-labelledby="modal-title"
					className="modal modal-bottom sm:modal-middle"
				>
					<div className="modal-box">
						<h3 id="modal-title" className="font-bold text-xl">
							Are you sure you want to delete this evidence?
						</h3>

						<p>This action cannot be undone.</p>
						<div className="modal-action">
							<button
								onClick={() => {
									closeEvidenceModal();
									const id = Number(deleteNode?.id);
									for (let i = 0; i < graph.evidence.length; i++) {
										if (graph.evidence[i]["id"] === id) {
											submitEvidence(true, graph.evidence[i]["name"]);
											break;
										}
									}
								}}
								className="btn btn-primary"
							>
								Yes
							</button>
							<button
								className="btn btn-error"
								onClick={() => {
									closeDeleteModal();
									window.location.reload();
								}}
							>
								No
							</button>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
					</div>
				</dialog>
			</div>
		</>
	);
}
