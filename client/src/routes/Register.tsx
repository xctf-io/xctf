import React from "react";
import { useState } from "react";
import { useRegister } from "../store/user";
import { useLogin } from "../store/user";
import { HiMail, HiUser } from "react-icons/hi";
import { useDarkMode } from "usehooks-ts";
import { Link } from "react-router-dom";

interface RegisterProps { }

const Register: React.FC<RegisterProps> = ({ }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [registerUser, success, error] = useRegister();
	const [doLogin, successLogin, errorLogin] = useLogin();
	const { isDarkMode } = useDarkMode();
	async function loginAndRegister(user: string, mail: string, pass: string) {
		const registrationSucceeded = Boolean(await registerUser(user, mail, pass));
		if (registrationSucceeded) {
			await doLogin(mail, pass);
		}
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2  w-full">
			<div className="flex flex-col gap-4 lg:ml-48 lg:mr-32 mt-24 lg:mt-auto m-auto justify-center">
				<div>
					<h1 className="text-5xl font-bold">Create an account</h1>
					<p className="font-light">Sign up to start hacking!</p>
				</div>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Username</span>
					</div>
					<input
						id="username"
						className="w-full input input-bordered"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Email</span>
					</div>
					<input
						id="email"
						className="w-full input input-bordered"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Password</span>
					</div>
					<input
						id="password"
						className="w-full input input-bordered"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<button
					className="btn btn-primary h-16 text-lg mt-2"
					onClick={() => loginAndRegister(username, email, password)}
				>
					<span>Register</span>
				</button>
				<p className="font-extralight text-center">
					Already have an account? Login <Link className="link link-primary" to="/login">here</Link>.
				</p>
			</div>
			{isDarkMode ? (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1590069261209-f8e9b8642343")',
						height: "calc(100vh - 86px)",
					}}
				/>
			) : (
				<div
					className="inset-0 bg-cover lg:block hidden"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1532456745301-b2c645d8b80d")',
						height: "calc(100vh - 86px)",
					}}
				/>
			)}
		</div>
	);
};

export default Register;

