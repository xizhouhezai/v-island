import type { Plugin } from "unified";
import type { Root, Text } from "hast";
import shiki from "shiki";
import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";

interface Options {
  highlighter: shiki.Highlighter;
}

export const rehypePluginShiki: Plugin<[Options], Root> = ({ highlighter }) => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre" &&
        node.children[0]?.type === "element" &&
        node.children[0].tagName === "code"
      ) {
        const codeNode = node.children[0];
        const codeContent = (codeNode.children[0] as Text).value;
        const codeClassName = codeNode.properties?.className?.toString() || "";

        // 获取编程语言类型
        const lang = codeClassName.split("-")[1];

        if (!lang) return;

        // 高亮代码
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });

        // console.log("highlightedCode=======>", highlightedCode);

        // 将HTML片段转成AST
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });

        // 将加入代码高亮的AST替换老的AST
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};
