import React, {
	useEffect,
	useState,
	MutableRefObject,
	useRef,
	useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { xctfAdmin } from "../service";
import { createErrorToast, createSuccessToast } from "../store/user";
import {Button, theme, Input, Switch, useTheme, Textarea} from "@nextui-org/react";
import {
	TbArrowBigLeftFilled,
	TbArrowBigRightFilled,
	TbSend,
	TbGraphOff,
	TbGraph,
} from "react-icons/tb";
import Select from "react-select";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { HiPencilSquare } from "react-icons/hi2";

import { Position, Tooltip, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
	HighlightArea,
	MessageIcon,
	highlightPlugin,
	RenderHighlightTargetProps,
	RenderHighlightContentProps,
	RenderHighlightsProps,
} from "@react-pdf-viewer/highlight";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type {
	ToolbarSlot,
	TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

import { GetUserGraphResponse } from "@/rpc/xctf/xctf_pb";
import dagre from "dagre";
import ReactFlow, {
	Background,
	Controls,
	Edge,
	MarkerType,
	Node,
	NodeChange,
	applyNodeChanges,
} from "reactflow";
import { BsWindowSidebar } from "react-icons/bs";

interface Team {
	name: string;
	hasWriteup: boolean;
	score: number;
	grade: number;
}

interface Note {
	id: number;
	content: string;
	highlightAreas: HighlightArea[];
	quote: string;
}

ChartJS.register(ArcElement, Legend);

const ViewWriteup = () => {
	const [message, setMessage] = React.useState("");
	const [notes, setNotes] = React.useState<Note[]>([]);
	const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
	let noteId = notes.length;

	const noteEles: Map<number, HTMLElement> = new Map();

	const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
		<div
			style={{
				display: "flex",
				position: "absolute",
				left: `${props.selectionRegion.left}%`,
				top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
				transform: "translate(0, 8px)",
				zIndex: 1,
			}}
		>
			<Tooltip
				position={Position.TopCenter}
				target={
					<Button
						auto
						color="error"
						icon={<MessageIcon />}
						onPress={props.toggle}
					/>
				}
				content={() => <div style={{ width: "100px" }}>Add a note</div>}
				offset={{ left: 0, top: -8 }}
			/>
		</div>
	);

	const renderHighlightContent = (props: RenderHighlightContentProps) => {
		const addNote = () => {
			if (message !== "") {
				const note: Note = {
					id: ++noteId,
					content: message,
					highlightAreas: props.highlightAreas,
					quote: props.selectedText,
				};
				xctfAdmin.submitComment({
					username: name,
					id: note.id,
					content: note.content,
					areas: note.highlightAreas,
					quote: note.quote,
				});
				setNotes(notes.concat([note]));
				props.cancel();
			}
		};

		return (
			<div
				style={{
					background: "#fff",
					border: "1px solid rgba(0, 0, 0, .3)",
					borderRadius: "2px",
					padding: "8px",
					position: "absolute",
					left: `${props.selectionRegion.left}%`,
					top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
					zIndex: 1,
				}}
			>
				<div>
					<textarea
						rows={3}
						style={{
							border: "1px solid rgba(0, 0, 0, .3)",
						}}
						onChange={(e) => setMessage(e.target.value)}
					></textarea>
				</div>
				<div
					style={{
						display: "flex",
						marginTop: "8px",
					}}
				>
					<div style={{ marginRight: "8px" }}>
						<Button color="error" auto flat onPress={addNote}>
							Add
						</Button>
					</div>
					<Button auto disabled onPress={props.cancel}>
						Cancel
					</Button>
				</div>
			</div>
		);
	};

	const jumpToNote = (note: Note) => {
		activateTab(3);
		const notesContainer = notesContainerRef.current;
		if (noteEles.has(note.id) && notesContainer) {
			const scrollTop = noteEles?.get(note.id)?.getBoundingClientRect().top;
			if (scrollTop) {
				notesContainer.scrollTop = scrollTop;
			}
		}
	};

	const renderHighlights = (props: RenderHighlightsProps) => (
		<div>
			{notes.map((note) => (
				<React.Fragment key={note.id}>
					{note.highlightAreas
						.filter((area) => area.pageIndex === props.pageIndex)
						.map((area, idx) => (
							<div
								key={idx}
								style={Object.assign(
									{},
									{
										background: "yellow",
										opacity: 0.4,
									},
									props.getCssProperties(area, props.rotation)
								)}
								onClick={() => jumpToNote(note)}
							/>
						))}
				</React.Fragment>
			))}
		</div>
	);

	const highlightPluginInstance = highlightPlugin({
		renderHighlightTarget,
		renderHighlightContent,
		renderHighlights,
	});

	const { jumpToHighlightArea } = highlightPluginInstance;


	const sidebarNotes = (
		<div
			ref={notesContainerRef}
			className="w-full overflow-auto absolute"
		>
			{notes.length === 0 && (
				<div style={{ textAlign: "center" }}>There is no note</div>
			)}
			{notes.map((note) => {
				return (
					<div
						key={note.id}
						style={{
							borderBottom: "1px solid rgba(0, 0, 0, .3)",
							cursor: "pointer",
							padding: "8px",
						}}
						onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
						ref={(ref): void => {
							noteEles.set(note.id, ref as HTMLElement);
						}}
					>
						<blockquote
							style={{
								borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
								fontSize: ".75rem",
								lineHeight: 1.5,
								margin: "0 0 8px 0",
								paddingLeft: "8px",
								textAlign: "justify",
							}}
						>
							{note.quote.substring(0, 25)}...
						</blockquote>
						{note.content}
					</div>
				);
			})}
		</div>
	);

	const { name } = useParams();
	const [teams, setTeams] = useState<Team[]>([]);
	const [writeup, setWriteup] = useState("");
	const { type, isDark } = useTheme();
	const [numChallenges, setNumChallenges] = useState(0);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const toggleEditing = () => setIsEditing(!isEditing);
	const [grade, setGrade] = useState<number>(-1);

	const toolbarPluginInstance = toolbarPlugin();
	const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
	const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
		...slot,
		// These slots will be empty
		SwitchTheme: () => <></>,
		Open: () => <></>,
	});
	const defaultLayoutPluginInstance = defaultLayoutPlugin({
		sidebarTabs: (defaultTabs) => [
			{
				content: sidebarNotes,
				icon: <MessageIcon />,
				title: "Notes",
			},
		],
		renderToolbar: (toolbarSlot) => (
			<Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
		),
	});

	const { activateTab } = defaultLayoutPluginInstance;
	const [showChart, setShowChart] = useState<boolean>(false);
	async function getWriteup() {
		try {
			const wp = await xctfAdmin.getWriteup({ username: name });
			setWriteup(wp.content);
		} catch (error) {
			createErrorToast("User does not have a writeup", isDark);
		}
	}
	async function getTeams() {
		try {
			const resp = await xctfAdmin.getTeamsProgress({});
			const allChallenges = await xctfAdmin.getAllChallenges({});
			const teams = resp.teams.map((t) => ({
				name: t.teamName,
				hasWriteup: t.hasWriteup,
				score: t.score,
				grade: t.grade,
			}));
			setNumChallenges(allChallenges.challenges.length);
			teams.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
			setTeams(teams);
		} catch (error) {
			createErrorToast("Failed to get teams", isDark);
		}
	}
	const [graph, setGraph] = useState<GetUserGraphResponse>(new GetUserGraphResponse({
		connections: [],
		evidence: [],
	}));
	const graphRef: MutableRefObject<GetUserGraphResponse> =
		useRef<GetUserGraphResponse>(new GetUserGraphResponse({
			connections: [],
			evidence: [],
		}));

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
			const resp = await xctfAdmin.getUserGraph({
				username: name,
			});
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
							? theme.colors.errorLight.toString()
							: theme.colors.accents1.toString(),
						borderColor: e.isFlag
							? theme.colors.errorBorder.toString()
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
		} catch (e: any) {
			createErrorToast(e, isDark);
		}
	}

	async function getNotes() {
		const storedNotes = await xctfAdmin.getComments({ username: name });
		const notes = storedNotes.comments.map((n) => ({
			id: n.id,
			content: n.content,
			highlightAreas: n.areas,
			quote: n.quote,
		}));
		setNotes(notes);
	}

	useEffect(() => {
		getTeams();
		loadDiscoveredEvidence();
		getWriteup();
	}, [name]);

	useEffect(() => {
		getNotes();
	}, []);

	const [nodes, setNodes] = useState<Node[]>();
	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes((nds) => {
			if (nds != undefined) {
				return applyNodeChanges(changes, nds)
			}
		}),
		[]
	);
	const [edges, setEdges] = useState<Edge[]>();

	const index = teams.findIndex((t) => t.name === name);
	const chartData = {
		labels: ["Completed", "Remaining"],
		datasets: [
			{
				label: "Score",
				data: [teams[index]?.score, numChallenges - teams[index]?.score],
				backgroundColor: [
					isDark ? "#2B0613" : "#F1C6D6",
					isDark ? "rgba(38, 41, 43, 0.5)" : "#F1F3F5",
				],
				borderColor: ["#F31260", isDark ? "#313538" : "#D7DBDF"],
			},
		],
		borderWidth: 1,
	};
	const chartData2 = {
		datasets: [
			{
				label: "Grade",
				data: [teams[index]?.grade, 100 - teams[index]?.grade],
				backgroundColor: [
					isDark ? "#2B0613" : "#F1C6D6",
					isDark ? "rgba(38, 41, 43, 0.5)" : "#F1F3F5",
				],
				borderColor: ["#F31260", isDark ? "#313538" : "#D7DBDF"],
			},
		],
		borderWidth: 1,
	};
	const submitGrade = () => {
		try {
			if (grade < 0 || grade > 100) {
				createErrorToast("Grade must be between 1 and 100", isDark);
				return;
			}
			xctfAdmin.submitGrade({
				username: name,
				score: grade,
			});
			createSuccessToast("Successfully submitted grade", isDark);
			window.location.reload();
		} catch (error) {
			createErrorToast("Failed to submit grade", isDark);
		}
	};

	const navigate = useNavigate();

	return (
		<div className="xl:grid xl:grid-cols-5 xl:my-2 relative">
			{writeup && !showChart && (
				<div
					className="xl:ml-[20px] mx-[20px] xl:col-span-3"
					style={{
						height: "calc(100vh - 100px)",
					}}
				>
					<Textarea fullWidth value={writeup} />
					{/*<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">*/}
					{/*	{isDark ? (*/}
					{/*		<Viewer*/}
					{/*			theme="dark"*/}
					{/*			fileUrl={writeup}*/}
					{/*			plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}*/}
					{/*		/>*/}
					{/*	) : (*/}
					{/*		<Viewer*/}
					{/*			fileUrl={writeup}*/}
					{/*			plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}*/}
					{/*		/>*/}
					{/*	)}*/}
					{/*</Worker>*/}
				</div>
			)}
			{!writeup && !showChart && <div></div>}
			{showChart && (
				<div className="w-full h-full xl:col-span-3">
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
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
			)}
			<div className="flex flex-col items-center w-full relative xl:col-span-2">
				<div className="absolute right-8 top-[2px]">
					<Switch
						color="error"
						size="xl"
						iconOn={<TbGraph />}
						iconOff={<TbGraphOff />}
						onChange={(e) => setShowChart(e.target.checked)}
					/>
				</div>
				<Button.Group
					color="error"
					style={{
						margin: "0 auto",
					}}
				>
					<Button
						auto
						flat={!isDark}
						disabled={index === 0}
						icon={<TbArrowBigLeftFilled />}
						onPress={() => {
							navigate(`/view/${teams[index - 1].name}`);
						}}
					/>
					<Select
						defaultValue={{ value: name, label: name }}
						onChange={(e) => navigate(`/view/${e?.value}`)}
						options={teams.map((t) => ({ value: t.name, label: t.name }))}
						className="w-64 mx-1"
						styles={{
							control: (provided, state) => ({
								...provided,
								minHeight: "40px",
							}),
						}}
						theme={(t) => ({
							...t,
							borderRadius: 0,
							colors: {
								...t.colors,
								primary: theme.colors.error.toString(),
								primary25: theme.colors.errorLight.toString(),
								primary50: theme.colors.errorLightHover.toString(),
								primary75: theme.colors.errorSolidHover.toString(),
								neutral0: theme.colors.backgroundContrast.toString(),
								neutral20: theme.colors.neutralBorder.toString(),
								neutral30: theme.colors.neutralBorderHover.toString(),
								neutral80: theme.colors.text.toString(),
								neutral90: theme.colors.text.toString(),
							},
						})}
					/>
					<Button
						auto
						flat={!isDark}
						disabled={index === teams.length - 1}
						icon={<TbArrowBigRightFilled />}
						onPress={() =>
							window.location.replace(`/view/${teams[index + 1].name}`)
						}
					/>
				</Button.Group>
				<div
					className="flex flex-col items-center h-full"
					style={{
						marginTop: teams[index]?.grade === 0 ? "96px" : "12px",
						gap: teams[index]?.grade === 0 ? "72px" : "24px",
					}}
				>
					{teams[index] && (
						<>
							<div>
								{teams[index].grade !== 0 ? (
									<>
										<p className="text-3xl font-bold text-center mb-1">Grade</p>
										<div
											className="h-56"
											style={{
												marginBottom: isEditing ? "20px" : "8px",
											}}
										>
											<Pie data={chartData2} updateMode="none" />
										</div>
										<div className="flex flex-row justify-center items-center gap-2">
											{isEditing ? (
												<>
													<Input
														placeholder="Grade"
														bordered
														size="sm"
														autoFocus
														animated={false}
														onChange={(e) => setGrade(Number(e.target.value))}
														onBlur={(e) => {
															if (grade === -1) {
																toggleEditing();
															} else {
																submitGrade();
															}
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																submitGrade();
															}
														}}
													/>
													<p className="text-lg font-thin text-center">/100</p>
												</>
											) : (
												<p className="text-lg font-thin text-center">
													{teams[index].grade}/100
												</p>
											)}
											<Button
												color="error"
												ghost
												auto
												size="xs"
												onPress={toggleEditing}
											>
												<HiPencilSquare />
											</Button>
										</div>
									</>
								) : (
									<div className="flex flex-col">
										<p className="text-3xl font-bold text-center mb-4">
											Submit Grade
										</p>
										<Input
											placeholder="Grade"
											bordered
											color="error"
											size="lg"
											onChange={(e) => setGrade(Number(e.target.value))}
										/>
										<Button
											color="error"
											className="mt-4"
											auto
											size="lg"
											iconRight={<TbSend />}
											onPress={submitGrade}
										>
											Submit
										</Button>
									</div>
								)}
							</div>
							<div>
								<p className="text-3xl font-bold text-center mb-1">Flags</p>
								<div className="h-56 mb-2">
									<Pie data={chartData} updateMode="none"/>
								</div>
								<p className="text-lg font-thin text-center">
									{teams[index].score}/{numChallenges}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ViewWriteup;
