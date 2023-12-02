import React from "react";
import { useState } from "react";
import { useRegister } from "../store/user";
import { useLogin } from "../store/user";
import { Input, Button, Link } from "@nextui-org/react";
import { HiMail, HiUser } from "react-icons/hi";
import { useDarkMode } from "usehooks-ts";

interface RegisterProps { }

const Register: React.FC<RegisterProps> = ({ }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [registerUser, success, error] = useRegister();
	const [doLogin, successLogin, errorLogin] = useLogin();
	const { isDarkMode } = useDarkMode();
	async function loginAndRegister(user: string, mail: string, pass: string) {
		const registrationSucceeded = Boolean(await registerUser(user, mail, pass, isDarkMode));
		if (registrationSucceeded) {
			await doLogin(mail, pass, isDarkMode);
		}
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2  w-full">
			<div className="flex flex-col gap-4 lg:ml-48 lg:mr-32 mt-24 lg:mt-auto m-auto justify-center">
				<h1 className="text-4xl font-bold mb-4">Create an account</h1>
				<Input
					id="username"
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					width="100%"
					size="md"
				/>
				<Input
					id="email"
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					width="100%"
					size="md"
				/>

				<Input
					id="password"
					label="Password"
					type="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					width="100%"
					size="md"
				/>

				<Button
					color="primary"
					as={Link}
					className="mt-0 h-12 text-md"
					onPress={() => loginAndRegister(username, email, password)}
				>
					<span>Register</span>
				</Button>
				<p className="text-sm font-extralight text-center">
					Already have an account? Login <Link color="primary" href="/login">here</Link>.
				</p>
			</div>
			{isDarkMode ? (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1590069261209-f8e9b8642343")',
						height: "calc(100vh - 64px)",
					}}
				/>
			) : (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d")',
						height: "calc(100vh - 64px)",
					}}
				/>
			)}
		</div>
	);
};

export default Register;

