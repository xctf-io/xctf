import React, {FC, useEffect, useState} from 'react';
import {xctfAdmin} from "@/service";
import toast from "react-hot-toast";
import {FileInfo} from "@/rpc/xctf/xctf_pb";
import {FileDrop} from "@/routes/build/FileDrop";
import {ArrowDownTrayIcon, EyeIcon, ShareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {copyTextToClipboard} from "@/util/copy";

export const FileManager: FC = () => {
    const [state, setState] = useState<{
        curFile: string|undefined,
        viewFile: boolean,
        files: FileInfo[],
    }>({
        curFile: undefined,
        viewFile: false,
        files: [],
    });
    useEffect(() => {
        void readdir();
    }, []);
    const readdir = async () => {
        try {
            const res = await xctfAdmin.readdir({
                path: "/",
            });
            setState({
                ...state,
                files: res.files,
            });
        } catch (e) {
            console.error(e);
            toast.error('Failed to read directory');
        }
    }
    const deleteCurFile = async () => {
        try {
            await xctfAdmin.remove({
                path: state.curFile
            })
            toast.success('removed file')
            void readdir();
        } catch (e: any) {
            toast.error(e.toString());
        }
    }
    const downloadFile = (url: string, filename: string) => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
    return (
        <div className={"flex flex-col"}>
            <div>
                <FileDrop onUpload={(file) => {
                    void readdir();
                }} />
            </div>
            <div className={"flex flex-row"}>
                <ul className="menu menu-xs h-fit bg-base-200 rounded-lg max-w-xs w-full">
                    {state.files.map((f) => (
                        <li key={f.name}>
                            <a onClick={() => setState({
                                ...state,
                                curFile: f.name,
                                viewFile: false,
                            })}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                {f.name}
                            </a>
                        </li>
                    ))}
                </ul>
                {state.curFile && (
                    <div className={"flex flex-col w-full"}>
                        <div className={"flex flex-row space-x-2"}>
                            <ShareIcon onClick={() => copyTextToClipboard(`/download/${state.curFile}`)} className={"h-6 w-6"} />
                            <EyeIcon onClick={() => {
                                setState({
                                    ...state,
                                    viewFile: true,
                                })
                            }} className={"h-6 w-6"} />
                            <ArrowDownTrayIcon onClick={() => {
                                if (state.curFile) {
                                downloadFile(`/download/${state.curFile}`, state.curFile);
                            }
                            }} className={"h-6 w-6"} />
                            <TrashIcon onClick={()=>document.getElementById('my_modal_2').showModal()} className={"h-6 w-6"} />
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <p>Are you sure you want to delete {state.curFile}?</p>
                                    <div className={"flex flex-row justify-between"}>
                                        <button className={"btn"}>no</button>
                                        <TrashIcon onClick={async () => {
                                            await deleteCurFile();
                                            document.getElementById('my_modal_2').close()
                                        }} className={"h-6 w-6"} />
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </div>
                            </dialog>
                        </div>
                        {state.viewFile && <iframe className={"w-full h-96"} src={`/download/${state.curFile}`} />}
                    </div>
                )}
            </div>
        </div>
    )
}