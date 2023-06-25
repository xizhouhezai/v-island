<template>
  <footer mt="8">
    <div flex="~" gap="2" divider-top="~" pt="6">
      <div flex="~ col" class="prev">
        <a :href="prevPage.link" class="pager-link" v-if="prevPage">
          <span class="desc">上一页</span>
          <span class="title">{{ prevPage.text }}</span>
        </a>
      </div>
      <div flex="~ col" class="next">
        <a :href="nextPage.link" class="pager-link next" v-if="nextPage">
          <span class="desc">下一页</span>
          <span class="title">{{ nextPage.text }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { inject, computed } from "vue";
import { PageData, SidebarItem } from "../../../shared/types/index";
import { text } from "node:stream/consumers";

export default {
  name: "DocFooter",
  setup() {
    const pathname = typeof window !== "undefined" ? location.pathname : "";
    const pageData = inject("pageData") as unknown as PageData;
    const { siteData } = pageData;

    const sidebar = siteData.themeConfig?.sidebar || {};
    const flattenTitles: SidebarItem[] = [];

    // 遍历 Sidebar 数据，收集所有的文章信息，并平铺到一个数组里面
    Object.keys(sidebar).forEach((key) => {
      const groups = sidebar[key] || [];
      groups.forEach((group) => {
        flattenTitles.push({
          link: group.link,
          text: group.text || "首页"
        });
        group.items.forEach((item) => {
          flattenTitles.push(item);
        });
      });
    });

    const pageIndex = flattenTitles.findIndex((item) => item.link === pathname);

    const prevPage = computed(() => {
      return flattenTitles[pageIndex - 1] || null;
    });
    const nextPage = computed(() => {
      return flattenTitles[pageIndex + 1] || null;
    });

    console.log(
      "siteData====11111======>",
      flattenTitles,
      pageIndex,
      flattenTitles[pageIndex - 1]
    );

    return { prevPage, nextPage };
  }
};
</script>

<style lang="scss" scoped>
.prev,
.next {
  width: 50%;
}

.pager-link {
  display: block;
  border: 1px solid var(--island-c-divider-light);
  border-radius: 8px;
  padding: 8px 16px 8px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--island-c-brand);
}

.pager-link:hover .title {
  color: var(--island-c-brand-dark);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--island-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--island-c-brand);
  transition: color 0.25s;
}
</style>
