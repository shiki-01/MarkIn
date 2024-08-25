import tippy, { type Instance, type Props } from 'tippy.js';
import EmojiList from '$lib/components/EmojiList.svelte';

export default {
	items: ({ editor, query }: { editor: never; query: string }) => {
		return editor.storage.emoji.emojis
			.filter(({ shortcodes, tags }: { shortcodes: string[]; tags: string[] }) => {
				return (
					shortcodes.find((shortcode: string) =>
						shortcode.startsWith(query.toLowerCase()),
					) || tags.find((tag: string) => tag.startsWith(query.toLowerCase()))
				);
			})
			.slice(0, 5);
	},

	allowSpaces: false,

	render: () => {
		let component: EmojiList;
		let popup: Instance<Props>[];

		return {
			onStart: (props: {
				items: never[];
				command: never;
				editor: never;
				clientRect: DOMRect;
			}) => {
				component = new EmojiList({
					target: document.body,
					props: {
						items: props.items,
						command: props.command,
						editor: props.editor,
					},
				});

				popup = tippy(document.body, {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.$$.fragment,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start',
				});
			},

			onUpdate(props: {
				items: never[];
				command: never;
				editor: never;
				clientRect: DOMRect;
			}) {
				component.$set({
					items: props.items,
					command: props.command,
					editor: props.editor,
				});

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				});
			},

			onKeyDown(props: { event: { key: string } }) {
				if (props.event.key === 'Escape') {
					popup[0].hide();
					component.$destroy();

					return true;
				}

				return component.$$.ctx.onKeyDown(props.event);
			},

			onExit() {
				popup[0].destroy();
				component.$destroy();
			},
		};
	},
};
