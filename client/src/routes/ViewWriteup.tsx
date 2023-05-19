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
            console.log(wp);
		}
		getWriteup();
	}, []);

	return <div>{name}</div>;
};

export default ViewWriteup;
