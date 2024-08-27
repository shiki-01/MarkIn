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
	import Bubble from '$lib/components/Bubble.svelte';
	import BubbleMenu from '@tiptap/extension-bubble-menu';

	export let content: string = '';
	export let handleClick: () => void;
	export let focus: boolean = false;

	const dispatch = createEventDispatcher();
	let element: HTMLDivElement;
	let editor: Editor;
	let items: TableOfContentData | [] = [];

	$: console.log(content);

	$: if (editor && !focus) {
		editor.commands.setContent(content);
	}

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
				BubbleMenu.configure({
					element: window.document.querySelector('.bubble-menu'),
				}),
				...(style as AnyExtension[]),
			],
			content: content,
			onTransaction: () => {
				editor = editor;
				dispatch('contentChange', editor.getHTML());
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			editor.commands.clearNodes();
		}
	}
</script>

<svelte:window on:keydown={handleEnter} />

<div class="w-full h-full flex flex-col">
	<div class="bubble-menu" style="visibility: hidden">
		{#if editor}
			<Bubble editor={editor} />
		{/if}
	</div>
	<div role="button" tabindex="0" on:click={() => {handleClick()}}
		 on:keydown={(e) => e.key === 'Enter' && handleClick()}
		 class="w-full h-full px-5 cursor-text">
		<div bind:this={element} class="w-full h-full border-2 overflow-y-auto" />
	</div>
</div>