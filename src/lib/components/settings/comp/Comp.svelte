<script lang="ts">
	import * as Setting from '$lib/components/settings/_setting.js';
	import { onMount } from 'svelte';

	type Value = {
		title: string;
		value: string;
	}

	export let type: 'select' | 'input' | 'checkbox' | 'radiobutton' | null = null;
	export let label: string = '';
	export let description: string = '';
	export let value: Value[] | Value | null = null;
	export let placeholder: string | null = null;
	export let checked: boolean | string | null = null;
	export let disabled: boolean = false;

	let isSelected: boolean[] = [];
	let selected = { value: '' };

	let isReady = false;

	onMount(() => {
		if (type == 'select' && Array.isArray(value)) {
			value.forEach((item) => {
				isSelected.push(item.value === checked);
			});
			selected.value = value.find((item) => item.value === checked)?.value;
			placeholder = value.find((item) => item.value === checked)?.title || null;
		}
		isReady = true;
	});

	function selectedChange(selected) {
		if (selected === undefined) return;
		isSelected = value.map((item) => item.value === selected.value);
		checked = selected.value;
	}
</script>

{#if isReady}
	<div class="content">
		{#if type === "select" && Array.isArray(value)}
			<div class="flex w-full items-center">
				<p>{label}</p>
				<Setting.Select.Root disabled={disabled} bind:selected onSelectedChange={selectedChange(selected)}>
					{#if placeholder}
						<Setting.Select.Trigger>
							<Setting.Select.Value placeholder={placeholder} />
						</Setting.Select.Trigger>
					{/if}
					<Setting.Select.Content>
						{#each value as item, index}
							<Setting.Select.Item bind:isSelected={isSelected[index]}
												 value={item.value}>{item.title}</Setting.Select.Item>
						{/each}
					</Setting.Select.Content>
				</Setting.Select.Root>
			</div>
		{:else if type === "input" && typeof value === "object"}
			<div class="flex w-full items-center justify-between">
				<p>{label}</p>
				<Setting.Input class="w-fit" id={value.value} bind:value={checked} placeholder={placeholder} disabled={disabled} />
			</div>
		{:else if type === "checkbox" && typeof value === "object" && typeof checked === "boolean"}
			<div class="flex items-top space-x-4 pt-1">
				<Setting.Checkbox id={value.value} bind:checked />
				<div class="grid gap-1.5 leading-none">
					<Setting.Label
						for={value.value}
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{value.title}
					</Setting.Label>
					<p class="text-muted-foreground text-sm">
						{description}
					</p>
				</div>
			</div>
		{:else if type === "radiobutton" && Array.isArray(value)}
			<p>{label}</p>
			<Setting.RadioGroup.Root value={label} disabled={disabled}>
				{#each value as item}
					<div class="flex items-center space-x-2">
						<Setting.RadioGroup.Item value={item.value} id={item.value} />
						<Setting.Label for={item.value}>{item.title}</Setting.Label>
					</div>
				{/each}
			</Setting.RadioGroup.Root>
		{:else}
			<p>Invalid type</p>
		{/if}
	</div>
{/if}