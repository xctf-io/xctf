import React, { useEffect, useState } from "react";
import { Button, Link, Textarea, Tooltip } from "@nextui-org/react";
import { useUser } from "../store/user";
import { xctf, xctfAdmin } from "../service";
import Markdown from "markdown-to-jsx";
import { HiPencilSquare } from "react-icons/hi2";
import { useDarkMode } from "usehooks-ts";

interface Props { }

const CTFComponent: React.FC<Props> = () => {
	const { isDarkMode } = useDarkMode();
	const [user, setUser, logout] = useUser();
	const themeColor = user?.type == "admin" ? "danger" : "primary";
	const [homePage, setHomePage] = useState<string>("");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	useEffect(() => {
		async function getHomePage() {
			const res = await xctf.getHomePage({});
			setHomePage(res.content);
		}
		getHomePage();
	}, []);
	const updateHomePage = async () => {
		const res = await xctfAdmin.setHomePage({ content: homePage });
		setIsEditing(false);
	};
	const isAdmin = user?.type === "admin";
	const textOpacity = isAdmin ? "opacity-50 prose dark:prose-invert" : "prose dark:prose-invert";
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
								strong: {
									component: ({ children, ...props }) => (
										<strong {...props}>{children}</strong>
									),
									props: {
										className: "font-extrabold underline",
									},
								},
							}
						}}
					>
						{homePage}
					</Markdown>
				)}
				{loggedIn && !isEditing && isAdmin && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<Tooltip showArrow={true} content={"Edit the homepage"} color="danger">
							<Button
								color="danger"
								as={Link}
								size="lg"
								onPress={() => {
									setIsEditing(true);
								}}
							>
								<HiPencilSquare className="h-8 w-8" />
							</Button>
						</Tooltip>
					</div>
				)}
			</div>
			{isEditing && (
				<div className="w-1/2">
					<Textarea
						className="mb-4"
						minRows={1}
						maxRows={30}
						defaultValue={homePage}
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
					></Textarea>
					<Button as={Link} color="danger" size="lg"  onPress={() => updateHomePage()}>
						<span className="text-lg">Save</span>
					</Button>
				</div>
			)}
			{loggedIn && !isAdmin && (
				<p className="text-lg inline">
					For help related to the competition, go to the 
					{" "}<Link href="https://wiki.xctf.io" color={themeColor} showAnchorIcon>wiki</Link>
				</p>
			)}
		</div>
	);
};

export default CTFComponent;
