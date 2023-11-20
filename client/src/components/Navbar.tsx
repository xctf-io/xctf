import { useState } from "react";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import {
	Link,
	Text,
	useTheme,
	Dropdown,
	Avatar,
} from "@nextui-org/react";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {
	Navbar, 
	NavbarBrand, 
	NavbarContent, 
	NavbarItem, 
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem
} from "@nextui-org/navbar";
import { useDarkMode } from 'usehooks-ts'
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
	const { toggle } = useDarkMode(false)
	const { type, isDark } = useTheme();
	const translate = userLoggedIn
		? "-translate-x-[15px]"
		: "-translate-x-[49px]";

	return (
		<Navbar className="w-screen">
			<NavbarBrand>
				<GiFlyingFlag className="ml-2 mr-2 w-10 h-10" />
				<Text b color="inherit" className="text-2xl">
					CTFg
				</Text>
			</NavbarBrand>
			<NavbarContent
				className={"xs:block hidden absolute " + translate}
			>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<NavbarItem key={l.label} isActive={l.to === location.pathname}>
								<Link
									onClick={() => navigate(l.to)}
								>
									{l.label}
								</Link>
							</NavbarItem>
						);
					}
				})}
			</NavbarContent>
			<NavbarContent>
				<NavbarItem
					className="justify-self-right"
					onClick={toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</NavbarItem>
				{user && (
					<NavbarItem>
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
					</NavbarItem>
				)}
			</NavbarContent>
			<NavbarMenu>
				{links.map((l) => {
					if (
						(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
						(!userLoggedIn && !l.hideWhenUnauthed) ||
						(userLoggedIn && isAdmin && l.showWhenAdmin)
					) {
						return (
							<NavbarMenuItem key={l.label} isActive={l.to === location.pathname}>
								<Link onClick={() => navigate(l.to)}>
								   {l.label}
								</Link>
							</NavbarMenuItem>
						);
					}
				})}
			</NavbarMenu>
			<NavbarContent>
				<NavbarItem
					className="justify-self-right xs:block hidden"
					onClick={toggle}
					key="toggle"
				>
					{isDark ? <BsSunFill /> : <BsMoonStarsFill />}
				</NavbarItem>
				{user && (
					<NavbarItem>
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
					</NavbarItem>
				)}
				<NavbarMenuToggle />
			</NavbarContent>
		</Navbar>
	);
};

export default NavbarComponent;
