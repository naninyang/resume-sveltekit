import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5173/',
        target: 'http://localhost:5555/',
        changeOrigin: true
      }
    }
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
