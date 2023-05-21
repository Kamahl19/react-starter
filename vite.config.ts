/// <reference types="vitest" />

import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import checkerPlugin from 'vite-plugin-checker';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import { reactClickToComponent } from 'vite-plugin-react-click-to-component';
import { visualizer } from 'rollup-plugin-visualizer';
import { z } from 'zod';

const visualize = process.env.VISUALIZE === 'true';

export default defineConfig({
  plugins: [
    ValidateEnv({
      validator: 'zod',
      schema: {
        VITE_API_URL: z.string().url(),
      },
    }),
    reactPlugin({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    reactClickToComponent(),
    tsconfigPathsPlugin(),
    svgrPlugin(),
    checkerPlugin({
      overlay: false,
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./**/*.{js,ts,tsx}" --max-warnings 0',
      },
    }),
    visualize &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        template: 'sunburst',
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
