<template>
  <a-modal
    v-bind="$attrs"
    :visible="value"
    @update:visible="updateValue"
    :title="title"
    centered
    :width="width"
    :closable="closable"
    :class="isScrollable && 'base-modal--with-scroll'"
  >
    <slot name="body" />

    <template #footer>
      <a-button
        v-if="!isOnlySubmitButton"
        key="back"
        @click="cancel"
        type="link"
        class="modal-button cancel-button"
      >
        {{ cancelButtonTitle }}
      </a-button>
      <a-button
        v-if="!isOnlyCancelButton"
        key="submit"
        @click="submit"
        type="link"
        class="modal-button submit-button"
      >
        {{ submitButtonTitle }}
      </a-button>

      <slot name="toolbar" />
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BModal",
  props: {
    value: {
      required: true,
      type: Boolean,
    },
    title: {
      required: true,
      type: String,
    },
    width: {
      default: 360,
      type: [String, Number],
    },
    cancelButtonTitle: {
      type: String,
      default: "Отменить",
    },
    submitButtonTitle: {
      type: String,
      default: "Выбрать",
    },
    closable: {
      type: Boolean,
      default: false,
    },
    isOnlySubmitButton: {
      type: Boolean,
      default: false,
    },
    isOnlyCancelButton: {
      type: Boolean,
      default: false,
    },
    isScrollable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:value", "submit", "cancel"],
  setup(props, { emit }) {
    const updateValue = () => {
      emit("update:value", false);
    };

    const cancel = () => {
      emit("cancel");
      updateValue();
    };

    const submit = () => {
      emit("submit");
      updateValue();
    };

    return {
      updateValue,
      submit,
      cancel,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-button {
  text-transform: uppercase;
  font-weight: 700;
  font-size: $font-size-xxs;
}

.cancel-button {
  color: $text-secondary;
}
</style>

<style lang="scss">
// modal
.base-modal__body {
  max-height: 320px;
  overflow: auto;
}

.ant-modal {
  max-width: 100%;
  &-footer {
    & button + button {
      margin-bottom: 0;
      margin-left: $offset-sm;
    }
    border-top: unset;
  }

  &-header {
    padding: $offset-sm;
    border-bottom: unset;
  }

  &-title {
    font-size: $font-size-xs;
    color: $text-base;
    font-weight: 700;
  }

  &-body {
    padding: 0 $offset-sm !important;

    .base-modal--with-scroll & {
      max-height: calc(94vh - 120px);
      overflow: auto;
    }
  }
}
</style>
