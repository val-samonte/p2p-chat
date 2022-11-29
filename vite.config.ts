import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
// https://github.com/metaplex-foundation/js-examples/tree/main/getting-started-vite
// https://jotai.org/docs/guides/vite

// TODO: ISSUE
// https://github.com/vitejs/vite/issues/9703
export default defineConfig({
	server: {
		hmr: true,
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			events: 'rollup-plugin-node-polyfills/polyfills/events',
			assert: 'assert',
			crypto: 'crypto-browserify',
			util: 'util',
		},
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			plugins: [nodePolyfills({ crypto: true })],
		},
		commonjsOptions: {
			include: [],
		},
	},
	optimizeDeps: {
		disabled: false,
		esbuildOptions: {
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		},
	},
});
