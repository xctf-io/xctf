import {
	createConnectTransport,
} from "@connectrpc/connect-web";
import {createPromiseClient} from "@connectrpc/connect";
import {Admin, Backend} from "./rpc/xctf/xctf_connect";


// export const baseURL = process.env.BASE_URL;

export const transport = createConnectTransport({
	baseUrl: `/api`,
});

export const xctf = createPromiseClient(Backend, transport);
export const ctfgAdmin = createPromiseClient(Admin, transport);
