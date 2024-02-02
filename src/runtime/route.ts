import { createRouter as createVueRouter } from "vue-router";
import { routes } from "island:routes";
import { Header, PageData } from "shared/types";
import siteData from "island:site-data";

// const routes = [
//   {
//     path: "/",
//     component: () => import("../../docs/guide/a.vue")
//   },
//   {
//     path: "/a",
//     component: () => import("../../docs/guide/a.vue")
//   },
//   {
//     path: "/b",
//     component: () => import("../../docs/b.vue")
//   }
// ];

// console.log("process======>", routes);

export async function initPageData(routePath: string): Promise<PageData> {
  // console.log("routes=======>", routes, location.pathname);
  const matched = routes.filter((route) => route.path === routePath);
  if (matched.length) {
    const moduleInfo = await matched[0].preload();
    console.log("moduleInfo=======>", moduleInfo, siteData);
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? "doc",
      siteData,
      pagePath: routePath,
      frontmatter: moduleInfo.frontmatter,
      toc: moduleInfo.toc as Header[]
    };
  }
  return {
    pageType: "404",
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}

export const createRouter = (history) => {
  return createVueRouter({
    history,
    routes // `routes: routes` 的缩写
  });
};
