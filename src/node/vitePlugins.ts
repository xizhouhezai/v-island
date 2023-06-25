import vue from "@vitejs/plugin-vue";
import { pluginIndexHtml } from "./plugin-island/indexHtml";
import pluginConfig from "./plugin-island/config";
import pluginRoute from "./plugin-route";
import { SiteConfig } from "shared/types";

import EnvironmentPlugin from "vite-plugin-environment";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import mdx from "@mdx-js/rollup";
import { babel } from "@rollup/plugin-babel";

import { pluginMdx } from "./plugin-mdx";

import pluginUnocss from "unocss/vite";
import unocssOptions from "./plugin-unocss";

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginUnocss(unocssOptions),
    EnvironmentPlugin([]),
    vue(),
    pluginIndexHtml(),
    pluginConfig(config, restartServer),
    pluginRoute({ root: config.root }, config.siteData),
    vueJsx(),
    // mdx({
    //   jsx: true
    // }),
    await pluginMdx(),
    babel({
      extensions: [".js", ".jsx", ".cjs", ".mjs", ".md", ".mdx"],
      plugins: ["@vue/babel-plugin-jsx"]
    })
  ];
}
