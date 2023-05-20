import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ctfgAdmin } from "../service";
import { createErrorToast } from "../store/user";
import { useTheme } from "@nextui-org/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./Writeup.css";

const ViewWriteup = () => {
	const { name } = useParams();
	const [writeup, setWriteup] = useState("");
	const { type, isDark } = useTheme();

	useEffect(() => {
		async function getWriteup() {
			try {
				const wp = await ctfgAdmin.GetWriteup({ username: name });
				setWriteup(wp.content);
			} catch (error) {
				createErrorToast("User does not have a writeup", isDark);
			}
		}
		getWriteup();
	}, []);

	const docs = [
		{ uri: writeup, fileName: name },
		{ uri: writeup, fileName: name },
	];

	return (
		<div>
			<DocViewer
				documents={docs}
				pluginRenderers={DocViewerRenderers}
				style={{
                    height: "calc(100vh - 90px)",
                    width: "50%"
                }}
                theme={{
                    primary: isDark ? "#fff" : "#000",
                }}
            />
		</div>
	);
};

export default ViewWriteup;
