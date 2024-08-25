<script lang="ts">
	import '../app.css';
	import 'quill/dist/quill.snow.css';
	import { Maximize, Minus, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Command from '$lib/components/Command.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { config } from '$lib/script/stor.js';
	import { setTheme } from '$lib/script/theme.js';

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

<header class="drag flex items-center px-2 min-h-[40px] max-h-[40px]">
	<div class="undrag w-fit flex pl-1">
		<MenuBar />
	</div>
	<span class="flex w-full h-[40px]" />
	<div class="undrag w-fit flex justify-end space-x-4 pr-1">
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
<div class="w-full h-[calc(100%-40px)] p-5 box-border">
	<slot />
</div>

<style>
    :global(body) {
        margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
    }

    .drag {
        width: 100%;
        -webkit-app-region: drag;
    }

    .undrag {
        -webkit-app-region: no-drag;
    }
</style>
