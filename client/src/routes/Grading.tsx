import React from "react";
import { useEffect, useState } from "react";
import { ctfgAdmin } from "../service";
import { Progress, Text, Table, useTheme, Link } from "@nextui-org/react";

interface Props {}

interface Team {
	name: string;
	score: number;
}

const Grading: React.FC<Props> = () => {
    const [teams, setTeams] = useState<Team[]>([]);
	useEffect(() => {
		async function fetchCurrentProgress() {
			try {
				const resp = await ctfgAdmin.GetTeamsProgress({});
				const allChallenges = await ctfgAdmin.GetAllChallenges({});
				console.log(allChallenges);
				const teams = resp.teams.map((t) => ({
					name: t.teamName,
					score: t.score * 100 / allChallenges.challenges.length,
				}));
				teams.sort((a, b) => b.score - a.score);
				setTeams(teams);
			} catch (error) {
				console.error(error);
			}
		}
		fetchCurrentProgress();
    }, []);
    const { type, isDark } = useTheme();
	return <>
        <div className="mx-[3vw] lg:mx-[6vw] mt-8">
			<Table
				css={{
					height: "auto",
                    minWidth: "100%"
                }}
                bordered
                borderWeight={isDark ? "none" : "normal"}
				aria-label="Grading Table"
				color="error"
			>
				<Table.Header>
					<Table.Column>NAME</Table.Column>
					<Table.Column>WRITEUP</Table.Column>
					<Table.Column>PROGRESS</Table.Column>
				</Table.Header>
				<Table.Body>
					{teams.map((team) => (
						<Table.Row key={team.name}>
							<Table.Cell
								css={{
									minWidth: "100%",
									wordBreak: "break-all",
								}}
							>
								{team.name}
							</Table.Cell>
							<Table.Cell css={{
								minWidth: "$24",
							}}>
								<Link color="error" href={"/view/" + team.name}>
									View
								</Link>
							</Table.Cell>
							<Table.Cell
								css={{
									width: "70%",
								}}
							>
								<Progress size="md" color="error" value={team.score} />
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
	</>;
};

export default Grading;
