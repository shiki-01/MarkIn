export type Plugin = {
	active: boolean;
	name: string;
	icon: string;
	description: string;
	version: string;
	author: string;
	license: string;
	gitrepo: string;
} | null;

export type Shortcut = {
	id: string;
	active: boolean;
	command: string;
	isChange: boolean;
	system: string;
	description: string;
	title: string;
	shortcuts?: { [key: string]: Shortcut };
};

export type Config = {
	personal: {
		startUp: {
			startUpPage: "default" | "last" | "custom";
			default: "home" | "search" | "settings" | "plugins" | "about" | "shortcuts";
		}
		privacy: {
			history: boolean;
		}
	}
	notification: {
		notification: boolean;
	}
	shortcuts: { [key: string]: Shortcut }
	appearance: {
		theme: "light" | "dark" | "system";
		accentColor: string;
		font: {
			name: string;
			id: string;
		}
		fontSize: string;
	}
	plugins: Plugin[];
	language: 'en' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pl' | 'pt' | 'ru' | 'tr' | 'zh';
	vcs: {
		github: {
			isConnected: boolean;
			username: string;
			token: string;
		}
	}
}