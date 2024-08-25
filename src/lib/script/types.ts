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
			startUpPage: 'default' | 'last' | 'custom';
			default: 'home' | 'search' | 'settings' | 'plugins' | 'about' | 'shortcuts';
		};
		privacy: {
			history: boolean;
		};
	};
	notification: {
		notification: boolean;
	};
	shortcuts: { [key: string]: Shortcut };
	appearance: {
		theme: 'light' | 'dark' | 'system';
		accentColor: string;
		font: {
			name: string;
			id: string;
		};
		fontSize: string;
	};
	plugins: Plugin[];
	language: 'en' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pl' | 'pt' | 'ru' | 'tr' | 'zh';
	vcs: {
		github: {
			isConnected: boolean;
			username: string;
			token: string;
		};
	};
};

export type Editor = {
	type: Focus;
	content: string;
} | null;

export type Focus = 'Markdown' | 'HTML';

export type Emoji = {
	fallbackImage?: string;
	emoji: string;
	name: string;
};

export type RichText = {
	type: "rich";
	content: { text: string; style: TextStyle; }[]
} | {
	type: "plain";
	content: Plain;
}

export type RichBase = {
	heading?: "h1" | "h2" | "h3";
	text: { type: "plain"; content: { text: string; }; };
} | {
	heading: null;
	blockquote?: boolean;
	list?: "bullet" | "ordered";
	details?: { summary: string; content: RichText; };
	task?: { checked: boolean; };
	text: RichText;
}

export type Plain = {
	text: string;
	code?: boolean;
	codeBlock?: { language: string };
	emoji?: boolean;
	hardBreak?: boolean;
	horizontalRule?: boolean;
	image?: boolean;
}

export type TextStyle = {
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strike?: boolean;
	highlight?: boolean;
	subscript?: boolean;
	superscript?: boolean;
	color?: string;
	link?: string;
}

export type Table = {
	align: "horizon" | "vertical";
	header: { text: TextStyle[]; span: number; }[];
	body: { text: TextStyle[]; span: number; }[][];
}

export type EditorContent = {
	type: "table";
	content: Table;
} | {
	type: "text";
	content: RichBase;
}

