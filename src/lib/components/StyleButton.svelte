<script lang="ts">
	import * as SelectComp from '$lib/components/ui/select';
	import { Separator, Toolbar } from 'bits-ui';
	import {
		Bold,
		Italic,
		Strikethrough,
		Underline,
		AlignCenter,
		AlignLeft,
		AlignRight,
	} from 'lucide-svelte';
	import type { Editor } from '@tiptap/core';
	import type { Level } from '@tiptap/extension-heading';

	const Select = SelectComp;

	export let editor: Editor;

	const levels: { value: Level }[] = [{ value: 1 }, { value: 2 }, { value: 3 }];

	function onSelectedChange(value: { value: Level } | null) {
		if (!editor || !value) return;
		if (value.value == null) {
			editor.chain().focus().setParagraph().run();
		} else {
			editor.chain().focus().toggleHeading({ level: value.value }).run();
		}
	}

	let text: string[] = [];
	let align: string = 'left';

	$: if (editor) {
		const updateTextStyles = () => {
			text = editor.isActive('bold') ? [...text, 'bold'] : text.filter((i) => i !== 'bold');
			text = editor.isActive('italic') ? [...text, 'italic'] : text.filter((i) => i !== 'italic');
			text = editor.isActive('underline') ? [...text, 'underline'] : text.filter((i) => i !== 'underline');
			text = editor.isActive('strikethrough') ? [...text, 'strikethrough'] : text.filter((i) => i !== 'strikethrough');
		};

		const updateAlignment = () => {
			align = editor.isActive('align', { align: 'center' }) ? 'center' : editor.isActive('align', { align: 'right' }) ? 'right' : 'left';
		};

		updateTextStyles();
		updateAlignment();
	}
</script>

<div class="w-full h-full py-2 flex gap-2">
	<Select.Root items={levels} onSelectedChange={(value) => onSelectedChange(value)}>
		<Select.Trigger>
			<Select.Value
				placeholder="{editor.isActive('heading', {level: 1}) ? 'H1' : editor.isActive('heading', {level: 2}) ? 'H2' : editor.isActive('heading', {level: 3}) ? 'H3' : 'Paragraph'}" />
		</Select.Trigger>
		<Select.Content>
			{#each levels as i}
				<Select.Item
					value={i.value}
					isSelected={editor.isActive('heading', {level: i.value})}
				>
					H{i.value.toString()}
				</Select.Item>
			{/each}
			<Select.Item value={null}>Paragraph</Select.Item>
		</Select.Content>
	</Select.Root>
	<Toolbar.Root
		class="flex h-12 min-w-max items-center justify-center rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini"
	>
		<Toolbar.Group
			bind:value={text}
			type="multiple"
			class="flex items-center gap-x-0.5"
		>
			<Toolbar.GroupItem
				aria-label="toggle bold"
				value="bold"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Bold class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				aria-label="toggle italic"
				value="italic"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Italic class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				aria-label="toggle underline"
				value="underline"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Underline class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				aria-label="toggle strikethrough"
				value="strikethrough"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Strikethrough class="size-6" />
			</Toolbar.GroupItem>
		</Toolbar.Group>

		<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

		<Toolbar.Group
			bind:value={align}
			type="single"
			class="flex items-center gap-x-0.5"
		>
			<Toolbar.GroupItem
				aria-label="align left"
				value="left"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignLeft class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				aria-label="align center"
				value="center"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignCenter class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				aria-label="align right"
				value="right"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignRight class="size-6" />
			</Toolbar.GroupItem>
		</Toolbar.Group>
	</Toolbar.Root>
</div>