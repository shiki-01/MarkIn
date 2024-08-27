import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocessReact from "svelte-preprocess-react/preprocessReact";
import { resolve } from 'path';

export default {
	preprocess: [
		vitePreprocess(),
		preprocessReact(),
	],
	kit: {
		adapter: adapter(),
		alias: {
			$lib: resolve('src/lib'),
			'@electron/remote/main/index.js': resolve(
				'node_modules/@electron/remote/main/index.js',
			),
		},
	},
};
