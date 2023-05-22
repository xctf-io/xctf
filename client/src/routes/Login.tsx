import React from "react";
import { useEffect, useState } from "react";

import { useLogin } from "../store/user";
import { Input, Button, Text, useTheme, Link } from "@nextui-org/react";
import { HiMail } from "react-icons/hi";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [doLogin, success, error] = useLogin();
	const { type, isDark } = useTheme();

	// focus the email input on mount
	useEffect(() => {
		document.querySelector("input")?.focus();
	}, []);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 w-full">
			<div className="flex flex-col gap-6 lg:ml-48 lg:mr-32 mt-24 lg:mt-auto m-auto justify-center">
				<div>
					<h1 className="text-5xl font-bold mb-0">Welcome back!</h1>
					<Text weight="light">Login to continue</Text>
				</div>
				<Input
					id="email"
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					contentRight={<HiMail />}
					width="100%"
					size="xl"
				/>

				<Input.Password
					id="password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					width="100%"
					size="xl"
				/>

				<Button
					className="mt-6"
					size="xl"
					auto
					onPress={() => doLogin(email, password, isDark)}
				>
					<span>Log In</span>
				</Button>

				<Text weight="thin" className="text-center">
					Forgot your password? Reset it <Link color="primary" href="/forgot-password">here</Link>.
				</Text>
			</div>
			{isDark ? (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1590069261209-f8e9b8642343")',
						height: "calc(100vh - 80px)",
					}}
				/>
			) : (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d")',
						height: "calc(100vh - 80px)",
					}}
				/>
			)}
		</div>
	);
};

export default Login;
