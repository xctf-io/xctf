import React, { useCallback } from "react";
import { ctfg } from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import {
	Text,
	Input,
	Button,
	Checkbox,
	Modal,
	Row,
	theme,
} from "@nextui-org/react";
import dagre from "dagre";
import Menu from "../components/Menu";
import { HiPaperAirplane } from "react-icons/hi2";
import {
	createSuccessToast,
	createErrorToast,
	createCelebrateToast,
} from "../store/user";
import useDarkMode from "use-dark-mode";

let evidence: string = "";
let report: string = "";

export default function MyComponent() {
	const darkMode = useDarkMode(false);
	const [graph, setGraph] = useState<GetDiscoveredEvidenceResponse>({
		report: "",
		connections: [],
		evidence: [],
	});
	const [submittingFlag, setSubmittingFlag] = useState<boolean>(true);

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
		return [nodes, edges];
	};

	async function loadDiscoveredEvidence() {
		try {
			const resp = await ctfg.GetDiscoveredEvidence({});
			graphRef.current = resp;
			setGraph(resp);
			const tempNodes = resp.evidence.map((e) => {
				return {
					id: e.id.toString(),
					data: { label: e.isFlag ? e.name + "🏳️" : e.name },
					position: {
						x: e.x,
						y: e.y,
					},
					style: {
						background: e.isFlag
							? theme.colors.primaryLight.toString()
							: theme.colors.accents1.toString(),
						borderColor: e.isFlag
							? theme.colors.primaryBorder.toString()
							: theme.colors.accents4.toString(),
						color: theme.colors.text.toString(),
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
		} catch (e) {
			createErrorToast(e, darkMode.value);
		}
	}

	useEffect(() => {
		loadDiscoveredEvidence();
	}, []);

	const initialNodes = graph.evidence.map((e) => {
		return {
			id: e.id.toString(),
			data: { label: e.isFlag ? e.name + "🏳️" : e.name },
			position: {
				x: e.x,
				y: e.y,
			},
			style: {
				background: e.isFlag
					? theme.colors.primaryLight.toString()
					: theme.colors.accents1.toString(),
				borderColor: e.isFlag
					? theme.colors.primaryBorder.toString()
					: theme.colors.accents4.toString(),
				color: theme.colors.text.toString(),
			},
		};
	});
	const [nodes, setNodes] = useState(initialNodes);
	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);

	function submitEvidence(remove: boolean) {
		ctfg
			.SubmitEvidence({
				evidence: evidence,
				x: 100,
				y: 100,
				isFlag: submittingFlag && !remove,
				remove: remove,
			})
			.then((resp) => {
				console.log(resp);
				loadDiscoveredEvidence().then(() => {
					if (remove) {
						createSuccessToast("Removed evidence!", darkMode.value);
					} else if (submittingFlag) {
						createCelebrateToast("You got a flag!", darkMode.value);
					} else {
						createSuccessToast("Submitted evidence!", darkMode.value);
					}
				});
			})
			.catch((e) => {
				createErrorToast(e.toString(), darkMode.value);
			});
	}

	function submitConnection(src: number, dst: number, remove?: boolean) {
		ctfg
			.SubmitEvidenceConnection({
				source: src,
				destination: dst,
				remove: remove,
			})
			.then((resp) => {
				loadDiscoveredEvidence().then(() => {
					if (remove) {
						createSuccessToast("Removed connection!", darkMode.value);
					} else {
						createSuccessToast("Created connection!", darkMode.value);
					}
				});
			})
			.catch((e) => {
				createErrorToast(e.toString(), darkMode.value);
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
	const [edges, setEdges] = useState(initialEdges);
	const onEdgesChange = useCallback(
		(changes) =>
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
		(params) =>
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
	const [deleteNode, setDeleteNode] = useState<Node>();
	const onNodesDelete = useCallback(
		(deleted) => {
			setVisible2(true);
			setDeleteNode(deleted[0]);
		},
		[nodes, edges]
	);

	const [visible, setVisible] = useState(false);
	const closeHandler = () => setVisible(false);
	const openHandler = () => setVisible(true);
	const [visible2, setVisible2] = useState(false);
	const closeHandler2 = () => setVisible2(false);

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
					height: "calc(100vh - 80px)",
				}}
			>
				<Menu openModal={openHandler} />
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
				<Modal
					open={visible}
					onClose={closeHandler}
					title="Add Evidence"
					aria-labelledby="modal-title"
				>
					<Modal.Header>
						<h3 id="modal-title">Add Evidence</h3>
					</Modal.Header>
					<Modal.Body>
						<Input
							type="text"
							clearable
							bordered
							fullWidth
							placeholder="Evidence"
							color="primary"
							onChange={(e) => (evidence = e.target.value)}
							size="lg"
						/>
						<Row justify="space-between">
							<Checkbox
								isSelected={submittingFlag}
								onChange={setSubmittingFlag}
							>
								<Text size={14}>Flag?</Text>
							</Checkbox>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button auto flat color="error" onPress={closeHandler}>
							Close
						</Button>
						<Button
							auto
							onPress={() => {
								closeHandler();
								submitEvidence(false);
							}}
							iconRight={<HiPaperAirplane fill="currentColor" />}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					open={visible2}
					onClose={closeHandler2}
					title="Are you sure?"
					aria-labelledby="modal-title"
					blur
				>
					<Modal.Header>
						<h3 id="modal-title">
							Are you sure you want to delete this evidence?
						</h3>
					</Modal.Header>
					<Modal.Body>
						<Text className="text-center"> This action cannot be undone.</Text>
					</Modal.Body>
					<Modal.Footer>
						<Button
							auto
							color="error"
							onPress={() => {
								closeHandler2();
								window.location.reload();
							}}
						>
							No
						</Button>
						<Button
							auto
							onPress={() => {
								closeHandler2();
								const id = Number(deleteNode["id"]);
								for (let i = 0; i < graph.evidence.length; i++) {
									if (graph.evidence[i]["id"] === id) {
										evidence = graph.evidence[i]["name"];
										submitEvidence(true);
										break;
									}
								}
							}}
							color="success"
						>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
}
