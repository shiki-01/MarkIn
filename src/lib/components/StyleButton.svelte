<script lang="ts">
	import * as SelectComp from '$lib/components/ui/select';
	import { Separator, Toolbar } from 'bits-ui';
	import {
		Bold,
		Italic,
		Strikethrough,
		Underline,
		Code,
		RemoveFormatting,
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
	let textAlign: 'left' | 'center' | 'right' = 'left';

	$: if (editor) {
		const updateTextStyles = () => {
			const styles = ['bold', 'italic', 'underline', 'strike', 'code'];
			text = styles.filter(style => editor.isActive(style));
		};

		textAlign = editor.isActive({ textAlign: 'center' }) ? 'center' : editor.isActive({ textAlign: 'right' }) ? 'right' : 'left';

		updateTextStyles();
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
				on:click={() => {
					editor.chain().focus().toggleBold().run();
				}}
				disabled={!editor.can().chain().focus().toggleBold().run()}

				aria-label="toggle bold"
				value="bold"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Bold class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().toggleItalic().run();
				}}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				aria-label="toggle italic"
				value="italic"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Italic class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().toggleUnderline().run();
				}}
				disabled={!editor.can().chain().focus().toggleUnderline().run()}
				aria-label="toggle underline"
				value="underline"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Underline class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().toggleStrike().run();
				}}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				aria-label="toggle strikethrough"
				value="strike"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Strikethrough class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().unsetAllMarks().run();
					editor.chain().focus().toggleCode().run();
				}}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				aria-label="toggle code"
				value="code"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<Code class="size-6" />
			</Toolbar.GroupItem>
		</Toolbar.Group>

		<Toolbar.Group
			bind:value={text}
			type="single"
			class="flex items-center gap-x-0.5"
		>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().unsetAllMarks().run();
				}}
				disabled={!editor.can().chain().focus().unsetAllMarks().run()}
				aria-label="remove formatting"
				value="removeFormatting"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<RemoveFormatting class="size-6" />
			</Toolbar.GroupItem>
		</Toolbar.Group>

		<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

		<Toolbar.Group
			bind:value={textAlign}
			type="single"
			class="flex items-center gap-x-0.5"
		>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().setTextAlign('left').run();
				}}
				disabled={!editor.can().chain().focus().setTextAlign('center').run()}
				aria-label="align left"
				value="left"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignLeft class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().setTextAlign('center').run();
				}}
				disabled={!editor.can().chain().focus().setTextAlign('center').run()}
				aria-label="align center"
				value="center"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignCenter class="size-6" />
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				on:click={() => {
					editor.chain().focus().setTextAlign('right').run();
				}}
				disabled={!editor.can().chain().focus().setTextAlign('right').run()}
				aria-label="align right"
				value="right"
				class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
			>
				<AlignRight class="size-6" />
			</Toolbar.GroupItem>
		</Toolbar.Group>
	</Toolbar.Root>
</div>