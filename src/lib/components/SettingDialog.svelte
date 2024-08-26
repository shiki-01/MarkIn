<script lang="ts">
	import * as DialogComp from '$lib/components/ui/dialog/index.js';
	import { Separator } from "$lib/components/ui/separator/index.js";
	import SidebarNav from '$lib/components/SidebarNav.svelte';
	import { isSettingsOpen } from '$lib/script/stor.js';
	
	const Dialog = DialogComp;

	let open: boolean;

	$: isSettingsOpen.subscribe(value => {
		open = value;
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-[700px]">
		<Dialog.Title>Settings</Dialog.Title>
		<Dialog.Header>Customize your experience.</Dialog.Header>
		<Separator />
		<aside class="w-full">
			<SidebarNav items={[
				{ href: "/personal", title: "Personal" },
				{ href: "/notification", title: "Notification" },
				{ href: "/shortcuts", title: "Shortcuts" },
				{ href: "/appearance", title: "Appearance" },
				{ href: "/plugins", title: "Plugins" },
				{ href: "/language", title: "Language" },
				{ href: "/vcs", title: "VCS" },
			]} isOpened="Personal" >
			</SidebarNav>
		</aside>
		<Dialog.Footer>
			<Dialog.Close>Close</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>