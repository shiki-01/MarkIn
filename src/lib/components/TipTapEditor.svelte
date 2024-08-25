<script lang="ts">
	import '$lib/style/TipTap.scss';
	import { style } from '$lib/style/style.js';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	export let content: string = '';
	export let handleClick: () => void;
	export let focus: boolean = false;

	let element: HTMLDivElement;
	let editor: Editor;
	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'prose w-full h-full p-2',
				},
			},
			element: element,
			extensions: [StarterKit, ...style],
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
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
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex gap-2 px-5">
		{#if editor}
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={editor.isActive('heading', { level: 1 })}
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
			>
				H2
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class:active={editor.isActive('paragraph')}
			>
				P
			</button>
		{/if}
	</div>

	<div on:click={handleClick} class="w-full h-full px-5">
		<div bind:this={element} class="w-full h-full border-2 border-y-amber-300 {focus ? 'block' : 'hidden'}" />
		{#if !focus}
			<div class="w-full h-full border-2 p-2 border-gray-300">{@html content}</div>
		{/if}
	</div>
</div>


<style>
    button.active {
        background: black;
        color: white;
    }
</style>
