<template>
  <!-- <div h="full"> -->
  <nav-header></nav-header>
  <section :style="{ paddingTop: 'var(--island-nav-height)' }">
    <page-content></page-content>
  </section>
  <!-- </div> -->
</template>

<script lang="ts">
// import { ref, inject } from "vue";
import NavHeader from "../components/Nav/index.vue";
import PageContent from "./content/index.vue";
// import siteData from "island:site-data";

export default {
  name: "layout",
  // setup() {
  //   const count = ref(0);
  //   console.log("inject======>", inject("pageData"));
  //   return { count };
  // },
  components: { NavHeader, PageContent }
};
</script>
