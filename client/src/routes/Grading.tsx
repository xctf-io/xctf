import React from "react";
import { useEffect, useState } from "react";
import { xctfAdmin } from "../service";
import { useDarkMode } from "usehooks-ts";
import { Link } from "react-router-dom";

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
				<table
					className="table h-auto min-w-full"
					aria-label="Grading Table"
					color="danger"
				>
					<thead>
						<th>NAME</th>
						<th>WRITEUP</th>
						<th>GRADE</th>
						<th>PROGRESS</th>
					</thead>
					<tbody>
						{teams.map((team) => (
							<tr key={team.name}>
								<td
									className="w-[20%] min-w-unit-24"
								>
									{team.name}
								</td>
								<td
									className="min-w-unit-24"
								>
									{team.hasWriteup ? (
										<Link className="link link-error" to={"/view/" + team.name}>
											View
										</Link>
									) : (
										<p>No Writeup</p>
									)}
								</td>
								<td
									className="w-[40%]"
								>
									{team.grade === 0 ? (
										<p>No Grade</p>
									) : (
										<>
											<div className="hidden sm:block">
												<progress value={team.grade} max={100} className="progress progress-error" />
											</div>
											<div className="sm:hidden">{team.grade}%</div>
										</>
									)}
								</td>
								<td
									className="w-1/2"
								>
									<div className="hidden sm:block">
										<progress
											value={team.progress}
											max={numChallenges}
											className="progress progress-error"
										/>
									</div>
									<div className="sm:hidden">
										{team.progress}/{numChallenges}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
