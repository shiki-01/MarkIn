<script lang="ts">
	import { Textarea } from "$lib/components/ui/textarea";
  export let content: string = '';
  export let focus: boolean = false;
  export let handleClick: () => void;
</script>

<div on:click={handleClick} class="w-full h-full px-5">
  {#if focus}
    <Textarea bind:value={content} class="w-full h-full resize-none" />
  {:else}
    <div class="w-full h-full p-2 text-sm resize-none">{content}</div>
  {/if}
</div>