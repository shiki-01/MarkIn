<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let items = [];
	export let command;

	let selectedIndex = 0;
	createEventDispatcher();

	const selectItem = (index) => {
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

	const onKeyDown = (event) => {
		if (event.key === 'ArrowUp') {
			upHandler();
			return true;
		}
		if (event.key === 'ArrowDown') {
			downHandler();
			return true;
		}
		if (event.key === 'Enter') {
			enterHandler();
			return true;
		}
		return false;
	};

	onMount(() => {
		selectedIndex = 0;
		window.addEventListener('keydown', onKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown);
	});
</script>

<div class="dropdown-menu">
	{#each items as item, index}
		<button
			class:is-selected={index === selectedIndex}
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
    .is-selected {
        background-color: #b3d4fc;
    }
</style>