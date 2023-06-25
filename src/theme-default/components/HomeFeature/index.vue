<template>
  <div class="max-w-1152px" m="auto" flex="~ wrap" justify="between">
    <div
      border="rounded-md"
      p="r-4 b-4"
      w="1/3"
      v-for="(feature, index) in newFeatures"
      :key="index"
    >
      <article bg="bg-soft" border="~ bg-soft solid rounded-xl" p="6" h="full">
        <div
          bg="gray-light-4 dark:bg-white"
          border="rounded-md"
          class="mb-5 w-12 h-12 text-3xl flex-center"
        >
          {{ feature.icon }}
        </div>
        <h2 font="bold">{{ feature.title }}</h2>
        <p text="sm text-2" font="medium" class="pt-2 leading-6">
          {{ feature.details }}
        </p>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { Feature } from "../../../shared/types/index";
import { toRefs } from "vue";

interface Data {
  features: Feature[];
}

export default {
  name: "HomeFeature",
  props: {
    features: Array
  },
  setup(props: Data) {
    const { features } = toRefs(props);

    const newFeatures = features.value;

    console.log("======>", features);

    return { newFeatures };
  }
};
</script>
