import { useState } from "react";
import { ctfg } from "../service";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

export const createToast = (success: string, error: string, isDark: boolean) => {
	const theme = isDark ? "dark" : "light";

	if (success) {
		toast.success(success, { theme: theme, autoClose: 2000 });
	}
	if (error) {
		toast.error(error, { theme: theme, autoClose: 2000 });
	}
};

interface User {
	username: string;
}
const userAtom = atomWithStorage<User | null>("user", null);

export const useUser = (): [
	User | null,
	(u: User | null) => void,
	() => void
] => {
	const [user, setUser] = useAtom(userAtom);
	const logout = () => {
		setUser(null);
	};
	return [user, setUser, logout];
};

export const useAuthStatus = (): [
	string | null,
	(string) => void,
	string | null,
	(string) => void
] => {
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	return [success, setSuccess, error, setError];
};

export const useLogin = (): [
	(email: string, password: string, isDark: boolean) => void,
	string,
	string
] => {
	const [user, setUser] = useUser();
	const [success, setSuccess, error, setError] = useAuthStatus();

	const login = async (email: string, password: string, isDark: boolean) => {
		try {
			const resp = await ctfg.Login({
				email,
				password,
			});
			setUser({
				username: resp.username,
			});
			createToast("Login success!", null, isDark);
			document.location.href = "/evidence";
		} catch (e) {
			createToast(null, e.toString(), isDark);
		}
		createToast(success, error, isDark);
	};
	return [login, success, error];
};

export const useRegister = (): [
	(username: string, email: string, password: string, isDark: boolean) => void,
	string,
	string
] => {
	const [success, setSuccess, error, setError] = useAuthStatus();

	const register = async (
		username: string,
		email: string,
		password: string,
		isDark: boolean
	) => {
		try {
			const resp = await ctfg.Register({
				username,
				email,
				password,
			});
			createToast("Registration success!", null, isDark);
		} catch (e) {
			createToast(null, e.toString(), isDark);
		}
	};
	return [register, success, error];
};
