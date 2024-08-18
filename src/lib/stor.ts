import { writable } from 'svelte/store';
import type { Config } from '$lib/types.js';

export const isSettingsOpen = writable(false);
export const isCommandOpen = writable(false);

export const config = writable({} as Config);