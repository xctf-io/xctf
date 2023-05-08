import React from "react";
import { useState } from "react";
import { useRegister } from "../store/user";
import AuthFlowInfo from "./AuthFlowInfo";
import { Input, Button } from "@nextui-org/react";
import { HiMail } from "react-icons/hi";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [registerUser, success, error] = useRegister();

	return (
		<div className="flex flex-col gap-6 place-content-center mx-64">
			<Input
				id="username"
				label="Username"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<Input
				id="email"
				type="email"
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				contentRight={<HiMail />}
			/>

			<Input.Password
				id="password"
				label="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Button
				onPress={() => registerUser(username, email, password)}
				href="/login"
				className="mt-6"
				auto
			>
				Create account
			</Button>
			<AuthFlowInfo success={success} error={error} />
		</div>
	);
};

export default Register;
