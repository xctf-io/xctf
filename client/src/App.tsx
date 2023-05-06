import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import snarkdown from "snarkdown";

import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Evidence from "./routes/Evidence";
import { NavLink } from "./types/nav";
import { ctfg } from "./service";
import { useUser } from "./store/user";
import { usePages } from "./store/pages";

interface Props {}

function App() {
	const [links, setLinks] = useState<NavLink[]>([]);
	const [user, setUser, logout] = useUser();
	const [pages, setPages] = usePages();
	const navBarLinks: NavLink[] = [
		{
			label: "Home",
			to: "/",
			Component: Home,
			showWhenAuthed: true,
		},
		{
			label: "Evidence",
			to: "/evidence",
			Component: Evidence,
			showWhenAuthed: true,
			hideWhenUnauthed: true,
		},
		{
			label: "Login",
			to: "/login",
			Component: Login,
			showWhenAuthed: false,
		},
		{
			label: "Register",
			to: "/register",
			Component: Register,
			showWhenAuthed: false,
		},
	];

	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				setLinks(navBarLinks);
				const resp = await ctfg.CurrentUser({});
				setUser({
					username: resp.username,
				});
				setPages(resp.pages);
			} catch (e) {
				console.log(e);
			}
		}
		fetchCurrentUser();
	}, []);

	return (
		<main className="text-white">
			<Router>
				<Navbar links={links} />
				<div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
					<Routes>
						{links.map((link) => (
							<Route key={link.to} path={link.to} Component={link.Component} />
						))}
						{pages && (
							<>
								{pages.map((page) => (
									<Route key={page.route} path={page.route}>
										<div
											dangerouslySetInnerHTML={{
												__html: snarkdown(page.content),
											}}
										/>
									</Route>
								))}
							</>
						)}
					</Routes>
				</div>
			</Router>
		</main>
	);
}

export default App;
