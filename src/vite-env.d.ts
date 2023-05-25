/// <reference types="vite/client" />

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __IS_VERCEL_DEMO__: boolean;
