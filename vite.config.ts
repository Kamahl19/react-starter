/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { checker } from 'vite-plugin-checker';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import { visualizer } from 'rollup-plugin-visualizer';
import { z } from 'zod';

export default defineConfig(({ mode }) => ({
  plugins: [
    ValidateEnv({
      validator: 'zod',
      schema: {
        VITE_API_URL: z.string().url().or(z.string().startsWith('/')),
      },
    }),
    react({
      plugins: [
        ['@swc-jotai/debug-label', {}],
        ['@swc-jotai/react-refresh', {}],
      ],
    }),
    tsconfigPaths(),
    svgr(),
    mode !== 'test' &&
      checker({
        enableBuild: false,
        overlay: false,
        typescript: true,
        eslint: {
          lintCommand:
            'eslint "./**/*.{js,cjs,ts,tsx}" --max-warnings 0 --report-unused-disable-directives',
        },
      }),
    process.env.VISUALIZE === 'true' &&
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
}));
