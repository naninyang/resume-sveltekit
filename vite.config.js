import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import '$lib/styles/designSystem'`
      }
    }
  }
};

export default config;
