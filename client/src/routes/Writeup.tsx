import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../store/user";
import { ctfg } from "../service";

import { Button, Input, theme, useTheme } from "@nextui-org/react";
import { read } from "fs";

const Writeup = () => {
	const [user, setUser, logout] = useUser();
	const isAdmin = user?.type === "admin";
    const themeColor = isAdmin ? "error" : "primary";
    const [file, setFile] = useState()
    console.log(file);

    async function uploadWriteup() {
        // read file
        const reader = new FileReader();
        let fileData = ""
        reader.readAsDataURL(file);
        reader.onload = async () => {
            fileData = window.btoa(String.fromCharCode.apply(null, [reader.result]));
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
        // submit writeup

        const res = await ctfg.SubmitWriteup({
            username: user.username,
            content: fileData
        });
        console.log(res);
        console.log(fileData);
    }

	return (
		<div
			className="flex flex-col justify-center items-center"
			style={{
				height: "calc(100vh - 64px)",
			}}
		>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <Button color={themeColor} size="xl" onPress={() => uploadWriteup()}>
				Submit Writeup
			</Button>
		</div>
	);
};

export default Writeup;
