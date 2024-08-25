<script lang="ts">
	import "./_setting.css";
	import Comp from '$lib/components/settings/comp/Comp.svelte';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';
	import SaveButton from '$lib/components/settings/comp/SaveButton.svelte';
	import type { Config } from '$lib/script/types.js';

	let language: 'en' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pl' | 'pt' | 'ru' | 'tr' | 'zh' = "en";
	let backup: string = "en";

	let hasChanges: boolean = false;
	let isReady: boolean = false;

	$: hasChanges = language !== backup;

	function handleSave() {
		config.update((value: Config) => {
			value.language = language;
			return value;
		});
		config.subscribe((value) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		backup = language;
		hasChanges = false;
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			language = value.language
		});
		backup = language;
		isReady = true;
		return () => unsubscribe();
	});
</script>

{#if isReady}
	<main>
		<div class="title">
			<h1>Language Setting</h1>
			<SaveButton {hasChanges} on:save={handleSave} />
		</div>
		<div class="settings">
			<div class="blocks">
				<h2>Language</h2>
				<Comp
					type="select"
					label="Language"
					value={[
					{ title: "English", value: "en" },
					{ title: "Deutsch", value: "de" },
					{ title: "Français", value: "fr" },
					{ title: "Español", value: "es" },
					{ title: "Italiano", value: "it" },
					{ title: "Nederlands", value: "nl" },
					{ title: "Polski", value: "pl" },
					{ title: "Português", value: "pt" },
					{ title: "Русский", value: "ru" },
					{ title: "Türkçe", value: "tr" },
					{ title: "中文", value: "zh" }
				]}
					bind:checked={language}
				/>
			</div>
		</div>
	</main>
{/if}