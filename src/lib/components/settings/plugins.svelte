<script lang="ts">
	import './_setting.css';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import PluginIcon from '$lib/components/settings/comp/PluginIcon.svelte';
	import type { Plugin } from '$lib/script/types.js';
	import SvelteMarkdown from 'svelte-markdown';

	let market: Plugin[] = [];
	let plugins: Plugin[] = [];
	let isReady: boolean = false;

	let showDetail: Plugin | null = null;
	let detail: string = '';
	let selected: boolean[] = [];

	async function fetchMarketPlugins() {
		try {
			const response = await fetch('https://raw.githubusercontent.com/shiki-01/MarkIn_Plugins/main/plugins.json');
			market = await response.json();
		} catch (error) {
			console.error('Failed to fetch market plugins:', error);
		}
	}

	async function handleDetail(plugin: Plugin, isMarket: boolean) {
		if (plugin === null) return;
		showDetail = plugin;
		selected = isMarket ? plugins.map((p) => p === plugin) : market.map((p) => p === plugin);
		try {
			const response = await fetch(plugin.gitrepo.replace('https://github.com', 'https://raw.githubusercontent.com') + '/main/README.md');
			detail = await response.text();
		} catch (error) {
			console.error('Failed to fetch plugin detail:', error);
		}
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			plugins = value.plugins;
		});
		fetchMarketPlugins().then(() => {
			isReady = true;
		});
		return () => unsubscribe();
	});
</script>

{#if isReady}
	<main>
		<div class="title">
			<h1>Plugin</h1>
		</div>
		<div class="flex space-x-4">
			<div class="w-[55%]">
				<Tabs.Root value="market" onValueChange={() => {selected.fill(false); showDetail = null}}>
					<Tabs.List class="flex justify-center space-x-4">
						<Tabs.Trigger value="market">Marketplace</Tabs.Trigger>
						<Tabs.Trigger value="installed">Installed</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="market" class="max-h-[calc(100vh-500px)] overflow-y-auto">
						{#if market.length === 0}
							<p>Loading...</p>
						{:else}
							{#each market as plugin,index}
								{#if plugin}
									<PluginIcon {plugin} bind:isActive={plugin.active} select={selected[index]} on:click={() => handleDetail(plugin,false)} />
								{/if}
							{/each}
						{/if}
					</Tabs.Content>
					<Tabs.Content value="installed">
						{#if plugins.length === 0}
							<p>No plugins installed.</p>
						{:else}
							{#each plugins as plugin,index}
								{#if plugin}
									<PluginIcon {plugin} bind:isActive={plugin.active} select={selected[index]} on:click={() => handleDetail(plugin,true)} />
								{/if}
							{/each}
						{/if}
					</Tabs.Content>
				</Tabs.Root>
			</div>
			<div class="w-[45%]">
				{#if showDetail !== null}
					<div class="flex items-center space-x-4 py-2">
						<SvelteMarkdown source={detail} />
					</div>
				{/if}
			</div>
		</div>
	</main>
{/if}