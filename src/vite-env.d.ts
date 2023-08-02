/// <reference types="vite/client" />

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITEST?: 'true' | 'false';
  readonly CI?: 'true' | 'false';
}

/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
