
declare module "island:site-data" {
  import type { UserConfig } from "shared/types";
  const siteData: UserConfig;
  export default siteData;
}

declare module "island:routes" {
  import type { RouteRecordRaw } from "vue-router";
  import type { PageModule } from "shared/types";
  type NewRoute = RouteRecordRaw & {
    preload?: () => Promise<PageModule>
  };
  const routes: NewRoute[];
  export { routes };
}
