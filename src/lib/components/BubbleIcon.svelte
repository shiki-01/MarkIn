<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import * as BitsUI from 'bits-ui';
	import type { SvelteComponent } from 'svelte';
	import { flyAndScale } from '$lib/utils.js';

	export let editor: Editor;
	export let activeMarks: string[] = [];
	export let Icon: SvelteComponent;
	export let Label: string;
	export let toggle: ReturnType<void>;

	const { Toolbar, Tooltip } = BitsUI;

	const GroupItemStyle = `
		inline-flex
		size-6
		items-center
		justify-center
		rounded-md
		bg-background-alt
		text-foreground/60
		transition-all
		hover:bg-muted
		active:scale-98
		active:bg-dark-20
		data-[state=on]:bg-muted
		data-[state=on]:text-foreground/80
		active:data-[state=on]:bg-dark-10
	`;

	const iconStyle = 'size-5';

</script>

<Toolbar.GroupItem
	on:click={() => {
		if (activeMarks.includes('code')) {
			editor.chain().focus().unsetCode().run();
		}
		if (toggle === 'toggleCode') {
			editor.chain().focus().unsetAllMarks().run();
		}
		editor.chain().focus()[toggle]().run();
	}}
	disabled={!editor.can().chain().focus()[toggle]().run() && !activeMarks.includes('code')}

	aria-label="toggle bold"
	value="bold"
	class={GroupItemStyle}
>
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger>
			<Icon class={iconStyle} />
		</Tooltip.Trigger>
		<Tooltip.Content
			transition={flyAndScale}
			transitionConfig={{ y: 8, duration: 150 }}
			sideOffset={8}
			class="z-[99999]"
		>
			<div class="bg-background">
				<Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
			</div>
			<div
				class="flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
			>
				{Label}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Toolbar.GroupItem>