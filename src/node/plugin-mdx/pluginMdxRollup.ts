import pluginMdx from "@mdx-js/rollup";
import type { Plugin } from "vite";

// md语法规范
import remarkPluginGFM from "remark-gfm";

// 锚链接，为标题元素增加一个锚点
import rehypePluginAutolinkHeadings from "rehype-autolink-headings";
import rehypePluginSlug from "rehype-slug";

// 解析元数据
import remarkPluginMDXFrontMatter from "remark-mdx-frontmatter";
import remarkPluginFrontmatter from "remark-frontmatter";

// 代码块预处理
import { rehypePluginPreWrapper } from "./rehypePlugins/preWrapper";

// 高亮代码
import { rehypePluginShiki } from "./rehypePlugins/shiki";
import shiki from "shiki";
import { remarkPluginToc } from "./remarkPlugins/toc";

export async function pluginMdxRollup(): Promise<Plugin> {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      remarkPluginToc,
      [remarkPluginMDXFrontMatter, { name: "frontmatter" }] // 将元数据收敛到一个对象中
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: "header-anchor"
          },
          content: {
            type: "text",
            value: "#"
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        { highlighter: await shiki.getHighlighter({ theme: "nord" }) }
      ]
    ],
    jsx: true
  }) as unknown as Plugin;
}
