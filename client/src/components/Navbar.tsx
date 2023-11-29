import React from "react";
import { useState } from "react";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import {
	Link,
	Navbar,
	Text,
	useTheme
} from "@nextui-org/react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GiFlyingFlag } from "react-icons/gi";
import { useDarkMode } from "usehooks-ts";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import UserDropdown from "./UserDropdown";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const isAdmin = user?.type === "admin";
	const themeColor = isAdmin ? "error" : "primary";
	const {toggle} = useDarkMode(false);
	const { type, isDark } = useTheme();
	const translate = userLoggedIn
		? "-translate-x-[15px]"
		: "-translate-x-[49px]";

	return (
		<Navbar className="w-screen" variant="sticky" maxWidth="fluid">
			<Navbar.Brand>
				<GiFlyingFlag className="ml-2 mr-2 w-10 h-10" />
				<Text b color="inherit" className="text-2xl">
					xctf
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
									onClick={() => navigate(l.to)}
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
					onClick={toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</Navbar.Link>
				{user ? <UserDropdown /> : null}
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
								<Link
									color="inherit"
									onClick={() => navigate(l.to)}
								>
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
					onClick={toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</Navbar.Link>
				{user ? <UserDropdown /> : null}
				<Navbar.Toggle />
			</Navbar.Content>
		</Navbar>
	);
};

export default NavbarComponent;