<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	export let content: string = '';
	export let focus: boolean = false;
	export let handleClick: () => void;
</script>

<div
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	class="w-full h-full px-5"
>
	<Textarea bind:value={content} class="w-full h-full resize-none" />
</div>