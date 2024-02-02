import { Plugin } from "unified";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import { parse } from "acorn";
import type { MdxjsEsm, Program } from "mdast-util-mdxjs-esm";

interface tocItem {
  id: string;
  depth: number;
  text: string;
}

interface ChildNode {
  type: "link" | "text" | "inlineCode";
  value: string;
  children?: ChildNode[];
}

export const remarkPluginToc: Plugin<[], Root> = () => {
  return (tree) => {
    const toc: tocItem[] = [];

    // 每次编译时都重新进行实例的初始化
    const slugger = new Slugger();

    visit(tree, "heading", (node) => {
      if (!node.depth || !node.children) return;

      // h2-h4
      if (node.depth > 1 && node.depth < 5) {
        const originText = (node.children as ChildNode[])
          .map((child) => {
            switch (child.type) {
              case "link":
                return child.children?.map((c) => c.value).join("") || "";
              default:
                return child.value;
            }
          })
          .join("");

        const id = slugger.slug(originText);

        toc.push({
          id,
          text: originText,
          depth: node.depth
        });

        // console.log("toc=======>", toc);
      }
    });

    // 暴露toc的数据
    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;

    // 将toc重新插入到树
    tree.children.push({
      type: "mdxjsEsm",
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: "module"
        }) as unknown as Program
      }
    } as MdxjsEsm);
    // console.log(
    //   "tree=======>",
    //   parse(insertCode, {
    //     ecmaVersion: 2020,
    //     sourceType: "module"
    //   }) as unknown as Program
    // );
  };
};
