<template>
  <button class="switch" type="button" role="switch" @click="toggle">
    <span class="check">
      <span class="icon">
        <div class="sun">
          <div className="i-carbon-sun" w="full" h="full"></div>
        </div>
        <div class="moon">
          <div className="i-carbon-moon" w="full" h="full"></div>
        </div>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
import { toggle } from "./toggleAppearance";

export default {
  name: "SwitchAppearance",
  setup() {
    return {
      toggle
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./index.module.scss";
</style>

<style lang="scss">
.dark .check {
  background-color: var(--island-c-black);
  transform: translateX(18px);
}
.dark .icon svg {
  fill: var(--island-c-text-1);
  transition: opacity 0.25s;
}
.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}
</style>
