import React from "react";
import { useEffect, useState } from "react";

import { Input, Button, Text, useTheme } from "@nextui-org/react";
import { HiMail } from "react-icons/hi";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const { type, isDark } = useTheme();

	useEffect(() => {
		document.querySelector("input")?.focus();
	}, []);

    function errorToast(arg0: string): void {
        throw new Error("Function not implemented.");
    }

	return (
		<div className="grid grid-cols-2 w-full">
			<div className="flex flex-col gap-6 ml-48 mr-32 justify-center">
				<div>
					<h1 className="text-5xl font-bold mb-0">Reset Password</h1>
					<Text weight="light">Enter your email to get a reset code</Text>
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

				<Button
					className="mt-6"
					size="xl"
                    auto
                    onPress={() => errorToast("This feature hasn't been implemented.")}
				>
					<span>Send Code</span>
				</Button>
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

export default ForgotPassword;
