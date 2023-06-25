<template>
  <button
    v-if="type === 'button'"
    class="button"
    :class="theme + ' ' + size + ' ' + className"
  >
    {{ text }}
  </button>
  <a
    :href="href"
    v-else-if="type === 'a' && external"
    class="button"
    :class="theme + ' ' + size + ' ' + className"
    >{{ text }}</a
  >
  <page-link v-else :href="href" :class-name="className">
    <span>{{ text }}</span>
  </page-link>
</template>

<script lang="ts">
import PageLink from "../Link/index.vue";

export default {
  name: "PageButton",
  props: {
    type: String,
    size: {
      type: String,
      default: "medium"
    },
    theme: {
      type: String,
      default: "brand"
    },
    text: String,
    href: String,
    external: Boolean,
    className: {
      type: String,
      default: ""
    }
  },
  components: { PageLink }
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.button:active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.button.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.button.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: 16px;
}

.button.brand {
  border-color: var(--island-button-brand-border);
  color: var(--island-button-brand-text);
  background-color: var(--island-button-brand-bg);
}

.button.brand:hover {
  opacity: 1;
  border-color: var(--island-button-brand-hover-border);
  color: var(--island-button-brand-hover-text);
  background-color: var(--island-button-brand-hover-bg);
}

.button.brand:active {
  border-color: var(--island-button-brand-active-border);
  color: var(--island-button-brand-active-text);
  background-color: var(--island-button-brand-active-bg);
}

.button.alt {
  border-color: var(--island-button-alt-border);
  color: var(--island-button-alt-text);
  background-color: var(--island-button-alt-bg);
}

.button.alt:hover {
  border-color: var(--island-button-alt-hover-border);
  color: var(--island-button-alt-hover-text);
  background-color: var(--island-button-alt-hover-bg);
}

.button.alt:active {
  border-color: var(--island-button-alt-active-border);
  color: var(--island-button-alt-active-text);
  background-color: var(--island-button-alt-active-bg);
}
</style>
