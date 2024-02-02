<template>
  <div class="w-full h-full">
    <template v-if="pageType === 'home'">
      <home-layout></home-layout>
    </template>
    <template v-else-if="pageType === 'doc'">
      <side-bar></side-bar>
      <div class="content" flex="~">
        <div class="doc-content">
          <div class="island-doc">
            <router-view></router-view>
          </div>
          <doc-footer />
        </div>
        <div class="aside-container">
          <AsideCom />
        </div>
      </div>
    </template>
    <template v-else>
      <div>404页面</div>
    </template>
  </div>
</template>

<script lang="ts">
import { inject } from "vue";
import { PageData } from "shared/types";

import HomeLayout from "../HomeLayout/index.vue";
import SideBar from "../../components/SideBar/index.vue";
import DocFooter from "../../components/DocFooter/index.vue";
import AsideCom from "../../components/Aside/index.vue";

export default {
  name: "PageContent",
  setup() {
    const pageData = inject("pageData") as unknown as PageData;
    const { siteData, pageType } = pageData;
    // console.log("inject======>", inject("pageData"));
    return { siteData, pageType };
  },
  components: {
    HomeLayout,
    SideBar,
    DocFooter,
    AsideCom
  }
};
</script>

<style lang="scss" scoped>
$sidebarWidth: calc(
  var(--island-sidebar-width) + ((100vw - var(--island-layout-max-width)) / 2)
);

$sidebarPadding: calc(32px + (100vw - var(--island-layout-max-width)) / 2);

.content {
  padding: 48px 24px;
  margin-left: calc(
    var(--island-sidebar-width) + ((100vw - var(--island-layout-max-width)) / 2) +
      48px
  );
  padding-right: $sidebarPadding;
  // 100 vw - sidebar 的宽度  - 右侧大纲栏的宽度 - padding-right
  max-width: calc(100vw - $sidebarWidth);
}
.doc-content {
  margin-right: 80px;
  min-width: 768px;
  // 正文部分最大宽度: 100vw - sidebar 的宽度 - aside 的宽度 - 右边的 padding 和 margin
  max-width: calc(
    100vw - $sidebarWidth - var(--island-aside-width) -
      (100vw - var(--island-layout-max-width)) / 2 - 80px
  );
}

.aside-container {
  position: sticky;
  top: 0;
  margin-top: calc(var(--island-nav-height) * -1 - 32px);
  padding-top: calc(var(--island-nav-height) + 32px);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
