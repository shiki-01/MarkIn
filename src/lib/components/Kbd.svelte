<script lang="ts">
	export let keys: string[] = [];
</script>

<div class="ml-auto flex items-center gap-px">
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
	>
		{#each keys as key (key)}
			{#if key === "meta"}
				<span class="text-[15px]">⌘</span>
			{:else if key === "control"}
				<span class="text-[10px]">⌃</span>
			{:else if key === "alt"}
				<span class="text-[15px]">⌥</span>
			{:else if key === "shift"}
				<span class="text-[15px]">⇧</span>
			{:else}
				<span>{key}</span>
			{/if}
		{/each}
	</kbd>
</div>