import { createSSRApp, createApp as createVueApp } from "vue";

import Layout from "../theme-default";

export function createApp(client) {
  const app = client ? createVueApp(Layout) : createSSRApp(Layout);
  return { app };
}
