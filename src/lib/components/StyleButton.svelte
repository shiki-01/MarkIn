<script lang="ts">
	import type { EditorContent } from '$lib/script/types.js';
	import * as SelectComp from "$lib/components/ui/select";
	const Select = SelectComp;
	import * as ToggleGroupComp from "$lib/components/ui/toggle-group";
	const ToggleGroup = ToggleGroupComp;
	import { Bold, Italic, Underline } from 'lucide-svelte'
	export let content: EditorContent;
</script>

<div class="w-full h-full p-2">
	{#if content.type === "text"}
		{#if content.content.heading !== null}
			<Select.Root>
				<Select.Trigger>
					<Select.Value placeholder={content.content.heading ? content.content.heading : 'Heading'} />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="H1">H1</Select.Item>
					<Select.Item value="H2">H2</Select.Item>
					<Select.Item value="H3">H3</Select.Item>
				</Select.Content>
			</Select.Root>
			{:else}
			<ToggleGroup.Root>
				<ToggleGroup.Item>
					{#if content.content.text.type === "rich" && content.content.text.content.map((item) => item.style.bold).includes(true)}
						<Bold />
					{:else}
						<Bold />
					{/if}
				</ToggleGroup.Item>
				<ToggleGroup.Item>
					{#if content.content.italic}
						<Italic />
					{:else}
						<Italic />
					{/if}
				</ToggleGroup.Item>
				<ToggleGroup.Item>
					{#if content.content.underline}
						<Underline />
					{:else}
						<Underline />
					{/if}
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		{/if}
	{/if}
</div>