import React from "react";
import { useState } from "react";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GiFlyingFlag } from "react-icons/gi";
import { useDarkMode } from "usehooks-ts";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import UserDropdown from "./UserDropdown";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const location = useLocation();
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const isAdmin = user?.type === "admin";
	const themeColor = isAdmin ? "danger" : "primary";
	const { isDarkMode, toggle } = useDarkMode(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} classNames={{
			item: [
				"flex",
				"relative",
				"h-full",
				"items-center",
				"data-[active=true]:after:content-['']",
				"data-[active=true]:after:absolute",
				"data-[active=true]:after:bottom-0",
				"data-[active=true]:after:left-0",
				"data-[active=true]:after:right-0",
				"data-[active=true]:after:h-[2px]",
				"data-[active=true]:after:rounded-[2px]",
				(isAdmin ? "data-[active=true]:after:bg-danger" : "data-[active=true]:after:bg-primary"),
			],
		}}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<GiFlyingFlag className="h-8 w-8 mr-2" />
					<p className="text-xl font-bold text-inherit">xctf</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-2" justify="center">
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<NavbarItem isActive={l.to === location.pathname}>
								<Link
									isBlock
									className="px-2"
									color={l.to === location.pathname ? themeColor : "foreground"}
									href={l.to}
								>
									{l.label}
								</Link>
							</NavbarItem>
						)
					}
				})}
			</NavbarContent>
			<NavbarContent justify="end" as="div" className="flex gap-5">
				<NavbarItem
					onClick={toggle}
					key="toggle"
				>
					{isDarkMode ? <BsSunFill /> : <BsMoonStarsFill />}
				</NavbarItem>
				{user ? <UserDropdown /> : null}
			</NavbarContent>
			<NavbarMenu>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<NavbarMenuItem isActive={l.to === location.pathname}>
								<Link
									isBlock
									color={l.to === location.pathname ? themeColor : "foreground"}
									href={l.to}
								>
									{l.label}
								</Link>
							</NavbarMenuItem>
						)
					}
				})}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavbarComponent;