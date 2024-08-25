<script lang="ts">
	import { onMount } from 'svelte';
	import CommandDialog from '$lib/components/CommandDialog.svelte';
	import SettingDialog from '$lib/components/SettingDialog.svelte';
	import { isSettingsOpen, isCommandOpen } from '$lib/script/stor.js';
	// eslint-disable-next-line no-undef
	import KeyboardEvent = Electron.KeyboardEvent;

	let commandOpen : boolean
	let settingsOpen : boolean

	$: isCommandOpen.subscribe(value => {
		commandOpen = value;
	});

	$: isSettingsOpen.subscribe(value => {
		settingsOpen = value;
	});

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				isCommandOpen.set(!commandOpen);
			}
			if (e.key === "," && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				isSettingsOpen.set(!settingsOpen);
			}
		}

		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});
</script>

<CommandDialog />

<SettingDialog />