/// <reference types="vite/client" />

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __ENABLE_MSW_IN_PROD__: boolean;
