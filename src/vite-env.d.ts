/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITEST?: 'true' | 'false';
  readonly CI?: 'true' | 'false';
}

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __ENABLE_MSW_IN_PROD__: boolean;
