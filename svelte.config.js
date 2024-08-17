import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default {
	preprocess: vitePreprocess(),
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
