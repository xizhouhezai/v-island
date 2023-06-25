<template>
  <div class="w-full h-full">
    <template v-if="pageType === 'home'">
      <home-layout></home-layout>
    </template>
    <template v-else-if="pageType === 'doc'">
      <side-bar></side-bar>
      <div class="content">
        <div>
          <div class="island-doc">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <doc-footer />
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
    DocFooter
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
  max-width: calc(100vw - $sidebarWidth - var(--island-aside-width) - 100px);
}
</style>
