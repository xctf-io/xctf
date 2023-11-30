import React from "react";
import { useEffect, useState } from "react";
import { xctfAdmin } from "../service";
import {
	Progress,
	Table,
	Link,
	Badge,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell
} from "@nextui-org/react";
import { useDarkMode } from "usehooks-ts";

interface Props {}

interface Team {
	name: string;
	hasWriteup: boolean;
	progress: number;
	grade: number;
}

export const Grading: React.FC<Props> = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [numChallenges, setNumChallenges] = useState<number>(0);
	useEffect(() => {
		async function fetchCurrentProgress() {
			try {
				const resp = await xctfAdmin.getTeamsProgress({});
				const allChallenges = await xctfAdmin.getAllChallenges({});
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
	const { isDarkMode } = useDarkMode();
	return (
		<>
			<div className="mx-[3vw] lg:mx-[6vw] mt-8">
				<Table
					style={{
						height: "auto",
						minWidth: "100%",
					}}
					radius={isDarkMode ? "none" : "md"}
					aria-label="Grading Table"
					color="danger"
				>
					<TableHeader>
						<TableColumn>NAME</TableColumn>
						<TableColumn>WRITEUP</TableColumn>
						<TableColumn>GRADE</TableColumn>
						<TableColumn>PROGRESS</TableColumn>
					</TableHeader>
					<TableBody>
						{teams.map((team) => (
							<TableRow key={team.name}>
								<TableCell
									className="w-[20%] min-w-unit-24"
								>
									{team.name}
								</TableCell>
								<TableCell
									className="min-w-unit-24"
								>
									{team.hasWriteup ? (
										<Link color="danger" href={"/view/" + team.name}>
											View
										</Link>
									) : (
										<p>No Writeup</p>
									)}
								</TableCell>
								<TableCell
									className="w-[40%]"
								>
									{team.grade === 0 ? (
										<p>No Grade</p>
									) : (
										<>
											<div className="hidden sm:block">
												<Progress value={team.grade} maxValue={100} color="danger" />
											</div>
											<div className="sm:hidden">{team.grade}%</div>
										</>
									)}
								</TableCell>
								<TableCell
									className="w-1/2"
								>
									<div className="hidden sm:block">
										<Progress
											value={team.progress}
											maxValue={numChallenges}
											color="danger"
										/>
									</div>
									<div className="sm:hidden">
										{team.progress}/{numChallenges}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
