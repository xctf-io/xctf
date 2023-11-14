import React from "react";
import { useEffect, useState } from "react";
import { ctfgAdmin } from "../service";
import {
	Progress,
	Text,
	Table,
	useTheme,
	Link,
	Badge,
} from "@nextui-org/react";

interface Props {}

interface Team {
	name: string;
	hasWriteup: boolean;
	progress: number;
	grade: number;
}

const Grading: React.FC<Props> = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [numChallenges, setNumChallenges] = useState<number>(0);
	useEffect(() => {
		async function fetchCurrentProgress() {
			try {
				const resp = await ctfgAdmin.getTeamsProgress({});
				const allChallenges = await ctfgAdmin.getAllChallenges({});
				setNumChallenges(allChallenges.challenges.length);
				const teams = resp.teams.map((t) => ({
					name: t.teamName,
					hasWriteup: t.hasWriteup,
					progress: t.score,
					grade: t.grade,
				}));
				teams.sort((a, b) => {
					if (a.hasWriteup && !b.hasWriteup) return -1;
					if (!a.hasWriteup && b.hasWriteup) return 1;
					return b.progress - a.progress;
				});
				setTeams(teams);
			} catch (error) {
				console.error(error);
			}
		}
		fetchCurrentProgress();
	}, []);
	const { type, isDark } = useTheme();
	return (
		<>
			<div className="mx-[3vw] lg:mx-[6vw] mt-8">
				<Table
					style={{
						height: "auto",
						minWidth: "100%",
					}}
					bordered
					borderWeight={isDark ? "none" : "normal"}
					aria-label="Grading Table"
					color="error"
				>
					<Table.Header>
						<Table.Column>NAME</Table.Column>
						<Table.Column>WRITEUP</Table.Column>
						<Table.Column>GRADE</Table.Column>
						<Table.Column>PROGRESS</Table.Column>
					</Table.Header>
					<Table.Body>
						{teams.map((team) => (
							<Table.Row key={team.name}>
								<Table.Cell
									css={{
										minWidth: "$24",
										width: "20%",
									}}
								>
									{team.name}
								</Table.Cell>
								<Table.Cell
									css={{
										minWidth: "$24",
									}}
								>
									{team.hasWriteup ? (
										<Link color="error" href={"/view/" + team.name}>
											View
										</Link>
									) : (
										<Text>No Writeup</Text>
									)}
								</Table.Cell>
								<Table.Cell
									css={{
										width: "40%",
									}}
								>
									{team.grade === 0 ? (
										<Text>No Grade</Text>
									) : (
										<>
											<div className="hidden sm:block">
												<Progress value={team.grade} max={100} color="error" />
											</div>
											<div className="sm:hidden">{team.grade}%</div>
										</>
									)}
								</Table.Cell>
								<Table.Cell
									css={{
										width: "50%",
									}}
								>
									<div className="hidden sm:block">
										<Progress
											value={team.progress}
											max={numChallenges}
											color="error"
										/>
									</div>
									<div className="sm:hidden">
										{team.progress}/{numChallenges}
									</div>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Pagination
						shadow
						noMargin
						align="center"
						rowsPerPage={13}
						color="error"
					/>
				</Table>
			</div>
		</>
	);
};

export default Grading;
