import { Dispatch, SetStateAction, useState } from "react";
import { xctf } from "../service";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

interface User {
	username: string;
	type: string;
}
const userAtom = atomWithStorage<User | null>("user", null);

export const useUser = (): [
	User | null,
	(u: User | null) => void,
	() => void
] => {
	const [user, setUser] = useAtom(userAtom);
	const logout = () => {
		xctf.logout({});
		setUser(null);
		document.location.href = "/";
	};
	return [user, setUser, logout];
};

export const useAuthStatus = () => {
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	return [success, setSuccess, error, setError];
};

export const useLogin = (): [
	(email: string, password: string) => void,
	string | Dispatch<SetStateAction<string | null>> | null,
	string | Dispatch<SetStateAction<string | null>> | null
] => {
	const [user, setUser] = useUser();
	const [success, setSuccess, error, setError] = useAuthStatus();

	const login = async (email: string, password: string) => {
		try {
			const resp = await xctf.login({
				email,
				password,
			});
			setUser({
				username: resp.username,
				type: resp.userRole,
			});
			console.log(resp.userRole)
			toast.success("Login success!");
		} catch (e: any) {
			toast.error(e.toString());
		}
	};
	return [login, success, error];
};

export const useRegister = (): [
	(username: string, email: string, password: string) => Promise<boolean>,
	string | Dispatch<SetStateAction<string | null>> | null,
	string | Dispatch<SetStateAction<string | null>> | null
] => {
	const [success, setSuccess, error, setError] = useAuthStatus();

	const register = async (
		username: string,
		email: string,
		password: string,
	) => {
		try {
			const resp = await xctf.register({
				username,
				email,
				password,
			});
			toast.success("Registration success!");
			return true
		} catch (e: any) {
			toast.error(e.toString());
			return false
		}
	};
	return [register, success, error];
};
