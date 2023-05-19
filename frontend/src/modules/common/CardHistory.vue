<template>
  <a-row :gutter="GRID_BIG_SPACING">
    <a-col span="24">
      <a-row :gutter="GRID_BASE_SPACING" class="margined-card-body">
        <a-col span="24">
          <h3>История взаимодействия</h3>
        </a-col>
        <a-col span="24">
          <a-col span="24">
            <a-button
              type="primary"
              ghost
              :disabled="showAddHistoryManually || disabled"
              @click="showAddHistoryManually = true"
              >Добавить вручную</a-button
            >
          </a-col>
          <div v-if="showAddHistoryManually">
            <a-col span="24">
              <a-form-item name="date" label="Дата и время">
                <a-date-picker
                  :showTime="true"
                  v-model:value="addHistoryManuallyState.date"
                  format="DD.MM.YYYY"
                  :disabled="false"
                />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item name="action" label="Действие">
                <a-input v-model:value="addHistoryManuallyState.action" />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item name="result" label="Результат">
                <a-input v-model:value="addHistoryManuallyState.result" />
              </a-form-item>
            </a-col>
            <br />
            <a-col span="24" class="buttons-wrapper__right">
              <a-button
                type="primary"
                ghost
                :disabled="
                  !addHistoryManuallyState.action?.length ||
                  !addHistoryManuallyState.result?.length
                "
                @click="addHistoryManually"
                >Добавить в таблицу</a-button
              >
              <a-button type="primary" ghost @click="resetHistoryManually"
                >Закрыть</a-button
              >
            </a-col>
          </div>
        </a-col>
        <a-col span="24">
          <b-table
            :disabled="false"
            :columns="cardHistoryColumns"
            :data-source="value"
            @on-delete="removeHistoryManually"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import {
  CellConst,
  GRID_BASE_SPACING,
  GRID_BIG_SPACING,
} from "@/common/consts";
import BTable from "@/components/BTable.vue";
import { CardHistoryState } from "@/models/CardHistoryEntity";
import dayjs, { Dayjs } from "dayjs";
import { PropType, defineComponent, ref } from "vue";
const cardHistoryColumns = [
  {
    title: "Дата и время",
    dataIndex: "dateTime",
    width: 200,
  },
  {
    title: "Событие",
    dataIndex: "info",
    width: 200,
  },
  {
    title: "",
    dataIndex: CellConst.REMOVE_RECORD,
    allowDeleteAttribute: "dateTime",
    width: 50,
    slot: CellConst.REMOVE_RECORD,
  },
];

export default defineComponent({
  name: "CardHistory",
  components: { BTable },
  props: {
    disabled: { type: Boolean, default: false },
    value: { type: Array as PropType<CardHistoryState[]>, required: true },
  },
  emits: ["@update:value", "addItem", "removeItem"],
  setup(props, { emit }) {
    const addHistoryManuallyState = ref<{
      date?: Dayjs;
      action?: string;
      result?: string;
    }>({
      date: undefined,
      action: undefined,
      result: undefined,
    });
    const showAddHistoryManually = ref(false);
    const resetHistoryManually = () => {
      showAddHistoryManually.value = false;
      addHistoryManuallyState.value.action = undefined;
      addHistoryManuallyState.value.date = undefined;
      addHistoryManuallyState.value.result = undefined;
    };
    const addHistoryManually = () => {
      const valueCopy = [...props.value];
      const lastItemId = valueCopy.sort((prev, curr) => prev.id - curr.id)[0];
      console.log(lastItemId);
      const itemToAdd = {
        key: lastItemId ? lastItemId.id + 1 : 1,
        id: lastItemId ? lastItemId.id + 1 : 1,
        dateTime: addHistoryManuallyState.value.date
          ? addHistoryManuallyState.value.date.format("DD/MM/YY HH:mm")
          : dayjs().format("DD/MM/YY HH:mm"),
        info: `${addHistoryManuallyState.value.action}. ${addHistoryManuallyState.value.result}`,
      };
      emit("addItem", itemToAdd);
      resetHistoryManually();
    };

    const removeHistoryManually = (key: number) => {
      emit("removeItem", key);
    };
    return {
      cardHistoryColumns,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      addHistoryManuallyState,
      showAddHistoryManually,
      resetHistoryManually,
      addHistoryManually,
      removeHistoryManually,
    };
  },
});
</script>
<style lang="scss"></style>
