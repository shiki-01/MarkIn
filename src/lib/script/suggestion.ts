// @ts-ignore
import { SvelteComponent } from 'svelte/internal';
import tippy, { type Instance } from 'tippy.js';
import type { Emoji } from '$lib/script/types.js';
import EmojiList from '$lib/components/EmojiList.svelte';
import type { Editor } from '@tiptap/core';

interface SuggestionProps {
	items: Emoji[];
	editor: Editor;
	clientRect: (() => DOMRect | null) | null | undefined;
}

export default {
	items: (props: {query: string; editor: Editor}) => {
		return props.editor.storage.emoji.emojis
			.filter(({ shortcodes, tags }: {shortcodes: string[]; tags: string[]}) => {
				return (
					shortcodes.find((shortcode) => shortcode.startsWith(props.query.toLowerCase())) ||
					tags.find((tag) => tag.startsWith(props.query.toLowerCase()))
				);
			})
			.slice(0, 5);
	},

	allowSpaces: false,

	render: () => {
		let component: SvelteComponent;
		let popup: Instance<any>[] = [];

		return {
			onStart: (props: SuggestionProps) => {
				const container = document.createElement('div');
				component = new EmojiList({
					target: container,
					props: {
						items: props.items,
						command: (payload: { name: string }) => {
							props.editor.chain().focus().insertContent(payload.name).run();
						},
						selectedIndex: 0,
					},
				});

				// @ts-ignore
				popup = tippy('body', {
					getReferenceClientRect: props.clientRect || (() => null),
					appendTo: () => document.body,
					content: container,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start',
				});
			},

			onUpdate(props: SuggestionProps) {
				component.$set({
					items: props.items,
				});

				popup[0].setProps({
					getReferenceClientRect: props.clientRect || (() => null),
				});
			},

			onKeyDown(props: { event: KeyboardEvent }) {
				if (props.event.key === 'Escape') {
					popup[0].hide();
					component.$destroy();
					return true;
				}

				// Handle key events
				return false;
			},

			onExit() {
				popup[0].destroy();
				component.$destroy();
			},
		};
	},
};
