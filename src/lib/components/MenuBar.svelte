<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Menu } from 'lucide-svelte';
	import Kbd from '$lib/components/Kbd.svelte';
	import { isCommandOpen, isSettingsOpen } from '$lib/stor.js';

	let commandOpen: boolean;
	let settingsOpen: boolean;

	$: isCommandOpen.subscribe(value => {
		commandOpen = value;
	});

	$: isSettingsOpen.subscribe(value => {
		settingsOpen = value;
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger as={Button} variant="none">
		<Menu />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[150px]">
		<DropdownMenu.Group>
			<DropdownMenu.Label>MarkIn</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>File</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent class="w-[150px]">
					<DropdownMenu.Item>
						New
						<Kbd keys={['control', 'N']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Open
						<Kbd keys={['control', 'O']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Save
						<Kbd keys={['control', 'S']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Save As
						<Kbd keys={['control', 'shift', 'S']} />
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item on:click={() => isSettingsOpen.set(!settingsOpen)}>
						Setting
						<Kbd keys={['control', ',']} />
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>Edit</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>
						Undo
						<Kbd keys={['control', 'Z']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Redo
						<Kbd keys={['control', 'shift', 'Z']} />
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						Cut
						<Kbd keys={['control', 'X']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Copy
						<Kbd keys={['control', 'C']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Paste
						<Kbd keys={['control', 'V']} />
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						Select All
						<Kbd keys={['control', 'A']} />
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>View</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>
						Zoom In
						<Kbd keys={['control', '+']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Zoom Out
						<Kbd keys={['control', '-']} />
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Reset Zoom
						<Kbd keys={['control', '0']} />
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						Full Screen
						<Kbd keys={['control', 'F']} />
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => isCommandOpen.set(!commandOpen)}>
				Command
				<Kbd keys={['control', 'shift', 'P']} />
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				Account
				<Kbd keys={['control', 'shift', 'A']} />
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				Help
				<Kbd keys={['control', 'shift', 'H']} />
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Exit
				<Kbd keys={['control', 'Q']} />
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>