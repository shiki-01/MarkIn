<script lang="ts">
	import "./_setting.css";
	import Comp from '$lib/components/settings/comp/Comp.svelte';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';
	import SaveButton from '$lib/components/settings/comp/SaveButton.svelte';
	import { setTheme } from '$lib/script/theme.js';

	let theme: "light" | "dark" | "system" = "light";
	let accsentColor: string = "";
	let font: { name: string; id: string } = { name: "", id: "" };
	let fontSize: string = "";
	let backup: { theme: "light" | "dark" | "system"; accsentColor: string; font: { name: string; id: string } | null; fontSize: string } = { theme, accsentColor, font, fontSize };

	let hasChanges: boolean = false;
	let isReady: boolean = false;

	$: hasChanges = theme !== backup.theme || accsentColor !== backup.accsentColor || font !== backup.font || fontSize !== backup.fontSize;

	function handleSave() {
		config.update((value) => {
			value.appearance.theme = theme;
			value.appearance.accentColor = accsentColor;
			value.appearance.font.id = font.id;
			value.appearance.font.name = font.name;
			value.appearance.fontSize = fontSize;
			return value;
		});
		config.subscribe((value) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		backup = { theme, accsentColor, font, fontSize };
		setTheme(theme);
		hasChanges = false;
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			theme = value.appearance.theme;
			accsentColor = value.appearance.accentColor;
			font.id = value.appearance.font.id;
			font.name = value.appearance.font.name;
			fontSize = value.appearance.fontSize;
		});
		backup = { theme, accsentColor, font, fontSize };
		isReady = true;
		return () => unsubscribe();
	});
</script>

{#if isReady}
	<main>
		<div class="title">
			<h1>Appearance Setting</h1>
			<SaveButton {hasChanges} on:save={handleSave} />
		</div>
		<div class="settings">
			<div class="blocks">
				<h2>Appearance</h2>
				<Comp
					type="select"
					label="on Desktop"
					value={[
						{ title: "Light", value: "light" },
						{ title: "Dark", value: "dark" },
						{ title: "System", value: "system" },
					]}
					bind:checked={theme}
				/>
				<Comp
					type="input"
					label="Accent Color"
					placeholder="Accent Color"
					value={{ title: "Accent Color", value: accsentColor }}
					bind:checked={accsentColor}
				/>
				<Comp
					type="select"
					label="Font"
					value={[
						{ title: "Default", value: "default" },
						{ title: "Arial", value: "arial" },
						{ title: "Times New Roman", value: "times" },
					]}
					bind:checked={font.id}
				/>
				<Comp
					type="input"
					label="Font Size"
					placeholder="Font Size"
					value={{ title: "Font Size", value: fontSize }}
					bind:checked={fontSize}
				/>
			</div>
		</div>
	</main>
{/if}