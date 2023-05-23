import React, {
	useEffect,
	useState,
	useMemo,
	MutableRefObject,
	useRef,
	useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { ctfgAdmin } from "../service";
import { createErrorToast, createSuccessToast } from "../store/user";
import { Button, theme, Input, Switch, useTheme } from "@nextui-org/react";
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

import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type { GetUserGraphResponse } from "../rpc/ctfg";
import dagre from "dagre";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	applyNodeChanges,
} from "reactflow";

interface Team {
	name: string;
	hasWriteup: boolean;
	score: number;
	grade: number;
}

ChartJS.register(ArcElement, Legend);

const ViewWriteup = () => {
	const { name } = useParams();
	const [teams, setTeams] = useState<Team[]>([]);
	const [writeup, setWriteup] = useState("");
	const { type, isDark } = useTheme();
	const [numChallenges, setNumChallenges] = useState(0);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const toggleEditing = () => setIsEditing(!isEditing);
	const [grade, setGrade] = useState<number>(-1);
	const layoutPluginInstance = defaultLayoutPlugin({
		sidebarTabs: (defaultTabs) => [],
	});
	const [showChart, setShowChart] = useState<boolean>(false);
	async function getWriteup() {
		try {
			const wp = await ctfgAdmin.GetWriteup({ username: name });
			setWriteup(wp.content);
		} catch (error) {
			createErrorToast("User does not have a writeup", isDark);
		}
	}
	async function getTeams() {
		try {
			const resp = await ctfgAdmin.GetTeamsProgress({});
			const allChallenges = await ctfgAdmin.GetAllChallenges({});
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
	const [graph, setGraph] = useState<GetUserGraphResponse>({
		connections: [],
		evidence: [],
	});
	const graphRef: MutableRefObject<GetUserGraphResponse> =
		useRef<GetUserGraphResponse>({
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
			const resp = await ctfgAdmin.GetUserGraph({
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
		} catch (e) {
			createErrorToast(e, isDark);
		}
	}

	useEffect(() => {
		getWriteup();
		getTeams();
		loadDiscoveredEvidence();
	}, []);

	const [nodes, setNodes] = useState();
	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);
	const [edges, setEdges] = useState();

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
			ctfgAdmin.SubmitGrade({
				username: name,
				score: grade,
			});
			createSuccessToast("Successfully submitted grade", isDark);
			window.location.reload();
		} catch (error) {
			createErrorToast("Failed to submit grade", isDark);
		}
	};

	const viewer = document.querySelector('[data-testid="theme__switch-button"]');
	if (viewer) {
		if (isDark) {
			viewer.click();
		}
	}

	return (
		<div
			className="xl:grid xl:grid-cols-2 xl:my-2 relative"
		>
			{writeup && !showChart && (
				<div
					className="xl:ml-[20px] mx-[20px]"
					style={{
						height: "calc(100vh - 100px)",
					}}
				>
					<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
						<Viewer fileUrl={writeup} plugins={[layoutPluginInstance]} />
					</Worker>
				</div>
			)}
			{!writeup && !showChart && <div></div>}
			{showChart && (
				<div className="w-full h-full">
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
			<div className="flex flex-col items-center w-full relative">
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
						onClick={() =>
							window.location.replace(`/view/${teams[index - 1].name}`)
						}
					/>
					<Select
						defaultValue={{ value: name, label: name }}
						onChange={(e) => window.location.replace(`/view/${e.value}`)}
						options={teams.map((t) => ({ value: t.name, label: t.name }))}
						className="w-80 mx-1"
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
						onClick={() =>
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
											<Pie data={chartData2} />
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
								<div className="h-64 mb-2">
									<Pie data={chartData} />
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
