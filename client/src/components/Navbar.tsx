import React from "react";
import { useState } from "react";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { GiFlyingFlag } from "react-icons/gi";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { useDarkMode } from "usehooks-ts";
import {
	Link,
	Link as RouterLink,
	useLocation,
	useNavigate,
} from "react-router-dom";
import UserDropdown from "./UserDropdown";

interface NavbarProps {
	links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
	const location = useLocation();
	const [user, setUser, logout] = useUser();

	const userLoggedIn = !!user;
	const isAdmin = user?.type === "admin";
	const themeColor = isAdmin ? "error" : "primary";
	const { isDarkMode, toggle } = useDarkMode(false);

	return (
		<div className="navbar bg-base-100 p-4 sm:p-2">
			<div className="navbar-start ml-6">
				<GiFlyingFlag className="h-8 w-8 mr-2" />
				<p className="text-xl font-bold text-inherit">xctf</p>
			</div>

			<div className="navbar-center hidden sm:flex gap-2">
				<ul className="menu menu-horizontal menu-lg">
					{links.map((l) => {
						if (
							(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
							(!userLoggedIn && !l.hideWhenUnauthed) ||
							(userLoggedIn && isAdmin && l.showWhenAdmin)
						) {
							return (
								<li
									key={l.label}
									className={
										l.to === location.pathname
											? "border-b-2 border-base-content"
											: ""
									}
								>
									<Link className="link px-2 no-underline" color="foreground" to={l.to}>
										{l.label}
									</Link>
								</li>
							);
						}
					})}
				</ul>
			</div>
			<div className="navbar-end mr-4">
				<div className={`swap swap-rotate ${user ? "mr-5" : ""}`} onClick={toggle} >
					<BsSunFill className={isDarkMode ? "swap-off" : "swap-on"} />
					<BsMoonStarsFill className={isDarkMode ? "swap-on" : "swap-off"} />
				</div>
				{user ? <UserDropdown /> : null}
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
						<BiMenuAltRight className="h-6 w-6" />
					</div>
					<ul
						tabIndex={0}
						className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
					>
						{links.map((l) => {
							if (
								(userLoggedIn && !isAdmin && l.showWhenAuthed) ||
								(!userLoggedIn && !l.hideWhenUnauthed) ||
								(userLoggedIn && isAdmin && l.showWhenAdmin)
							) {
								return (
									<li key={l.label}>
										<Link className="link px-2 no-underline" color="foreground" to={l.to}>
											{l.label}
										</Link>
									</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NavbarComponent;
