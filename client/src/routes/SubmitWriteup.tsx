import React, {useEffect, useMemo} from "react";
import { useState } from "react";
import { useUser } from "../store/user";
import { xctf } from "../service";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { PartialBlock, Block, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/react/style.css";

import toast from "react-hot-toast";

const SubmitWriteup = () => {
	const [writeup, setWriteup] = useState('');
	const [user, setUser, logout] = useUser();
	const [file, setFile] = useState<File>();
	const [activeTab, setActiveTab] = React.useState<string>('edit');

	// const tabs = ['edit', 'upload'];
	const tabs = ['edit'];

	const [initialContent, setInitialContent] = useState<
		PartialBlock[] | undefined | "loading"
	>("loading");

	useEffect(() => {
		localStorage.setItem("editorContent", writeup);
		const handler = setTimeout(() => {
			void uploadWriteup(writeup);
		}, 5000);
		return () => {
			clearTimeout(handler);
		}
	}, [writeup]);

	async function loadFromStorage() {
		const storageString = localStorage.getItem("editorContent");
		return storageString
			? (JSON.parse(storageString) as PartialBlock[])
			: [
				{
					type: "paragraph",
					content: "Document the evidence you find here!"
				}
			] as PartialBlock[];
	}

	// useEffect(() => {
	// 	loadFromStorage().then((content) => {
	// 		setInitialContent(content);
	// 	});
	// }, []);

	useEffect(() => {
		 xctf.getUserWriteup({}).then((res) => {
			 try {
				 const c = res.content
					 ? (JSON.parse(res.content) as PartialBlock[])
					 : undefined;
				 setInitialContent(c);
			 } catch (e: any) {
				 console.error('could not load writeup from server', e)
				 loadFromStorage().then((content) => {
					 setInitialContent(content);
				 }).catch((e) => {
					 toast.error('failed to load writeup');
				 })
			 }
		 }).catch((err) => {
			 toast.error(err.toString());
		 });
	}, []);

	// TODO breadchris https://www.blocknotejs.org/examples/basic/file-uploading
	const editor = useMemo(() => {
		if (initialContent === "loading") {
			return undefined;
		}
		return BlockNoteEditor.create({ initialContent });
	}, [initialContent]);

	const uploadWriteup = async (w: string) => {
		try {
			await xctf.submitWriteup({
				content: w,
				type: "text",
			});
			toast.success("Submitted writeup!");
		} catch (err: any) {
			toast.error(err.toString());
		}
	}

	async function uploadFileWriteup() {
		if (!file) {
			toast.error("No file selected!");
			return;
		}
        if (file.type !== "application/pdf") {
            toast.error("File must be a PDF!");
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
				toast.success("Submitted writeup!");
			} catch (err: any) {
				toast.error(err);
			}
		};
		reader.onerror = (error) => {
			toast.error(String(error));
		};
	}
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = React.useState(false);

	if (!editor) {
		return <p>Loading writeup...</p>
	}

	return (
		<div className={"mx-6"}>
			{/*<div className="w-full tabs tabs-bordered my-6">*/}
			{/*	{tabs.map((tab, index) => (*/}
			{/*		<a*/}
			{/*			className={`tab ${activeTab === tab ? 'tab-active' : ''}`}*/}
			{/*			key={index}*/}
			{/*			onClick={() => setActiveTab(tab)}*/}
			{/*		>*/}
			{/*			{tab}*/}
			{/*		</a>*/}
			{/*	))}*/}
			{/*</div>*/}
			{activeTab === 'edit' && (
				<>
					<button className={"btn btn-info"} onClick={() => editor && setWriteup(JSON.stringify(editor.document))}>save</button>
					<BlockNoteView
						editor={editor}
						onChange={() => {
							setWriteup(JSON.stringify(editor.document));
						}}
					/>
				</>
			)}
			{activeTab === 'upload' && (
				<div
					className="flex flex-col justify-center items-center text-center gap-6"
					style={{
						height: "calc(100vh - 86px)",
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
						className={`mx-8 py-28 px-36 border-4 rounded-lg border-dashed bg-base-200 border-base-300`}
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
					<button className="btn btn-primary w-64 h-16 text-lg" onClick={() => uploadFileWriteup()}>
						Submit Writeup
					</button>
				</div>
			)}
		</div>
	);
};

export default SubmitWriteup;
