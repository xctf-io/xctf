import React from "react";
import { useState } from "react";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import {
	Link,
	Navbar,
	Text,
	useTheme,
	Dropdown,
	Avatar,

} from "@nextui-org/react";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import useDarkMode from "use-dark-mode";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GiFlyingFlag } from "react-icons/gi";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const isAdmin = user?.type === "admin";
	const themeHexColor = isAdmin ? "DF3562" : "3070ED";
	const themeColor = isAdmin ? "error" : "primary";
	const darkMode = useDarkMode(false);
	const { type, isDark } = useTheme();
	const translate = userLoggedIn
		? "-translate-x-[15px]"
		: "-translate-x-[49px]";

	return (
		<Navbar className="w-screen" variant="sticky" maxWidth="fluid">
			<Navbar.Brand>
				<GiFlyingFlag className="ml-2 mr-2 w-10 h-10" />
				<Text b color="inherit" className="text-2xl">
					CTFg
				</Text>
			</Navbar.Brand>
			<Navbar.Content
				hideIn="xs"
				enableCursorHighlight
				variant="underline"
				className={"absolute " + translate}
				activeColor={themeColor}
			>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<Navbar.Item key={l.label} isActive={l.to === location.pathname}>
								<Link
									color="inherit"
									onPress={() => navigate(l.to)}
								>
									{l.label}
								</Link>
							</Navbar.Item>
						);
					}
				})}
			</Navbar.Content>
			<Navbar.Content enableCursorHighlight hideIn="xs">
				<Navbar.Link
					className="justify-self-right"
					onPress={darkMode.toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</Navbar.Link>
				{user && (
					<Navbar.Item>
						<Dropdown placement="bottom-right">
							<Dropdown.Trigger>
								<Avatar
									bordered
									as="button"
									color={themeColor}
									size="md"
									src={
										"https://api.dicebear.com/6.x/bottts/svg?baseColor=" +
										themeHexColor +
										"&seed=" +
										user.username
									}
								/>
							</Dropdown.Trigger>
							<Dropdown.Menu
								aria-label="User menu actions"
								onAction={(actionKey) => {
									if (actionKey === "logout") {
										logout();
									}
								}}
								containerCss={{ border: "none" }}
							>
								<Dropdown.Item
									key="profile"
									css={{
										height: "auto",
										paddingTop: "0.5rem",
										paddingBottom: "0.5rem",
									}}
								>
									<Text color="inherit">Signed in as</Text>
									<Text
										b
										color="inherit"
										style={{
											overflowWrap: "anywhere",
										}}
									>
										{user.username}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item key="logout" withDivider color="error">
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Item>
				)}
			</Navbar.Content>
			<Navbar.Collapse>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<Navbar.CollapseItem key={l.label} isActive={l.to === location.pathname}>
								<Link color="inherit" onPress={() => navigate(l.to)}>
								   {l.label}
								</Link>
							</Navbar.CollapseItem>
						);
					}
				})}
			</Navbar.Collapse>
			<Navbar.Content showIn="xs">
				<Navbar.Link
					className="justify-self-right"
					onPress={darkMode.toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</Navbar.Link>
				{user && (
					<Navbar.Item>
						<Dropdown placement="bottom-right">
							<Dropdown.Trigger>
								<Avatar
									bordered
									as="button"
									color={themeColor}
									size="md"
									src={
										"https://api.dicebear.com/6.x/bottts/svg?baseColor=" +
										themeHexColor +
										"&seed=" +
										user.username
									}
								/>
							</Dropdown.Trigger>
							<Dropdown.Menu
								aria-label="User menu actions"
								onAction={(actionKey) => {
									if (actionKey === "logout") {
										logout();
										document.location.href = "/login";
										navigate("/login");
									}
								}}
								containerCss={{ border: "none" }}
							>
								<Dropdown.Item
									key="profile"
									css={{
										height: "auto",
										paddingTop: "0.5rem",
										paddingBottom: "0.5rem",
									}}
								>
									<Text color="inherit">Signed in as</Text>
									<Text
										b
										color="inherit"
										style={{
											overflowWrap: "anywhere",
										}}
									>
										{user.username}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item key="logout" withDivider color="error">
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Item>
				)}
				<Navbar.Toggle />
			</Navbar.Content>
		</Navbar>
	);
};

export default NavbarComponent;
