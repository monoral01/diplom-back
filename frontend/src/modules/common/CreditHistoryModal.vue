<template>
  <b-modal
    v-if="openModalWindow"
    v-model:value="openModalWindow"
    title="Введите адрес"
    :width="824"
    height="426px"
    @submit="addAddress"
    submit-button-title="Добавить"
    cancel-button-title="Закрыть"
  >
    <template #body>
      <a-row :gutter="GRID_BASE_SPACING" v-if="notRf">
        <a-col :span="24">
          <a-form-item
            class="label-radio-group required"
            name="structuredAddressType"
          >
            <a-radio-group
              v-model:value="personCardState.structuredAddressType"
            >
              <a-radio :value="true">Структурированный адрес</a-radio>
              <a-radio :value="false">Текстовый</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </b-modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { OperationHistoryState } from "@/models/AdditionalInfoEntity";
import BModal from "@/components/BModal.vue";
import { GRID_BASE_SPACING } from "@/common/consts";
export default defineComponent({
  name: "OperationHistory",
  components: { BModal },
  props: {
    value: { type: Array as PropType<OperationHistoryState[]>, required: true },
    columns: { type: Array, required: true },
  },
  setup() {
    return { GRID_BASE_SPACING };
  },
});
</script>
<style></style>
