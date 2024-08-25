<script lang="ts">
	import "./_setting.css";
	import Comp from '$lib/components/settings/comp/Comp.svelte';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';

	let vcs: string = "git";
	let backup: string = "git";

	let hasChanges: boolean = false;

	$: hasChanges = vcs !== backup;

	function handleSave() {
		config.update((value) => {
			value.vcs.vcs = vcs;
			return value;
		});
		config.subscribe((value) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		backup = vcs;
		hasChanges = false;
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value) => {
			vcs = value.vcs.vcs;
		});
		backup = vcs;
		return () => unsubscribe();
	});
</script>

<h1>vsc</h1>