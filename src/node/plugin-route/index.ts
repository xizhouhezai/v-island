import { PageModule } from "shared/types";
import { Plugin } from "vite";
import { Component } from "vue";
import { RouteService } from "./routeService";
import { UserConfig } from "../../shared/types/index";

export interface Meta {
  name?: string;
}
export interface Route {
  path: string;
  component: Component;
  meta?: Meta;
  preload?: () => Promise<PageModule>;
}

interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTE_ID = "island:routes";

export default function pluginRoute(
  options: PluginOptions,
  siteData?: UserConfig
): Plugin {
  const routeService = new RouteService(options.root);
  // console.log("routes======>", options);
  return {
    name: "island:plugin",
    async configResolved() {
      // Vite 启动时，对 RouteService 进行初始化
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return "\0" + CONVENTIONAL_ROUTE_ID;
      }
    },
    load(id) {
      if (id === "\0" + CONVENTIONAL_ROUTE_ID) {
        const res = routeService.generateRoutesCode(siteData);
        // console.log("res=======>", res);
        return res;
      }
    }
  };
}
