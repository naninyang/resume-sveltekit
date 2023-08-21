import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		// vitePreprocess(),
		preprocess({
			sass: {
				indentedSyntax: true,
				includePaths: ['src'],
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
