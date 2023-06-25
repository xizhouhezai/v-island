import { defineConfig } from "../dist";

module.exports = defineConfig({
  title: "hello world",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/" }
    ],
    // 新增 sidebar 的内容
    sidebar: {
      "/guide/": [
        {
          text: "教程",
          link: "/guide/",
          items: [
            {
              text: "快速上手",
              link: "/guide/a"
            },
            {
              text: "如何安装",
              link: "/guide/b"
            }
          ]
        }
      ]
    }
  }
});
