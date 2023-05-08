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
import useDarkMode from "use-dark-mode";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const [path, updatePath] = useState(window.location.pathname);
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const darkMode = useDarkMode(false);
	const { type, isDark } = useTheme();

	return (
		<Navbar variant="sticky">
			<Navbar.Brand>
				<Text b color="inherit">
					CTFg
				</Text>
			</Navbar.Brand>
			<Navbar.Collapse>
				{links.map((l) => {
					if (
						(userLoggedIn && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed)
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
				{user && (
					<>
						<Navbar.CollapseItem>{user.username}</Navbar.CollapseItem>
						<Navbar.CollapseItem>
							<Link color="inherit" onPress={logout} href="/login">
								Logout
							</Link>
						</Navbar.CollapseItem>
					</>
				)}
			</Navbar.Collapse>
			<Navbar.Content hideIn="xs" enableCursorHighlight variant="underline">
				{links.map((l) => {
					if (
						(userLoggedIn && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed)
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
				<Navbar.Item>
					{isDark ? (
						<Navbar.Link onPress={darkMode.toggle}>
							<BsMoonStarsFill />
						</Navbar.Link>
					) : (
						<Navbar.Link onPress={darkMode.toggle}>
							<BsSunFill />
						</Navbar.Link>
					)}
				</Navbar.Item>
				{user && (
					<>
						<Dropdown placement="bottom-right">
							<Navbar.Item>
								<Dropdown.Trigger>
									<Avatar
										bordered
										as="button"
										color="primary"
										size="md"
										src="https://api.dicebear.com/6.x/bottts/svg?eyes=frame2&face=round01&mouth=diagram&sides=antenna02&baseColor=3070ED&top=horns"
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
								<Dropdown.Item key="logout" withDivider color="error" >
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
