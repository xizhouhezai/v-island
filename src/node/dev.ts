import { createServer } from "vite";

import { resolveConfig } from "./config";
import { PACKAGE_ROOT } from "./constants";

import { createVitePlugins } from "./vitePlugins";

// import mdx from "@mdx-js/rollup";
// import { babel } from "@rollup/plugin-babel";

const rollupOptions = {
  external: ["vue"]
};

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, "serve", "development");
  return createServer({
    root,
    plugins: await createVitePlugins(config, restartServer),
    build: { rollupOptions },
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
