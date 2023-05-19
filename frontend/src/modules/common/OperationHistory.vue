<template>
  <b-table :disabled="false" :columns="columns" :data-source="value" />
</template>
<script lang="ts">
import BTable from "@/components/BTable.vue";
import { defineComponent, PropType } from "vue";
import { OperationHistoryState } from "@/models/AdditionalInfoEntity";

export default defineComponent({
  name: "OperationHistory",
  components: { BTable },
  props: {
    value: { type: Array as PropType<OperationHistoryState[]>, required: true },
    columns: { type: Array, required: true },
  },
});
</script>
<style lang="scss"></style>
