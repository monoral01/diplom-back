<template>
  <a-collapse
    @change="change"
    expandIconPosition="right"
    v-model:activeKey="activeKey"
  >
    <a-collapse-panel key="1" :header="header">
      <slot />
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BCollapse",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const activeKey = ref(["1"]);

    const change = () => {
      emit("change");
    };

    return {
      change,
      activeKey,
    };
  },
});
</script>

<style scoped lang="scss"></style>
