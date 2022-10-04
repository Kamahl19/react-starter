/// <reference types="vitest" />

import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import momentToDayjsPlugin from 'unplugin-moment-to-dayjs/vite';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    reactPlugin(),
    tsconfigPathsPlugin(),
    svgrPlugin(),
    momentToDayjsPlugin(), // https://ant.design/docs/react/replace-moment
    checkerPlugin({
      overlay: false,
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./**/*.{js,ts,tsx}" --cache',
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        rewriteUrls: 'all',
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
    mockReset: true,
  },
});
