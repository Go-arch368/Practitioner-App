/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_API_PORT: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
