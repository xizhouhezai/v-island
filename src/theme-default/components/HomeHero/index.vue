<template>
  <div m="auto" p="t-20 x-16 b-16">
    <div flex="~" class="max-w-1152px" m="auto">
      <div text="left" flex="~ col" class="max-w-592px">
        <h1 font="bold" text="6xl" class="max-w-576px">
          <span class="clip">{{ hero.name }}</span>
        </h1>
        <p text="6xl" font="bold" class="max-w-576px">
          {{ hero.text }}
        </p>
        <p
          p="t-3"
          text="2xl text-2"
          font="medium"
          class="whitespace-pre-wrap max-w-576px"
        >
          {{ hero.tagline }}
        </p>
        <div flex="~ wrap" justify="start" p="t-8">
          <div p="1" v-for="action in hero.actions" :key="action.link">
            <page-button
              type="a"
              :text="action.text"
              :href="action.link"
              :theme="action.theme"
              :external="true"
            />
          </div>
        </div>
      </div>
      <div w="max-96" h="max-96" flex="center" m="auto" v-if="hero.image">
        <img :src="hero.image.src" :alt="hero.image.alt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Hero } from "../../../shared/types/index";
import { toRefs } from "vue";

import PageButton from "../Button/index.vue";

interface Data {
  hero: Hero;
}

export default {
  name: "HomeHero",
  props: {
    hero: Object
  },
  setup(props: Data) {
    const { hero } = toRefs(props);

    console.log("======>", hero);

    return {};
  },
  components: { PageButton }
};
</script>

<style lang="scss" scoped>
.clip {
  background: var(--island-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--island-home-hero-name-color);
}
</style>
