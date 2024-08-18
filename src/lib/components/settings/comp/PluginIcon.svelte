<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Checkbox } from "$lib/components/ui/checkbox";
	import type { Plugin } from '$lib/types.js';

	export let plugin: Plugin;
	export let select: boolean = false;
	export let isActive: boolean = false;
</script>

{#if plugin}
	<div class="flex items-center space-x-4 p-2 rounded-sm {select ? 'bg-accent' : ''}" on:click>
		<Checkbox bind:checked={isActive} />
		<Avatar.Root class="ml-2">
			<Avatar.Image src={plugin.icon} alt={plugin.name} />
		</Avatar.Root>
		<div class="flex flex-col space-y-1">
			<h2>{plugin.name}</h2>
			<div class="flex flex-row space-x-2">
				<p class="text-[.8em]">{plugin.author}</p>
				<p class="text-[.8em]">{plugin.license}</p>
			</div>
		</div>
	</div>
{:else}
	<Avatar.Root size="large" />
{/if}