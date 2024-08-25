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
			content: `
			<p>
        These <span data-type="emoji" data-name="smiley"></span>
        are <span data-type="emoji" data-name="fire"></span>
        some <span data-type="emoji" data-name="smiley_cat"></span>
        emojis <span data-type="emoji" data-name="exploding_head"></span>
        rendered <span data-type="emoji" data-name="ghost"></span>
        as <span data-type="emoji" data-name="massage"></span>
        inline <span data-type="emoji" data-name="v"></span>
        nodes.
      </p>
      <p>
        Type <code>:</code> to open the autocomplete.
      </p>
      <p>
        Even <span data-type="emoji" data-name="octocat"></span>
        custom <span data-type="emoji" data-name="trollface"></span>
        emojis <span data-type="emoji" data-name="neckbeard"></span>
        are <span data-type="emoji" data-name="rage1"></span>
        supported.
      </p>
      <p>
        And unsupported emojis (without a fallback image) are rendered as just the shortcode <span data-type="emoji" data-name="this_does_not_exist"></span>.
      </p>
      <pre><code>In code blocks all emojis are rendered as plain text. 👩‍💻👨‍💻</code></pre>
      <p>
        There is also support for emoticons. Try typing <code><3</code>.
      </p>
			`,
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
			<div class="tiptap w-full h-full border-2 p-2 border-gray-300">{@html content}</div>
		{/if}
	</div>
</div>


<style>
    button.active {
        background: black;
        color: white;
    }
</style>
