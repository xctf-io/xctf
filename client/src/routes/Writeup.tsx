import React from "react";
import { useEffect, useState } from "react";
import { createErrorToast, createSuccessToast, useUser } from "../store/user";
import { ctfg } from "../service";

import { Button, Input, theme, useTheme } from "@nextui-org/react";
import { read } from "fs";

const Writeup = () => {
	const [user, setUser, logout] = useUser();
	const isAdmin = user?.type === "admin";
    const themeColor = isAdmin ? "error" : "primary";
    const [file, setFile] = useState()
    const { type, isDark } = useTheme();

    async function uploadWriteup() {
        // read file
        const reader = new FileReader();
        let fileData = ""
        reader.readAsDataURL(file);
        reader.onload = async () => {
            fileData = window.btoa(reader.result.toString());
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };

        try {
            const res = await ctfg.SubmitWriteup({
                username: user.username,
                content: fileData
            });
            createSuccessToast("Submitted writeup!", isDark);
        } catch (err) {
            createErrorToast(err, isDark);
        }
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
