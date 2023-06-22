import { useState } from "react";
import { ctfg } from "../service";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

export const createSuccessToast = (success: string, isDark: boolean) => {
	const theme = isDark ? "dark" : "light";
	toast.success(success, { theme: theme, autoClose: 2000 });
};

export const createErrorToast = (error: string, isDark: boolean) => {
	const theme = isDark ? "dark" : "light";
	toast.error(error, { theme: theme, autoClose: 2000 });
};

export const createCelebrateToast = (celebrate: string, isDark: boolean) => {
	const theme = isDark ? "dark" : "light";
	toast(celebrate, { theme: theme, autoClose: 2000 });
};

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
		ctfg.Logout({});
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
				type: resp.userRole,
			});
			console.log(resp.userRole)
			createSuccessToast("Login success!", isDark);
		} catch (e) {
			createErrorToast(e.toString(), isDark);
		}
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
			createSuccessToast("Registration success!", isDark);
		} catch (e) {
			createErrorToast(e.toString(), isDark);
		}
	};
	return [register, success, error];
};
