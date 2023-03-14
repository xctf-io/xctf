import { readable, Readable, writable } from "svelte/store";
import { ctfg } from "../service";

interface User {
	username: string;
}

export const user = writable<User | null>(null);
export const authSuccess = writable<string | null>(null);
export const authError = writable<string | null>(null);

export const logout = () => user.set(null);
export const login = async (email: string, password: string) => {
	try {
		const resp = await ctfg.Login({
			email,
			password,
		});
		user.set({
			username: resp.username,
		});
		authSuccess.set("Login success!")
	} catch (e) {
		authError.set(e.toString());
	}
};
export const register = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		const resp = await ctfg.Register({
			username,
			email,
			password,
		});
		authSuccess.set("Registration success! Go to login.")
	} catch (e) {
		authError.set(e);
	}
};
