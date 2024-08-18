<script lang="ts">
	import '../app.css';
	import { Maximize, Minus, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Command from '$lib/components/Command.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { config } from '$lib/stor.js';
	import { setTheme } from '$lib/theme.js';

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const getConfig = await window.electron.config.getConfig();
			config.set(getConfig);
			const theme = getConfig.appearance.theme;
			setTheme(theme);
		}
	});
</script>

<ModeWatcher />
<Command />

<header class="drag flex items-center px-2 py-5">
	<div class="undrag w-fit flex pl-1">
		<MenuBar />
	</div>
	<span class="flex w-full" />
	<div class="undrag w-fit flex justify-end space-x-4 pt-1 pr-1">
		<Button class="p-0" variant="none">
			<Minus />
		</Button>
		<Button class="p-0" variant="none">
			<Maximize />
		</Button>
		<Button class="p-0" variant="none">
			<X />
		</Button>
	</div>
</header>
<slot />

<style>
    :global(body) {
        margin: 0;
    }

    .drag {
        width: 100%;
        height: 2em;
        -webkit-app-region: drag;
    }

    .undrag {
        -webkit-app-region: no-drag;
    }
</style>
