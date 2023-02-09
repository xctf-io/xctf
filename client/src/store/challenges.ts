import { writable } from "svelte/store";

type Challenge = {
	name: string;
	description: string;
	value: number;
};

export const challenges = writable<Challenge[] | null>(null);
