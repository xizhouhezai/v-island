import { createApp } from "./main";
import { createRouter, initPageData } from "./route";
import { createWebHistory, createMemoryHistory } from "vue-router";
import { Route } from "../node/plugin-route/index";

// import Layout from "../theme-default";

export async function ssg(client = false, route?: Route) {
  const { app } = createApp(client);

  const router = createRouter(
    !client
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL)
    // createMemoryHistory(import.meta.env.BASE_URL)
  );

  app.use(router);

  if (!client) {
    const pageData = await initPageData(route.path);
    app.provide("pageData", pageData);
  } else {
    const pageData = await initPageData(location.pathname);
    app.provide("pageData", pageData);
  }
  if (client) {
    app.mount("#root");
  }

  // console.log("import======>", router);

  return { router, app };
}

// console.log("12313========>", import.meta.env.SSR);

if (!import.meta.env.SSR) ssg(true);
