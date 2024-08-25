<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Emoji } from '$lib/script/types.js';

	export let items: Emoji[] = [];
	export let command: (payload: { name: string }) => void;
	export let selectedIndex: number = 0;

	const dispatch = createEventDispatcher();

	const selectItem = (index: number) => {
		const item = items[index];
		if (item) {
			command({ name: item.name });
		}
	};

	const upHandler = () => {
		selectedIndex = (selectedIndex + items.length - 1) % items.length;
	};

	const downHandler = () => {
		selectedIndex = (selectedIndex + 1) % items.length;
	};

	const enterHandler = () => {
		selectItem(selectedIndex);
	};

	onMount(() => {
		selectedIndex = 0;
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			upHandler();
			event.preventDefault();
		} else if (event.key === 'ArrowDown') {
			downHandler();
			event.preventDefault();
		} else if (event.key === 'Enter') {
			enterHandler();
			event.preventDefault();
		}
	}

	document.addEventListener('keydown', handleKeyDown);
</script>

<div class="dropdown-menu">
	{#each items as item, index}
		<button
			class:selected={index === selectedIndex}
			on:click={() => selectItem(index)}
		>
			{#if item.fallbackImage}
				<img src={item.fallbackImage} alt="" />
			{:else}
				{item.emoji}
			{/if}
			:{item.name}:
		</button>
	{/each}
</div>

<style>
    .selected {
        background-color: #b3d4fc;
    }
</style>