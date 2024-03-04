import React, {ChangeEvent, useCallback, useState} from 'react';
import toast from "react-hot-toast";
import {xctf} from "@/service";

async function uploadFormFile(path: string, file: Blob): Promise<string> {
    try {
        const res = await xctf.signedURL({
            path: file.name,
        })

        // TODO breadchris use signed upload for local files, see pkg/bucket
        if (res.url === '/upload') {
            res.url += `?name=${file.name}`
        }

        const response = await fetch(res.url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
        }
        toast.success('uploaded file')
    } catch (e: any) {
        toast.error(e.toString());
    }
    return file.name;
}

export const FileDrop: React.FC<{
    children?: React.ReactNode;
    onUpload: (file: string) => void;
}> = ({children, onUpload}) => {
    const [isDragging, setIsDragging] = useState(false);

    const uploadFile = async (file: globalThis.File) => {
        try {
            const res = await uploadFormFile('/', file);
            onUpload(res);
        } catch (e) {
            toast.error('Failed to upload file');
            console.error(e);
        }
    }

    const onDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            uploadFile(file);
        }
    }, []);
    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Check if files are selected and if the first file exists
        if (event.target.files && event.target.files[0]) {
            // Update state with the selected file
            const file = event.target.files[0];
            if (file) {
                uploadFile(file);
            }
        }
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            style={{
                border: isDragging ? '2px dashed #cccccc' : '',
            }}
        >
            <div
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
            </div>
        </div>
    );
};
