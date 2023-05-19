<template>
  <a-select
    v-bind="$attrs"
    :value="value"
    @update:value="updateValue"
    @search="searchValue"
    @focus="focusValue"
    :allowClear="allowClear"
    :options="options"
    :labelInValue="true"
    :loading="loading"
    :show-search="searchable"
    :filter-option="filterOption"
    :filter-sort="filterSort"
    :getPopupContainer="(trigger: any) => trigger.parentNode"
    :field-names="fieldNames"
    :optionLabelProp="fieldNames.label"
    :notFoundContent="notFoundContent"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
type DictOption = {
  label: string;
  value: string;
};

export default defineComponent({
  name: "AsyncSelect",
  props: {
    loadOptions: {
      required: true,
      type: Function,
    },
    value: {
      required: false,
      type: Object,
    },
    fieldNames: {
      default: {
        label: "label",
      },
    },
    searchable: {
      default: false,
    },
    loading: {
      default: false,
    },
    allowClear: {
      default: false,
    },
    orderBy: {
      required: false,
      type: String,
    },
    notFoundContent: {
      required: false,
      type: String,
      default: undefined,
    },
  },
  emits: ["update:value", "search", "focus"],
  setup(props, { emit }) {
    const options = ref<any[]>([]);
    const updateValue = (newValue: DictOption) => {
      emit("update:value", newValue);
    };

    const searchValue = (newValue: any) => {
      emit("search", newValue);
    };

    const focusValue = (newValue: DictOption) => {
      emit("focus", newValue);
    };

    const filterSort = (prev: DictOption, curr: DictOption) =>
      prev.label > curr.label ? 1 : -1;

    watchEffect(async () => {
      options.value = await props.loadOptions();
      if (props.orderBy) {
        const sortedOptions = [...options.value].sort(filterSort);
        if (props.orderBy === "asc") {
          options.value = sortedOptions;
        }
        if (props.orderBy === "desc") {
          options.value = sortedOptions.reverse();
        }
      }
    });
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      updateValue,
      options,
      filterOption,
      searchValue,
      focusValue,
      filterSort,
    };
  },
});
</script>
