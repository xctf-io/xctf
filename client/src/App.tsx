import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Markdown from "markdown-to-jsx";

import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Evidence from "./routes/Evidence";
import { NavLink } from "./types/nav";
import { ctfg } from "./service";
import { useUser } from "./store/user";
import { usePages } from "./store/pages";
import useDarkMode from "use-dark-mode";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

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
			label: "Sign Up",
			to: "/register",
			Component: Register,
			showWhenAuthed: false,
		},
	];

	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				setLinks(navBarLinks);
				if (!user) {
					return;
				}
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

	const lightTheme = createTheme({
		type: "light",
	});

	const darkTheme = createTheme({
		type: "dark",
	});
	const darkMode = useDarkMode(false);

	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
			<main>
				<Router>
					<Navbar links={links} />
					<Routes>
						{links.map((link) => (
							<Route key={link.to} path={link.to} Component={link.Component} />
						))}
						{pages && (
							<>
								{pages.map((page) => (
									<Route key={page.route} path={page.route}>
										<Markdown>{page.content}</Markdown>
									</Route>
								))}
							</>
						)}
					</Routes>
				</Router>
			</main>
			<ToastContainer />
		</NextUIProvider>
	);
}

export default App;
