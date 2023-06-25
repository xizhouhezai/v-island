<template>
  <header fixed="~" pos="t-0 l-0" w="full" z="10">
    <div
      flex="~"
      items="center"
      justify="between"
      class="h-14 divider-bottom nav"
    >
      <div>
        <a
          href="/"
          hover="opacity-60"
          class="w-full h-full text-1rem font-semibold flex items-center"
        >
          Island.js
        </a>
      </div>
      <div flex="~">
        <!-- 普通菜单 -->
        <div flex="~">
          <div
            className="text-sm font-medium mx-3"
            v-for="(item, index) in siteData.themeConfig.nav"
            :key="index"
          >
            <a :href="item.link" class="link">
              {{ item.text }}
            </a>
          </div>
        </div>
        <!-- 白天/夜间模式切换 -->
        <div before="menu-item-before" flex="~">
          <SwitchAppearance />
        </div>

        <div class="social-link-icon" ml="2">
          <a href="/">
            <div class="i-carbon-logo-github w-5 h-5 fill-current"></div>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { inject } from "vue";
import { PageData } from "shared/types";

import SwitchAppearance from "../SwitchAppearance/index.vue";

export default {
  name: "NavHeader",
  setup() {
    const pageData = inject("pageData") as unknown as PageData;
    const { siteData } = pageData;
    return { siteData };
  },
  components: {
    SwitchAppearance
  }
};
</script>

<style lang="scss" scoped>
@import "./index.module.scss";
</style>
