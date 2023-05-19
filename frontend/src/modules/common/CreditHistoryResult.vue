<template>
  <a-form-item
    label="Результат проверки по кредитной истории"
    name="falseCallResult"
  >
    <a-spin v-if="loading" size="small" />
    <a-input
      v-else
      disabled
      v-model:value="state.text"
      :class="`custom-input ${state.style}`"
    />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from "vue";

export default defineComponent({
  name: "CreditHistoryResult",
  props: {
    value: {
      required: true,
    },
    loading: {
      required: true,
    },
  },
  setup(props) {
    const state = computed(() => {
      if (props.value === true) {
        return { text: "Можно выдать кредит", style: "custom-input-green" };
      }
      if (props.value === false) {
        return { text: "Нельзя выдать кредит", style: "custom-input-red" };
      }
      return { text: undefined, style: undefined };
    });
    return { state };
  },
});
</script>
<style scoped lang="scss">
.custom-input {
  color: black;
  &-red {
    background-color: $light-red;
  }
  &-green {
    background-color: $light-green;
  }
}
</style>
