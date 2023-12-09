import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Markdown from "markdown-to-jsx";

import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import {Evidence} from "./routes/Evidence";
import {Grading} from "./routes/Grading";
import ForgotPassword from "./routes/ForgotPassword";
import SubmitWriteup from "./routes/SubmitWriteup";
import ViewWriteup from "./routes/ViewWriteup";
import { NavLink } from "./types/nav";
import { xctf } from "./service";
import { useUser } from "./store/user";
import { usePages } from "./store/pages";
import { useDarkMode } from 'usehooks-ts'
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import Redirect from "./components/Redirect";
import {Competitions} from "@/routes/build/Competitions";
import {Toaster} from "react-hot-toast";
import {Deploy} from "@/routes/Deploy";

interface Props {}

function App() {
	const [links, setLinks] = useState<NavLink[]>([]);
	const [user, setUser, logout] = useUser();
	const [pages, setPages] = usePages();
	const [isInitialMount, setIsInitialMount] = useState(true);
	const navBarLinks: NavLink[] = [
		{
			label: "Home",
			to: "/",
			Component: Home,
			showWhenAuthed: true,
			showWhenAdmin: true
		},
		{
			label: "Evidence",
			to: "/evidence",
			Component: Evidence,
			showWhenAuthed: true,
			showWhenAdmin: false,
			hideWhenUnauthed: true,
		},
		{
			label: "Login",
			to: "/login",
			Component: Login,
			showWhenAuthed: false,
			showWhenAdmin: false,
		},
		{
			label: "Sign Up",
			to: "/register",
			Component: Register,
			showWhenAuthed: false,
			showWhenAdmin: false,
		},
		{
			label: "Grading",
			to: "/grading",
			Component: Grading,
			showWhenAuthed: false,
			showWhenAdmin: true,
			hideWhenUnauthed: true,
		},
		{
			label: "Competitions",
			to: "/competitions",
			Component: Competitions,
			showWhenAuthed: false,
			showWhenAdmin: true,
			hideWhenUnauthed: true,
		},
		{
			label: "Manage",
			to: "/manage",
			Component: Deploy,
			showWhenAuthed: false,
			showWhenAdmin: true,
			hideWhenUnauthed: true,
		},
		{
			label: "Forgot Password",
			to: "/forgot-password",
			Component: ForgotPassword,
			showWhenAuthed: false,
			showWhenAdmin: false,
			hideWhenUnauthed: true,
		},
		{
			label: "Writeup",
			to: "/submit",
			Component: SubmitWriteup,
			showWhenAuthed: true,
			showWhenAdmin: false,
			hideWhenUnauthed: true,
		},
		{
			label: "View Writeup",
			to: "/view/:name",
			Component: ViewWriteup,
			showWhenAuthed: false,
			showWhenAdmin: false,
			hideWhenUnauthed: true,
		},
	];

	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				setLinks(navBarLinks);
				if (!user) {
					return;
				}
				const resp = await xctf.currentUser({});
				setUser({
					username: resp.username,
					type: resp.userRole,
				});
				setPages(resp.pages);
			} catch (e) {
				console.log(e);
			}
		}
		if (isInitialMount) {
			fetchCurrentUser();
			setIsInitialMount(false);
		}
	}, [user]);

	const { isDarkMode } = useDarkMode(false)
	const loggedIn = !!user;
	const isAdmin = user?.type === "admin";

	return (
		<>
			<main data-theme={isDarkMode ? "black": "light" } className="min-h-screen text-foreground bg-background">
				<Router>
					<Navbar links={links} />
					<Routes>
						{links.map((link) => (
							<Route
								key={link.to}
								path={link.to}
								Component={
									(link.label === 'Forgot Password' && !loggedIn) ||
									(loggedIn && isAdmin && link.label === 'View Writeup') ||
									(loggedIn && !isAdmin && link.showWhenAuthed) ||
									(!loggedIn && !link.hideWhenUnauthed) ||
									(loggedIn && isAdmin && link.showWhenAdmin)
										? link.Component
										: Redirect
								}
							/>
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
				<Toaster/>
			</main>
			<ToastContainer />
		</>
	);
}

export default App;
