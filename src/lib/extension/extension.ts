import { Emoji, gitHubEmojis } from '@tiptap-pro/extension-emoji';
import suggestion from '$lib/extension/emoji/script/suggestion.js';
import Slash from '$lib/extension/slash/script/slash.js';
import slashSuggestions from '$lib/extension/slash/script/suggestion.js';

export const extension = [
	Emoji.configure({
		HTMLAttributes: undefined,
		forceFallbackImages: false,
		emojis: gitHubEmojis,
		enableEmoticons: true,
		suggestion,
	}),
	Slash.configure({
		suggestion: slashSuggestions,
	}),
];
