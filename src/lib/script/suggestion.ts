declare module 'svelte/internal';
import { SvelteComponent } from 'svelte/internal';
import tippy, { Instance } from 'tippy.js';
import EmojiList from '$lib/components/EmojiList.svelte';

interface SuggestionProps {
	editor: any;
	clientRect: () => DOMRect;
}

export default {
	items: ({ editor, query }: SuggestionProps) => {
		return editor.storage.emoji.emojis
			.filter(({ shortcodes, tags }) => {
				return (
					shortcodes.find((shortcode) => shortcode.startsWith(query.toLowerCase())) ||
					tags.find((tag) => tag.startsWith(query.toLowerCase()))
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
				component = new EmojiList({
					target: document.createElement('div'),
					props: {
						items: props.items,
						command: (payload: { name: string }) => {
							// Implement command handling here
						},
					},
				});

				popup = tippy('body', {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.$$.fragment,
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
					getReferenceClientRect: props.clientRect,
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
