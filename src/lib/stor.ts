import { writable } from 'svelte/store';

export const isSettingsOpen = writable(false);
export const isCommandOpen = writable(false);

export const config = writable({json: {}});