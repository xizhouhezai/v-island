import { normalizePath, Plugin } from "vite";
import { SiteConfig } from "shared/types/index";
import { relative, join } from "path";
import { PACKAGE_ROOT } from "node/constants";
import sirv from "sirv";

const SITE_DATA_ID = "island:site-data";

export default function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: "island:config",
    config() {
      return {
        root: PACKAGE_ROOT
      };
    },
    // 加载虚拟的文件
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        // "\0"为vite加载虚拟文件id的约定配置
        return "\0" + SITE_DATA_ID;
      }
    },
    // 接受虚拟文件id
    load(id) {
      if (id === "\0" + SITE_DATA_ID) {
        // 返回虚拟文件内容
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [normalizePath(config.configPath)];
      // console.log("config.configPath======>", config.configPath, ctx.file);
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        // 重启 Dev Server
        // 方案讨论:
        // 1. 插件内重启 Vite 的 dev server
        // await server.restart();
        // ❌ 没有作用，因为并没有进行 Island 框架配置的重新读取
        // 2. 手动调用 dev.ts 中的 createServer
        // 然后每次 import 新的产物
        // ✅ 可行
        await restartServer();
      }
    },
    configureServer(server) {
      const publicDir = join(config.root, "public");
      server.middlewares.use(sirv(publicDir));
    }
  };
}
