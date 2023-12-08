import { useEffect, useState } from "react";

import { useLogin } from "../store/user";
import { useDarkMode } from "usehooks-ts";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [doLogin, success, error] = useLogin();
	const { isDarkMode } = useDarkMode();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 w-full">
			<div className="flex flex-col gap-6 lg:ml-48 lg:mr-32 mt-24 lg:mt-auto m-auto justify-center">
				<div>
					<h1 className="text-5xl font-bold mb-0">Welcome back!</h1>
					<p className="font-light">Login to continue</p>
				</div>
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
					className="btn btn-primary mt-0 h-16 text-lg"
					color="primary"
					onClick={() => doLogin(email, password, isDarkMode)}
				>
					Log In
				</button>

				<p className="text-center font-extralight">
					Forgot your password? Reset it{" "}
					<Link className="link link-primary" to="/forgot-password">
						here
					</Link>
					.
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

export default Login;
