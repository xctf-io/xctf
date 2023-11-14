import React from "react";
import { useState } from "react";
import { createErrorToast, createSuccessToast, useUser } from "../store/user";
import { ctfg } from "../service";

import { Button, Text, Link, useTheme, theme } from "@nextui-org/react";

const SubmitWriteup = () => {
	const [user, setUser, logout] = useUser();
	const isAdmin = user?.type === "admin";
	const [file, setFile] = useState<File>();
	const { type, isDark } = useTheme();

	async function uploadWriteup() {
        if (file.type !== "application/pdf" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && file.type !== "application/msword") {
            createErrorToast("File must be a PDF or Word Doc!", isDark);
            setFile(undefined);
            return;
        }
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async () => {
			try {
				const fileData = reader.result as string;
				const res = await ctfg.submitWriteup({
					content: fileData,
				});
				setFile(undefined);
				createSuccessToast("Submitted writeup!", isDark);
			} catch (err) {
				createErrorToast(err, isDark);
			}
		};
		reader.onerror = (error) => {
			createErrorToast(error, isDark);
		};
	}
	const inputRef = React.useRef(null);
	const [dragActive, setDragActive] = React.useState(false);

	return (
		<div
			className="flex flex-col justify-center items-center text-center gap-6"
			style={{
				height: "calc(100vh - 80px)",
			}}
		>
			<input
				ref={inputRef}
				className="hidden"
				type="file"
				onChange={(e) => {
					e.preventDefault();
					if (e.target.files.length === 0) return;
					setFile(e.target.files[0]);
				}}
			/>
			<div
				className="mx-8 py-24 px-36 border border-2 rounded-lg border-dashed"
				style={{
					backgroundColor: dragActive
						? 'white'
						: theme.colors.accents0.toString(),
					borderColor: theme.colors.accents4.toString(),
				}}
				onDragEnter={(e) => {
					e.preventDefault();
					setDragActive(true);
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					setDragActive(false);
				}}
				onDragOver={(e) => {
					e.preventDefault();
					setDragActive(true);
				}}
				onDrop={(e) => {
					e.preventDefault();
					setDragActive(false);
					if (e.dataTransfer.files.length === 0) return;
					setFile(e.dataTransfer.files[0]);
				}}
			>
				<Text className="text-3xl">Drag or drop a file here or</Text>
				<Link
					className="mt-4 text-2xl"
					onPress={() => inputRef.current.click()}
				>
					Upload a file
				</Link>
			</div>
            {file && <p className="text-2xl">Uploaded: <span className="font-thin">{file.name}</span></p>}
			<Button size="lg" onPress={() => uploadWriteup()}>
				Submit Writeup
			</Button>
		</div>
	);
};

export default SubmitWriteup;
