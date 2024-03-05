import toast from "react-hot-toast";

export async function copyTextToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Text copied to clipboard');
    } catch (err: any) {
        toast.error(err.toString());
    }
}
