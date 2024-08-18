<script lang="ts">
	import "./_setting.css";
	import Comp from '$lib/components/settings/comp/Comp.svelte';
	import { config } from '$lib/stor.js';
	import { onMount } from 'svelte';
	import SaveButton from '$lib/components/settings/comp/SaveButton.svelte';

	let notification: boolean = true;
	let backup: boolean = true;
	let hasChanges: boolean = false;

	$: hasChanges = notification !== backup;

	function handleSave() {
		config.update((value) => {
			value.notification.notification = notification;
			return value;
		});
		config.subscribe((value) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		backup = notification;
		hasChanges = false;
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			notification = value.notification.notification;
		});
		backup = notification;
		return () => unsubscribe();
	});
</script>

<main>
	<div class="title">
		<h1>Notification Setting</h1>
		<SaveButton {hasChanges} on:save={handleSave} />
	</div>
	<div class="settings">
		<div class="blocks">
			<h2>Notification</h2>
			<Comp
				type="checkbox"
				description="Enable notification to receive notification"
				value={{ title: "notification", value: "enable" }}
				bind:checked={notification}
			/>
		</div>
	</div>
</main>