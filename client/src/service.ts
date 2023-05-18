import { AdminClientJSON, BackendClientJSON } from "./rpc/ctfg.twirp";
import { FetchRPC } from "twirp-ts";

export const ctfg = new BackendClientJSON(
	FetchRPC({
		baseUrl: "/twirp/backend",
	}),
);

export const ctfgAdmin = new AdminClientJSON(
	FetchRPC({
		baseUrl: "/twirp/admin",
	}),
);
