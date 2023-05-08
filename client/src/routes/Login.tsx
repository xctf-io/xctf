import React from "react";
import { useEffect, useState } from "react";
import AuthFlowInfo from "./AuthFlowInfo";

import { useLogin } from "../store/user";
import { Input, Button, Text } from "@nextui-org/react";
import { HiMail } from "react-icons/hi";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [doLogin, success, error] = useLogin();

	// focus the email input on mount
	useEffect(() => {
		document.querySelector("input")?.focus();
	}, []);

	return (
		<div className="flex flex-col gap-6 place-content-center mx-64">
			<Input
				id="email"
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				contentRight={<HiMail />}
				width="100%"
			/>

			<Input.Password
				id="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				width="100%"
			/>

			<Button className="mt-6" auto onPress={() => doLogin(email, password)}>
				<span>Log In</span>
			</Button>

			<Text weight="thin" className="text-center">Don't have an account? Register <a href="/register">here</a>.</Text>

			<AuthFlowInfo success={success} error={error} />
		</div>
	);
};

export default Login;
