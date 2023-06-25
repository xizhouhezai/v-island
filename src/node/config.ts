import fs from "fs-extra";
import { resolve } from "path";
import { loadConfigFromFile } from "vite";
import { UserConfig, SiteConfig } from "../shared/types/index";

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

async function getUserConfigPath(root: string) {
  try {
    // 支持的配置文件格式
    const supportConfigFiles = ["config.ts", "config.js"];
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (error) {
    console.error(`Failed to load user config: ${error}`);
    throw error;
  }
}

async function resolveUserConfig(
  root: string,
  command: "serve" | "build",
  mode: "development" | "production"
) {
  // 1、获取配置文件的路径
  const configPath = await getUserConfigPath(root);
  // 2、解析配置文件
  const result = await loadConfigFromFile({ command, mode }, configPath, root);
  console.log("result=====>", result);
  if (result) {
    // 从result中解析出配置
    const { config: rawConfig = {} as RawConfig } = result;
    // 解析出的配置可能是三种数据类型
    // 1、object
    // 2、promise
    // 3、function
    const userConfig = await (typeof rawConfig === "function"
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

// 设置一些默认数据
export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || "Island.js",
    description: userConfig.description || "SSG Framework",
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}

export async function resolveConfig(
  root: string,
  command: "serve" | "build",
  mode: "development" | "production"
) {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  console.log("======>", configPath, userConfig);
  const siteConfig: SiteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}

export function defineConfig(config: UserConfig) {
  return config;
}
