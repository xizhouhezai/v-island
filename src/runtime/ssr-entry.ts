// import { createApp } from "./main";
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from "vue/server-renderer";
// import { Component } from "vue";

// import { createMemoryHistory } from "vue-router";
// import { createRouter } from "./route";

// import Layout from "../theme-default";
import { ssg } from "./client-entry";
import { Route } from "../node/plugin-route/index";

export async function render(route: Route) {
  try {
    const { app, router } = await ssg(false, route);

    if (route) {
      await router.push(route.path);
      await router.isReady();
    }

    return renderToString(app);
  } catch (error) {
    console.log(error);
  }
}

// 导出路由数据
export { routes } from "island:routes";
