<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	export let hasChanges: boolean = false;
	const dispatch = createEventDispatcher();

	function handleSave() {
		dispatch('save');
	}
</script>

{#if hasChanges}
	<Button on:click={handleSave}>Save</Button>
{:else}
	<Button disabled class="cursor-not-allowed">Save</Button>
{/if}