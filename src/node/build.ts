import { build as viteBuild, InlineConfig } from "vite";
import type { RollupOutput } from "rollup";
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";

import path, { dirname, join } from "path";
import { pathToFileURL } from "url";
import fs from "fs-extra";

import { SiteConfig } from "shared/types";

import { createVitePlugins } from "./vitePlugins";
import { Route } from "./plugin-route";

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => {
    return {
      mode: "production",
      root,
      // base: isServer ? "./" : "/",
      plugins: await createVitePlugins(config),
      ssr: {
        noExternal: ["vue-router"],
        target: "webworker"
        // external: ["vue-router"]
      },
      build: {
        minify: false,
        ssr: isServer,
        outDir: isServer ? path.join(root, ".temp") : path.join(root, "build"),
        rollupOptions: {
          // external: ["vue"],
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            format: isServer ? "cjs" : "esm"
          }
        }
      }
    };
  };

  console.log("Building client + server bundles...");

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
    ]);
    // console.log("=======>", clientBundle, serverBundle);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (error) {
    console.log(error);
  }
}

export async function renderPage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: any,
  root: string,
  clientBundle: RollupOutput,
  routes: Route[]
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );

  const cssBundle = clientBundle.output.find(
    (chunk) => chunk.fileName.split(".").pop() === "css"
  );
  console.log("cssBundle======>", cssBundle);

  console.log("Rendering page in server side...");
  return Promise.all(
    routes.map(async (route) => {
      // console.log("route=======>", route);
      const routePath = route.path;
      const appHtml = await render(route);
      // console.log("appHtml==========>", appHtml, root);
      const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <link
        rel="stylesheet"
        href="/${cssBundle?.fileName}"
      />
      <title>${route.meta.name}</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim();
      // console.log("1232313123131");
      const fileName = routePath.endsWith("/")
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, "build", dirname(fileName)));
      await fs.writeFile(join(root, "build", fileName), html);
    })
  );
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root, config);
  // 2. 引入 server-entry 模块
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");

  const { render, routes } = await import(
    String(pathToFileURL(serverEntryPath))
  );

  // 3. 服务端渲染，产出 HTML
  await renderPage(render, root, clientBundle, routes);

  await fs.remove(join(root, ".temp"));
}
