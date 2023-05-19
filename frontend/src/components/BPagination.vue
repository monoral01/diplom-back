<template>
  <div>
    <a-pagination
      v-model:current="current1"
      v-model:pageSize="pageSize"
      show-size-changer
      :total="500"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "BPagination",
  setup() {
    const pageSize = ref(20);
    const current1 = ref(3);
    const current2 = ref(4);
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize);
    };
    watch(pageSize, () => {
      console.log("pageSize", pageSize.value);
    });
    watch(current1, () => {
      console.log("current", current1.value);
    });
    return {
      pageSize,
      current1,
      current2,
      onShowSizeChange,
    };
  },
});
</script>
