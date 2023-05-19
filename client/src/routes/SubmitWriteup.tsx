import React from "react";
import { useState } from "react";
import { createErrorToast, createSuccessToast, useUser } from "../store/user";
import { ctfg } from "../service";

import { Button, useTheme } from "@nextui-org/react";

const SubmitWriteup = () => {
	const [user, setUser, logout] = useUser();
	const isAdmin = user?.type === "admin";
    const themeColor = isAdmin ? "error" : "primary";
    const [file, setFile] = useState()
    const { type, isDark } = useTheme();

    async function uploadWriteup() {
        // read file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            try {
                const fileData = reader.result as string;
                console.log(fileData);
                const res = await ctfg.SubmitWriteup({
                    content: fileData
                });
                createSuccessToast("Submitted writeup!", isDark);
            } catch (err) {
                createErrorToast(err, isDark);
            }
        }
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

	return (
		<div
			className="flex flex-col justify-center items-center"
			style={{
				height: "calc(100vh - 64px)",
			}}
		>
            <input className="mx-0 w-64" type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <Button color={themeColor} size="xl" onPress={() => uploadWriteup()}>
				Submit Writeup
			</Button>
		</div>
	);
};

export default SubmitWriteup;
