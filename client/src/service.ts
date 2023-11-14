import {
	createConnectTransport,
} from "@bufbuild/connect-web";
import {createPromiseClient} from "@bufbuild/connect";
import {Admin, Backend} from "./rpc/xctf/xctf_connect";


// export const baseURL = process.env.BASE_URL;

export const transport = createConnectTransport({
	baseUrl: `/api`,
});

export const ctfg = createPromiseClient(Backend, transport);
export const ctfgAdmin = createPromiseClient(Admin, transport);
