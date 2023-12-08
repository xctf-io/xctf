import React, {useEffect} from "react";
import { useState } from "react";
import { createErrorToast, createSuccessToast, useUser } from "../store/user";
import { xctf } from "../service";

import { useDarkMode } from "usehooks-ts";

const SubmitWriteup = () => {
	const [writeup, setWriteup] = useState('');
	const [user, setUser, logout] = useUser();
	const [file, setFile] = useState<File>();
	const { isDarkMode } = useDarkMode();

	useEffect(() => {
		 xctf.getUserWriteup({}).then((res) => {
			 setWriteup(res.content);
		 }).catch((err) => {
			 createErrorToast(err, isDarkMode);
		 });
	}, []);

	const uploadWriteup = async () => {
		try {
			await xctf.submitWriteup({
				content: writeup,
				type: "text",
			});
			createSuccessToast("Submitted writeup!", isDarkMode);
		} catch (err: any) {
			createErrorToast(err, isDarkMode);
		}
	}

	async function uploadFileWriteup() {
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
					type: "file",
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
				className="mx-8 py-28 px-36 border-2 rounded-lg border-dashed"
				style={{
					backgroundColor: dragActive
						? 'white'
						: (isDarkMode ? "#1A1E23":  "#f4f4f5"),
					borderColor: (isDarkMode ? "#16191E" : "#d4d4d8")
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
				<p className="text-3xl mb-2">Drag and drop a file here or</p>
				<a
					className="link link-primary mt-4 text-2xl"
					onClick={(e) => {
						if (inputRef.current) {
							inputRef.current.click();
						}
					}} 
				>
					Upload a file
				</a>
			</div>
            {file && <p className="text-2xl">Uploaded: <span className="font-thin">{file.name}</span></p>}
			<button className="btn btn-primary w-64 h-16 text-lg" onClick={() => uploadWriteup()}>
				Submit Writeup
			</button>
		</div>
	);
};

export default SubmitWriteup;
