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
	Button,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GiFlyingFlag } from "react-icons/gi";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const [path, updatePath] = useState(window.location.pathname);
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const isAdmin = user?.type === "admin";
	const themeHexColor = isAdmin ? "DF3562" : "3070ED";
	const themeColor = isAdmin ? "error" : "primary";
	const darkMode = useDarkMode(false);
	const { type, isDark } = useTheme();

	return (
		<Navbar className="w-screen" variant="sticky" maxWidth="fluid">
			<Navbar.Brand>
				<GiFlyingFlag className="ml-2 mr-2 w-10 h-10" />
				<Text b color="inherit" className="text-2xl">
					CTFg
				</Text>
			</Navbar.Brand>
			<Navbar.Collapse>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) || 
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<Navbar.CollapseItem key={l.label} isActive={l.to === path}>
								<Link
									color="inherit"
									onPress={() => updatePath(l.to)}
									href={l.to}
								>
									{l.label}
								</Link>
							</Navbar.CollapseItem>
						);
					}
				})}
			</Navbar.Collapse>
			<Navbar.Content
				hideIn="xs"
				enableCursorHighlight
				variant="underline"
				activeColor={themeColor}
			>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) || 
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<Navbar.Item key={l.label} isActive={l.to === path}>
								<Link
									color="inherit"
									onPress={() => updatePath(l.to)}
									href={l.to}
								>
									{l.label}
								</Link>
							</Navbar.Item>
						);
					}
				})}
			</Navbar.Content>
			<Navbar.Content enableCursorHighlight>
				<Navbar.Link onPress={darkMode.toggle} key="toggle">
					{isDark ? <BsMoonStarsFill /> : <BsSunFill />}
				</Navbar.Link>
				{user && (
					<>
						<Dropdown placement="bottom-right">
							<Navbar.Item>
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
							</Navbar.Item>
							<Dropdown.Menu
								aria-label="User menu actions"
								onAction={(actionKey) => {
									if (actionKey === "logout") {
										logout();
										document.location.href = "/login";
										updatePath("/login");
									}
								}}
								containerCss={{ border: "none" }}
							>
								<Dropdown.Item key="profile" css={{ height: "$18" }}>
									<Text color="inherit">Signed in as</Text>
									<Text b color="inherit">
										{user.username}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item key="logout" withDivider color="error">
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>
				)}
			</Navbar.Content>
			<Navbar.Toggle showIn="xs" />
		</Navbar>
	);
};

export default NavbarComponent;
