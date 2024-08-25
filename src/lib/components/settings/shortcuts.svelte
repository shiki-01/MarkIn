<script lang="ts">
	import './_setting.css';
	import * as Table from '$lib/components/ui/table';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { config } from '$lib/script/stor.js';
	import { onMount } from 'svelte';
	import SaveButton from '$lib/components/settings/comp/SaveButton.svelte';
	import type { Config, Shortcut } from '$lib/script/types.js';

	let shortcuts: Shortcut[] = [];
	let shortcutsBackup: Shortcut[] = [];
	let hasChanges: boolean = false;

	let nowEditing: Shortcut | null = null;

	function parsCommand(command: string): string {
		return command.replace(/(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|Alt|Option|Shift)/g, (match) => {
			switch (match) {
				case 'CommandOrControl':
				case 'CmdOrCtrl':
					return '^';
				case 'Command':
				case 'Cmd':
					return '⌘';
				case 'Control':
				case 'Ctrl':
					return '^';
				case 'Alt':
				case 'Option':
					return '⎇';
				case 'Shift':
					return '⇧';
				default:
					return match;
			}
		});
	}

	function reverseCommand(command: string): string {
		return command.replace(/([\^⌘⎇⇧])/g, (match) => {
			switch (match) {
				case '^':
					return 'Control';
				case '⌘':
					return 'Command';
				case '⎇':
					return 'Alt';
				case '⇧':
					return 'Shift';
				default:
					return match;
			}
		});
	}

	function extractShortcuts(obj: { [key: string]: Shortcut }): Shortcut[] {
		let result: Shortcut[] = [];
		for (const key in obj) {
			if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				result = result.concat(extractShortcuts(obj[key].shortcuts || {}));
				if (obj[key].command) {
					const shortcut = {
						id: key,
						active: obj[key].active,
						command: parsCommand(obj[key].command),
						isChange: false,
						system: obj[key].system,
						description: obj[key].description,
						title: obj[key].title,
					};
					result.push(shortcut);
				}
			}
		}
		return result;
	}

	function checkChanges() {
		shortcuts.forEach((shortcut) => {
			const backup = shortcutsBackup.find((item) => item.id === shortcut.id);
			if (backup && backup.active !== shortcut.active) {
				hasChanges = true;
			}
			if (backup && backup.command !== shortcut.command) {
				hasChanges = true;
			}
		});
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!nowEditing) return;
		if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt' || event.key === 'Meta') {
			return;
		}
		if (event.key === 'Enter') {
			handleSave();
		}
		event.preventDefault();
		const key = event.key.toUpperCase();
		const modifiers = [];
		if (event.ctrlKey) modifiers.push('^');
		if (event.metaKey) modifiers.push('⌘');
		if (event.altKey) modifiers.push('⎇');
		if (event.shiftKey) modifiers.push('⇧');
		nowEditing.command = [...modifiers, key].join('+');
		hasChanges = true;
	}

	function changeCommand(shortcut: Shortcut) {
		nowEditing = shortcut;
		shortcut.isChange = true;
		window.addEventListener('keydown', handleKeydown);
	}

	function replaceShortcuts(obj: Config, newShortcuts: Shortcut[]) {
		const shortcuts = obj.shortcuts;
		for (const category in shortcuts) {
			for (const key in shortcuts[category].shortcuts || {}) {
				const newShortcut = newShortcuts.find((s: Shortcut) => s.id === key);
				if (newShortcut) {
					shortcuts[category].shortcuts[key] = { ...newShortcut, command: reverseCommand(newShortcut.command) };
				}
			}
		}
		return obj;
	}

	function handleSave() {
		config.update((value: Config) => {
			return replaceShortcuts(value, shortcuts);
		});
		config.subscribe((value: Config) => {
			if (typeof window !== 'undefined') {
				window.electron.config.setConfig(value);
			}
		});
		shortcutsBackup = shortcuts;
		hasChanges = false;
		window.removeEventListener('keydown', handleKeydown);
	}

	function handleCommandSave() {
		if (!nowEditing) return;
		shortcuts = shortcuts.map((shortcut) => {
			if (nowEditing && shortcut.id === nowEditing.id) {
				return { ...shortcut, command: nowEditing.command, isChange: false };
			}
			return shortcut;
		});
		nowEditing.isChange = false;
		nowEditing = null;
		window.removeEventListener('keydown', handleKeydown);
		checkChanges();
	}

	function handleCancel() {
		if (!nowEditing) return;
		nowEditing.isChange = false;
		nowEditing = null;
		window.removeEventListener('keydown', handleKeydown);
	}

	onMount(() => {
		const unsubscribe = config.subscribe((value: Config) => {
			shortcuts = extractShortcuts(value.shortcuts);
			shortcutsBackup = [...shortcuts];
		});
		return () => unsubscribe();
	});
</script>

<main>
	<div class="title">
		<h1>Shortcuts Setting</h1>
		<SaveButton {hasChanges} on:save={handleSave} />
	</div>
	<div class="settings">
		<div class="blocks">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Active</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Key</Table.Head>
						<Table.Head>System</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each shortcuts as shortcut}
						<Table.Row>
							<Table.Cell>
								<Checkbox bind:checked={shortcut.active}
										  onCheckedChange={() => checkChanges()} />
							</Table.Cell>
							<Table.Cell>
								<Tooltip.Root>
									<Tooltip.Trigger class="text-left">
										{shortcut.title}
									</Tooltip.Trigger>
									<Tooltip.Content>
										{shortcut.description}
									</Tooltip.Content>
								</Tooltip.Root>
							</Table.Cell>
							<Table.Cell
								class="text-right"
								on:click={() => changeCommand(shortcut)}
							>
								{shortcut.command}
							</Table.Cell>
							<Table.Cell>{shortcut.system}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</main>

{#if nowEditing !== null}
	<Dialog.Dialog bind:open={nowEditing.isChange}>
		<Dialog.Content>
			<Dialog.Header>
				<h2>Edit Shortcut</h2>
			</Dialog.Header>
			<Label>{nowEditing.command}</Label>
			<Dialog.Footer>
				<Button on:click={handleCancel}>Cancel</Button>
				<Button on:click={handleCommandSave}>Save</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Dialog>
{/if}