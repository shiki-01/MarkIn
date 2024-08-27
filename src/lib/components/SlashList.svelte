<svelte:options accessors={true} />

<script lang="ts">
	import type { Editor, Range } from '@tiptap/core';
	import type { CommandItem } from '$lib/script/types.js';

	export let editor: Editor, range: Range, items: CommandItem[];
	let selectedIndex = 0;
	let elements = []

	$: {
		if (elements[0] != null) {
			elements[selectedIndex]?.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			})
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;
			return true;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;
			return true;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			const item = items[selectedIndex];
			if (item) {
				item.command({editor, range});
			}
			return true;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
	class="dropdown-menu"
	tabindex="-1"
	role="listbox"
	aria-labelledby="slash-command-menu"
	aria-activedescendant="listbox-option-0"
>
	{#each items as {title, subtitle, command}, i}
		<button
			id="listbox-option-0"
			class:selected={selectedIndex === i}
			on:mouseenter={() => selectedIndex = i}
			on:click={() => command({editor, range})}
			bind:this={elements[i]}
		>
			{title}: {subtitle}
		</button>
	{/each}
</div>

<style>
    .dropdown-menu {
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    button {
        display: block;
        width: 100%;
        padding: 8px;
        text-align: left;
        border: none;
        background: none;
    }

    button:hover, .selected {
        background: #f0f0f0;
    }
</style>