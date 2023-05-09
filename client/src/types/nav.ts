import type { ComponentType } from "react";

export interface NavLink {
	label: string;
	to: string;
	Component: ComponentType<any>;
	showWhenAuthed: boolean;
	hideWhenUnauthed?: boolean;
}
