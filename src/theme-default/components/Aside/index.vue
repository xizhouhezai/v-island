<template>
  <div flex="~ col 1" style="width: 'var(--island-aside-width)'">
    <div>
      <div
        v-if="hasOutline"
        id="aside-container"
        class="relative divider-left pl-4 text-13px font-medium"
      >
        <div
          ref="markerRef"
          id="aside-marker"
          class="absolute top-33px left-0 opacity-0 w-2px h-18px bg-brand"
          style="
            left: '-1px';
            transition: 'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s';
          "
        ></div>
        <div leading-7="~" text="13px" font="semibold">ON THIS PAGE</div>
        <nav>
          <ul relative="~">
            <li v-for="header in headers" :key="header.id">
              <a
                :href="'#' + header.id"
                class="block leading-7 text-text-2 hover:text-text-1"
                transition="color duration-300"
                :style="{ paddingLeft: (header.depth - 2) * 12 + 'px' }"
                @click.stop="scrollToTarget(header, false)"
              >
                {{ header.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref, onMounted, onDeactivated } from "vue";
import { PageData } from "shared/types";

import { scrollToTarget, bindingAsideScroll } from "./asideScroll";

export default {
  name: "SideBar",
  setup() {
    onMounted(() => {
      const unbinding = bindingAsideScroll();

      onDeactivated(() => {
        unbinding();
      });
    });

    // const route = useRoute();
    // const { siteData } = toRefs(props);
    const pageData = inject("pageData") as unknown as PageData;
    const { toc } = pageData;

    const hasOutline = ref(toc?.length > 0);
    const headers = ref(toc || []);

    console.log("======pageData", pageData, toc);

    return {
      hasOutline,
      headers,
      scrollToTarget
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped></style>
