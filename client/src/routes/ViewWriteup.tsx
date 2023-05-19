import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ctfgAdmin } from "../service";

const ViewWriteup = () => {
	const { name } = useParams();
	const [writeup, setWriteup] = useState("");

	useEffect(() => {
		async function getWriteup() {
			const wp = await ctfgAdmin.GetWriteup({ username: name });
			setWriteup(wp.content);
		}
		getWriteup();
	}, []);

	return (
		<div>
			<p>name: {name}</p>
			<p>writeup: {writeup}</p>
		</div>
	);
};

export default ViewWriteup;
