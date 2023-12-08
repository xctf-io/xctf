import React, { useEffect, useState } from "react";
import { useUser } from "../store/user";
import { xctf, xctfAdmin } from "../service";
import Markdown from "markdown-to-jsx";
import { HiPencilSquare } from "react-icons/hi2";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Entrypoint } from "@/rpc/xctf/xctf_pb";
import { useDarkMode } from "usehooks-ts";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

const CTFComponent: React.FC<Props> = () => {
	const { isDarkMode } = useDarkMode();
	const [user, setUser, logout] = useUser();
	const themeColor = user?.type == "admin" ? "danger" : "primary";
	const [homePage, setHomePage] = useState<string>("");
	const [entrypoints, setEntrypoints] = useState<Entrypoint[]>([]);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	useEffect(() => {
		async function getHomePage() {
			const res = await xctf.getHomePage({});
			console.log(res);
			setHomePage(res.content);
			setEntrypoints(res.entrypoints);
		}
		getHomePage();
	}, []);
	const updateHomePage = async () => {
		const res = await xctfAdmin.setHomePage({ content: homePage });
		setIsEditing(false);
	};
	const isAdmin = user?.type === "admin";
	const textOpacity = isAdmin
		? "opacity-50 prose dark:prose-invert"
		: "prose dark:prose-invert";
	const loggedIn = !!user;

	return (
		<div className="text-center font-medium items-center py-8 flex flex-col gap-4 relative">
			{!loggedIn && (
				<div>
					<span className="mb-0 text-5xl font-extrabold">Welcome to xctf!</span>
					<h4>Register/Login to get started.</h4>
				</div>
			)}
			<div className="relative">
				{loggedIn && !isEditing && (
					<>
						<Markdown
							className={textOpacity}
							options={{
								overrides: {
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
											className: "font-extrabold underline",
										},
									},
								},
							}}
						>
							{homePage}
						</Markdown>
						<h3>Start Here!</h3>
						{entrypoints.map((e) => (
							<Link
								className="link link-error"
								key={e.route}
								to={e.route}
								target="_blank"
							>
								{e.name}
							</Link>
						))}
					</>
				)}
				{loggedIn && !isEditing && isAdmin && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div data-tip="Edit the homepage" className="tooltip tooltip-error">
							<button className="btn btn-square btn-error btn-outline" onClick={() => setIsEditing(true)}>
								<HiPencilSquare className="h-8 w-8 fill-current" />
							</button>
						</div>
					</div>
				)}
			</div>
			{isEditing && (
				<div className="w-1/2">
					<textarea
						className="textarea mb-4 w-full h-96"
						autoFocus
						onFocus={(e) => {
							const textarea = e.target as HTMLTextAreaElement;
							const val = textarea.value;
							textarea.value = "";
							textarea.value = val;
						}}
						onChange={(e) => {
							setHomePage(e.target.value);
						}}
					>
						{homePage}
					</textarea>
					<button className="btn btn-error" onClick={() => updateHomePage()}>
						<span className="text-lg">Save</span>
					</button>
				</div>
			)}
			{loggedIn && !isAdmin && (
				<p className="text-lg inline">
					For help related to the competition, go to the{" "}
					<Link
						className={"link inline link-" + themeColor}
						to="https://wiki.xctf.io"
					>
						wiki
						<FaExternalLinkAlt className="inline ml-1 h-4 w-4" />
					</Link>
				</p>
			)}
		</div>
	);
};

export default CTFComponent;
