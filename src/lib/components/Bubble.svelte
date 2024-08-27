<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import * as SelectComp from '$lib/components/ui/select';
	import { Separator, Toolbar } from 'bits-ui';
	import { Tooltip } from "bits-ui";
	import {
		Bold,
		Italic,
		Strikethrough,
		Underline,
		Code, TextSelection,
	} from 'lucide-svelte';
	import BubbleIcon from '$lib/components/BubbleIcon.svelte';

	const Select = SelectComp;

	export let editor: Editor;

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

	const getActiveMarks = (range) => {
		const { from, to } = range;
		const marks = new Set()
		editor.state.doc.nodesBetween(from, to, node => {
			node.marks.forEach(mark => marks.add(mark.type.name));
		});

		return Array.from(marks);
	}

	let text: string[] = [];
	let activeMarks: string[] = []

	$: if (editor) {
		const styles = ['bold', 'italic', 'underline', 'strike', 'code'];
		text = styles.filter(style => editor.isActive(style));
		const selection = editor.state.selection;
		activeMarks = getActiveMarks(selection);
	}
</script>

{#if editor}
	<Toolbar.Root
		class="flex shadow-lg h-10 min-w-max items-center justify-center rounded-lg border border-border bg-background p-2 shadow-mini"
	>
		<Toolbar.Group
			bind:value={text}
			type="multiple"
			class="flex items-center gap-x-2"
		>
			<BubbleIcon editor={editor} toggle="toggleBold" {activeMarks} Icon={Bold} Label="bold" />
			<BubbleIcon editor={editor} toggle="toggleItalic" {activeMarks} Icon={Italic} Label="italic" />
			<BubbleIcon editor={editor} toggle="toggleUnderline" {activeMarks} Icon={Underline} Label="underline" />
			<BubbleIcon editor={editor} toggle="toggleStrike" {activeMarks} Icon={Strikethrough} Label="strikethrough" />
			<BubbleIcon editor={editor} toggle="toggleCode" {activeMarks} Icon={Code} Label="code" />
		</Toolbar.Group>
	</Toolbar.Root>
{/if}