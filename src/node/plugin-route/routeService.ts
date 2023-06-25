import fastGlob from "fast-glob";
import { normalizePath } from "vite";
import path from "path";
import { UserConfig } from "../../shared/types/index";

interface RouteMeta {
  routePath: string;
  absolutePath: string;
  name?: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  async init() {
    const files = fastGlob
      .sync(["**/*.{ts,tsx,vue,jsx,md,mdx}"], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ["**/node_modules/**", "**/build/**", "config.ts"],
        objectMode: true
      })
      .sort();
    console.log("files=========>", files);
    files.forEach((file) => {
      // 将window文件路径的\转成/
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file.path)
      );
      // 1. 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      // 2. 文件绝对路径
      this.#routeData.push({
        routePath,
        absolutePath: file.path,
        name: file.name.split(".")[0]
      });
    });
    // console.log("this.#routeData=========>", this.#routeData);
  }

  generateRoutesCode(siteData: UserConfig) {
    return `
      export const routes = [${this.#routeData.map((route) => {
        return `{path: "${route.routePath}", component: () => import("${
          route.absolutePath
        }"), preload: () => import("${route.absolutePath}"), meta: {name: "${
          siteData.title || "标题"
        }"}}`;
      })}]
    `;
  }

  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, "").replace(/index$/, "");
    return routePath.startsWith("/") ? routePath : `/${routePath}`;
  }
}
