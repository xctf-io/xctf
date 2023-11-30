import React from "react";
import { useState } from "react";
import { createErrorToast, createSuccessToast, useUser } from "../store/user";
import { xctf } from "../service";

import { Button, Link} from "@nextui-org/react";
import { useDarkMode } from "usehooks-ts";

const SubmitWriteup = () => {
	const [user, setUser, logout] = useUser();
	const [file, setFile] = useState<File>();
	const { isDarkMode } = useDarkMode();

	async function uploadWriteup() {
		if (!file) {
			createErrorToast("No file selected!", isDarkMode);
			return;
		}
        if (file.type !== "application/pdf") {
            createErrorToast("File must be a PDF!", isDarkMode);
            setFile(undefined);
            return;
        }
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async () => {
			try {
				const fileData = reader.result as string;
				await xctf.submitWriteup({
					content: fileData,
				});
				setFile(undefined);
				createSuccessToast("Submitted writeup!", isDarkMode);
			} catch (err: any) {
				createErrorToast(err, isDarkMode);
			}
		};
		reader.onerror = (error) => {
			createErrorToast(String(error), isDarkMode);
		};
	}
	const inputRef = React.useRef<HTMLInputElement>(null);
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
					if(!e.target.files) return;
					if (e.target.files.length === 0) return;
					setFile(e.target.files[0]);
				}}
			/>
			<div
				className="mx-8 py-24 px-36 border-2 rounded-lg border-dashed"
				style={{
					backgroundColor: dragActive
						? 'white'
						: (isDarkMode ? "#18181b":  "#f4f4f5"),
					borderColor: (isDarkMode ? "#27272a" : "#d4d4d8")
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
				<p className="text-3xl">Drag and drop a file here or</p>
				<Link
					className="mt-4 text-2xl"
					onPress={(e) => {
						if (inputRef.current) {
							inputRef.current.click();
						}
					}} 
				>
					Upload a file
				</Link>
			</div>
            {file && <p className="text-2xl">Uploaded: <span className="font-thin">{file.name}</span></p>}
			<Button as={Link} color="primary" className="w-64 h-16 text-lg" onPress={() => uploadWriteup()}>
				Submit Writeup
			</Button>
		</div>
	);
};

export default SubmitWriteup;
