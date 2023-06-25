<template>
  <home-hero :hero="frontmatter.hero"></home-hero>
  <home-feature :features="frontmatter.features"></home-feature>
</template>

<script lang="ts">
import HomeHero from "../../components/HomeHero/index.vue";
import HomeFeature from "../../components/HomeFeature/index.vue";

import { inject } from "vue";
import { PageData } from "shared/types";

export default {
  name: "HomeLayout",
  components: {
    HomeHero,
    HomeFeature
  },
  setup() {
    const pageData = inject("pageData") as unknown as PageData;
    const { frontmatter } = pageData;
    return { frontmatter };
  }
};
</script>
