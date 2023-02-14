/// <reference types="vitest" />

import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    reactPlugin({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPathsPlugin(),
    svgrPlugin(),
    checkerPlugin({
      overlay: false,
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./**/*.{js,ts,tsx}" --max-warnings 0',
      },
    }),
  ],
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
