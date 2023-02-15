import { writable } from "svelte/store";

type Page = {
  route: string;
  title: string;
  content: string;
};

export const pages = writable<Page[] | null>(null);
