import React, { useEffect, useState } from "react";
import { Button, Link, Textarea, Tooltip, useTheme } from "@nextui-org/react";
import { useUser } from "../store/user";
import { ctfg, ctfgAdmin } from "../service";
import Markdown from "markdown-to-jsx";
import { HiPencilSquare } from "react-icons/hi2";

interface Props {}

const CTFComponent: React.FC<Props> = () => {
	const { type, isDark } = useTheme();
	const [user, setUser, logout] = useUser();
	const themeColor = user?.type == "admin" ? "error" : "primary";
	const lineClass = isDark ? "h-1 bg-gray-400 opacity-75" : "h-1 bg-slate";
	const [homePage, setHomePage] = useState<string>("");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	useEffect(() => {
		async function getHomePage() {
			const res = await ctfg.GetHomePage({});
			setHomePage(res.content);
		}
		getHomePage();
	}, []);
	const updateHomePage = async () => {
		const res = await ctfgAdmin.SetHomePage({ content: homePage });
		setIsEditing(false);
	};
	const isAdmin = user?.type === "admin";
	const textOpacity = isAdmin ? "opacity-50" : "";
	return (
		<div className="text-center font-medium mx-[15vw] lg:mx-[25vw] mt-8 flex flex-col gap-4 relative">
			<div>
				<span className="mb-0 text-5xl font-extrabold">Welcome to CTFg!</span>
				<h4>Register/Login to get started.</h4>
			</div>
			<hr className={lineClass} />
			<div className="relative">
				{!isEditing && (
					<Markdown
						className={textOpacity}
						options={{
							overrides: {
								a: {
									component: Link,
									props: {
										color: themeColor,
									},
								},
								p: {
									component: ({ children, ...props }) => (
										<p {...props}>{children}</p>
									),
									props: {
										className: "text-lg",
									},
								},
								strong: {
									component: ({ children, ...props }) => (
										<span {...props}>{children}</span>
									),
									props: {
										className: "font-extrabold",
									},
								},
							},
						}}
					>
						{homePage}
					</Markdown>
				)}
				{!isEditing && isAdmin && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<Tooltip content={"Edit the homepage"} color="error">
							<Button
								color="error"
								auto
								size="xl"
								flat
								rounded
								icon={<HiPencilSquare className="h-8 w-8" />}
								onPress={() => {
									setIsEditing(true);
								}}
							/>
						</Tooltip>
					</div>
				)}
			</div>
			{isEditing && (
				<>
					<Textarea
						minRows={1}
						maxRows={20}
						initialValue={homePage}
						autoFocus
						onFocus={(e) => {
							const val = e.target.value;
							e.target.value = "";
							e.target.value = val;
						}}
						onChange={(e) => {
							setHomePage(e.target.value);
						}}
					></Textarea>
					<Button color="error" onPress={() => updateHomePage()}>
						<span className="text-lg">Save</span>
					</Button>
				</>
			)}
			<hr className={lineClass} />
			{!isAdmin && (
				<>
					<p className="text-lg">
						For help related to the competition, go to the wiki.
					</p>
					<Button
						size="lg"
						color={themeColor}
						onPress={() => (document.location = "https://wiki.ctfg.io")}
					>
						wiki
					</Button>
				</>
			)}
		</div>
	);
};

export default CTFComponent;
