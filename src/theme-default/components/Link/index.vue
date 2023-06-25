<template>
  <a :href="href" :target="target" :rel="rel" :class="className" class="link">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { toRefs } from "vue";

const EXTERNAL_URL_RE = /^https?/;

interface Data {
  href: string;
  className: string;
}

export default {
  name: "PageLink",
  props: {
    href: String,
    className: String
  },
  setup(props: Data) {
    const { href } = toRefs(props);
    const isExternal = EXTERNAL_URL_RE.test(href.value);
    const target = isExternal ? "_blank" : "";
    const rel = isExternal ? "noopener noreferrer" : undefined;
    return { target, rel };
  }
};
</script>

<style lang="scss" scoped>
.link:hover {
  color: var(--island-c-brand);
  transition: color 0.2s;
}

.link {
  display: block;
  font-size: 14px;
  font-weight: 500;

  &.h2-title {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
