<template>
  <aside class="sidebar">
    <nav>
      <section
        block="~"
        not-first="divider-top mt-4"
        v-for="(item, index) in matchedSidebar"
        :key="index"
      >
        <div flex="~" justify="between" items="center">
          <h2 m="t-3 b-2" text="1rem text-1" font="bold">
            <page-link
              :href="item.link"
              v-if="item.link"
              class-name="h2-title"
              >{{ item.text }}</page-link
            >
            <span v-else>{{ item.text }}</span>
          </h2>
        </div>
        <div mb="1">
          <div v-for="i in item.items" :key="i.link">
            <div ml="5">
              <div
                p="1"
                block="~"
                text="sm"
                font-medium="~"
                :class="i.link === pathName ? 'text-brand' : 'text-text-2'"
              >
                <page-link :href="i.link">{{ i.text }}</page-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  </aside>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { inject, reactive, ref, watch } from "vue";
import { PageData } from "shared/types";

// import { UserConfig } from "shared/types";
// import { toRefs } from "vue";

import PageLink from "../Link/index.vue";
// import { SidebarGroup } from "../../../shared/types/index";

export default {
  name: "SideBar",
  setup() {
    const route = useRoute();
    // const { siteData } = toRefs(props);
    const pageData = inject("pageData") as unknown as PageData;
    const { siteData } = pageData;

    const sideBarData = siteData.themeConfig?.sidebar;
    let pathName = ref("");
    let matchedSidebarKey: string;
    let matchedSidebar = ref([]);

    watch(
      () => route.path,
      () => {
        matchedSidebar.value = [];
        pathName.value = route.path;
        matchedSidebarKey = Object.keys(sideBarData).find((key) => {
          if (pathName.value.startsWith(key)) {
            return true;
          }
        });
        sideBarData[matchedSidebarKey]
          ? matchedSidebar.value.push(...sideBarData[matchedSidebarKey])
          : matchedSidebar.value.push(...[]);
      },
      { deep: true, immediate: true }
    );

    return {
      matchedSidebar,
      pathName
    };
  },
  components: { PageLink }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: var(--island-z-index-sidebar);
  padding: 32px 32px 96px;
  width: calc(100vw - 64px);
  max-width: 320px;
  background-color: var(--island-c-bg);
  opacity: 0;
  box-shadow: var(--island-c-shadow-3);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.25s ease;
}

:global(.dark) .sidebar {
  box-shadow: var(--island-shadow-1);
}

@media (min-width: 960px) {
  .sidebar {
    z-index: 1;
    padding-top: var(--island-nav-height);
    padding-bottom: 128px;
    width: var(--island-sidebar-width);
    max-width: 100%;
    background-color: var(--island-c-bg-alt);
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
  }
}

@media (min-width: 1440px) {
  .sidebar {
    padding-left: max(
      32px,
      calc(32px + (100% - var(--island-layout-max-width)) / 2)
    );
    width: calc(
      var(--island-sidebar-width) +
        ((100% - var(--island-layout-max-width)) / 2)
    );
  }
}
</style>
