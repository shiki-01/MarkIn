<script lang="ts">
	import "./_setting.css";
	import Comp from '$lib/components/settings/comp/Comp.svelte';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';
	import SaveButton from '$lib/components/settings/comp/SaveButton.svelte';
	import type { Config } from '$lib/script/types.js';

	let startup: "default" | "last" | "custom" = "default";
	let defaultPage: "home" | "search" | "settings" | "plugins" | "about" | "shortcuts" = "home";
	let history: boolean = true;
	let backup: { startup: string; defaultPage: string; history: boolean } = { startup, defaultPage, history };

	let hasChanges: boolean = false;

	let isReady: boolean = false;

	$: hasChanges = startup !== backup.startup || defaultPage !== backup.defaultPage || history !== backup.history;

	function handleSave() {
		config.update((value: Config) => {
			value.personal.startUp.startUpPage = startup;
			value.personal.startUp.default = defaultPage;
			value.personal.privacy.history = history;
			return value;
		});
		config.subscribe((value) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		backup = { startup, defaultPage, history };
		hasChanges = false;
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			startup = value.personal.startUp.startUpPage;
			defaultPage = value.personal.startUp.default;
			history = value.personal.privacy.history;
		});
		backup = { startup, defaultPage, history };
		isReady = true;
		return () => unsubscribe();
	});
</script>

{#if isReady}
	<main>
		<div class="title">
			<h1>Personal Setting</h1>
			<SaveButton {hasChanges} on:save={handleSave} />
		</div>
		<div class="settings">
			<div class="blocks">
				<h2>Start up</h2>
				<Comp
					type="select"
					label="Start up page"
					value={[
					{ title: "Default Page", value: "default" },
					{ title: "Last Page", value: "last" },
				]}
					placeholder="Start up page"
					bind:checked={startup}
				/>
				<Comp
					type="select"
					label="Default page"
					value={[
					{ title: "Home", value: "home" },
					{ title: "Search", value: "search" },
					{ title: "Library", value: "library" },
				]}
					placeholder="Default page"
					bind:checked={defaultPage}
				/>
			</div>
			<div class="blocks">
				<h2>Privacy</h2>
				<Comp
					type="checkbox"
					label="Enable history"
					description="Enable history to save your search history"
					value={{ title: "history", value: "enable" }}
					bind:checked={history}
				/>
			</div>
		</div>
	</main>
{/if}