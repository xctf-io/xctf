import { useState } from "react";
import { ctfg } from "../service";
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'

interface User {
	username: string;
}
const userAtom = atomWithStorage<User | null>('user', null)

export const useUser = (): [User | null, (u: User | null) => void, () => void] => {
	const [user, setUser] = useAtom(userAtom);
	const logout = () => setUser(null);
	return [user, setUser, logout];
};

export const useAuthStatus = (): [string | null, (string) => void, string | null, (string) => void] => {
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	return [success, setSuccess, error, setError];
};

export const useLogin = (): [(email: string, password: string) => void, string, string] => {
	const [user, setUser] = useUser();
	const [success, setSuccess, error, setError] = useAuthStatus();

	const login = async (email: string, password: string) => {
		try {
			const resp = await ctfg.Login({
				email,
				password,
			});
			setUser({
				username: resp.username,
			});
			setSuccess("Login success!");
		} catch (e) {
			setError(e.toString());
		}
	};
	return [login, success, error];
};

export const useRegister = (): [(username: string, email: string, password: string) => void, string, string] => {
	const [success, setSuccess, error, setError] = useAuthStatus();

	const register = async (username: string, email: string, password: string) => {
		try {
			const resp = await ctfg.Register({
				username,
				email,
				password,
			});
			setSuccess("Registration success! Go to login.");
		} catch (e) {
			setError(e.toString());
		}
	};
	return [register, success, error];
};
