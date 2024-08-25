<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';

	type Item = { href: string; title: string };

	let className: string | undefined | null = undefined;
	export let items: Item[];
	export let isOpened: string | null = null;
	export { className as class };

	let activeTab = isOpened || items[0];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});

	function changeTab(target: Item) {
		return () => {
			activeTab = target.title;
		};
	}

	async function getTab(key: string) {
		const tab = items.find((item) => item.href === key);
		if (!tab) {
			throw new Error(`Tab not found: ${key}`);
		}
		return import(`./settings/${tab.href.substring(1)}.svelte`);
	}
</script>

<div class="flex flex-row space-x-5">
	<nav class={cn("flex space-x-0 flex-col space-y-1", className)}>
		{#each items as item}
			{@const isActive = activeTab === item.title}

			<Button
				variant="ghost"
				on:click={changeTab(item)}
				class={cn(
				!isActive && "hover:underline",
				"relative justify-start hover:bg-transparent"
			)}
			>
				{#if isActive}
					<div
						class="bg-muted absolute inset-0 rounded-md"
						in:send={{ key: "active-sidebar-tab" }}
						out:receive={{ key: "active-sidebar-tab" }}
					/>
				{/if}
				<div class="relative">
					{item.title}
				</div>
			</Button>
		{/each}
	</nav>
	{#each items as item}
		{#if activeTab === item.title}
			{#await getTab(item.href)}
				<Skeleton />
			{:then module}
				<svelte:component this={module.default} />
			{:catch error}
				<p>{error.message}</p>
			{/await}
		{/if}
	{/each}
</div>