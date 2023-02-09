import { writable } from "svelte/store";

type Evidence = {
  name: string;
};

export const evidence = writable<Evidence[] | null>(null);
