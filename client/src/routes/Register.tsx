import React from "react";
import { useState } from "react";
import { useRegister } from "../store/user";
import { useLogin } from "../store/user";
import { Input, Button, useTheme, Text, Link } from "@nextui-org/react";
import { HiMail, HiUser } from "react-icons/hi";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [registerUser, success, error] = useRegister();
	const [doLogin, successLogin, errorLogin] = useLogin();
	const { type, isDark } = useTheme();
	async function loginAndRegister(user, mail, pass) {
		await registerUser(user, mail, pass, isDark);
		await doLogin(mail, pass, isDark);
	}

	return (
		<div className="grid grid-cols-2 w-full">
			<div className="flex flex-col gap-4 ml-48 mr-32 justify-center">
				<h1 className="text-5xl font-bold">Create an account</h1>
				<Input
					id="username"
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					contentRight={<HiUser />}
					width="100%"
					size="lg"
				/>
				<Input
					id="email"
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					contentRight={<HiMail />}
					width="100%"
					size="lg"
				/>

				<Input.Password
					id="password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					width="100%"
					size="lg"
				/>

				<Button
					className="mt-6"
					size="lg"
					auto
					onPress={() => loginAndRegister(username, email, password)}
				>
					<span>Register</span>
				</Button>
				<Text weight="thin" className="text-center">
					Already have an account? Login <Link color="primary" href="/login">here</Link>.
				</Text>
			</div>
			{isDark ? (
				<div
					className="inset-0 bg-cover"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80")',
						height: "calc(100vh - 80px)",
					}}
				/>
			) : (
				<div
					className="inset-0 bg-cover"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80")',
						height: "calc(100vh - 80px)",
					}}
				/>
			)}
		</div>
	);
};

export default Register;

