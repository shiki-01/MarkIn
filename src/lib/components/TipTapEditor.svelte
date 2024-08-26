<script lang="ts">
	import '$lib/style/TipTap.scss';
	import 'katex/dist/katex.min.css';
	import { style } from '$lib/style/style.js';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { type AnyExtension, Editor } from '@tiptap/core';
	import {
		getHierarchicalIndexes,
		type TableOfContentData,
		TableOfContents,
	} from '@tiptap-pro/extension-table-of-contents';
	import StyleButton from '$lib/components/StyleButton.svelte';

	export let content: string = '';
	export let handleClick: () => void;
	export let focus: boolean = false;

	const dispatch = createEventDispatcher();
	let element: HTMLDivElement;
	let editor: Editor;
	let items: TableOfContentData | [] = [];

	$: console.log(items);

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'prose w-full h-full p-2',
				},
			},
			element: element,
			extensions: [
				TableOfContents.configure({
					getIndex: getHierarchicalIndexes,
					onUpdate(content) {
						items = content;
					},
				}),
				...(style as AnyExtension[]),
			],
			content: content,
			onTransaction: () => {
				dispatch('contentChange', editor.getHTML());
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex gap-2 px-5">
		{#if editor}
			<StyleButton {editor} />
		{/if}
	</div>

	<div role="button" tabindex="0" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()}
		 class="w-full h-full px-5">
		<div bind:this={element} class="w-full h-full border-2 {focus ? 'block' : 'hidden'}" />
		{#if !focus}
			<div class="tiptap w-full h-full border-2 p-2 border-gray-300">{content}</div>
		{/if}
	</div>
</div>