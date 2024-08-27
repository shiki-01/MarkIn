// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { SvelteComponent } from 'svelte/internal';
import tippy, { type Instance } from 'tippy.js';
import SlashCommandList from '$lib/extension/slash/components/SlashList.svelte';
import type { Command, SlashProps } from '$lib/script/types.js';

export default {
	items: ({ query }: { query: string }) => {
		return [
			{
				title: 'H1',
				subtitle: 'Big heading',
				icon: 'heading',
				command: ({ editor, range }: Command) => {
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setNode('heading', { level: 1 })
						.run();
				},
			},
			{
				title: 'H2',
				subtitle: 'Less Big heading',
				icon: 'heading',
				command: ({ editor, range }: Command) => {
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setNode('heading', { level: 2 })
						.run();
				},
			},
			{
				title: 'Bold',
				subtitle: 'bold',
				icon: 'bold',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setMark('bold').run();
				},
			},
			{
				title: 'Italic',
				subtitle: 'bold',
				icon: 'italic',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setMark('italic').run();
				},
			},
			{
				title: 'Underline',
				subtitle: 'bold',
				icon: 'underline',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setMark('underline').run();
				},
			},
			{
				title: 'Strike',
				subtitle: 'bold',
				icon: 'strike',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setMark('strike').run();
				},
			},
			{
				title: 'Link',
				subtitle: 'bold',
				icon: 'link',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setNode('link', { href: '' }).run();
				},
			},
			{
				title: 'Code',
				subtitle: 'bold',
				icon: 'code',
				command: ({ editor, range }: Command) => {
					editor.chain().focus().deleteRange(range).setMark('code').run();
				},
			},
		].filter(({ title }) => title.toLowerCase().startsWith(query.toLowerCase()));
	},

	allowSpaces: false,

	render: () => {
		let component: SvelteComponent;
		let popup: Instance<SlashProps>[] = [];

		return {
			onStart: (props: Command) => {
				const container = document.createElement('div');
				component = new SlashCommandList({
					target: container,
					props: {
						editor: props.editor,
						range: props.range,
						items: props.items,
					},
				});

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
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

			onUpdate(props: Command) {
				component.$set({
					editor: props.editor,
					range: props.range,
					items: props.items,
				});

				if (!props.clientRect) {
					return;
				}

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

				if (props.event.key === 'Enter') {
					props.event.preventDefault();
					return true;
				}

				return false;
			},

			onExit() {
				popup[0].destroy();
				component.$destroy();
			},
		};
	},
};
