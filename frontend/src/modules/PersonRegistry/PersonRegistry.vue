<template>
  <PageWrapper>
    <template #title> Реестр физических лиц</template>
    <template #body>
      <div class="registry__body">
        <a-form ref="formRef" layout="vertical" :hideRequiredMark="true">
          <a-row :gutter="GRID_BIG_SPACING">
            <a-col span="24"> </a-col>
            <a-col span="24">
              <h3>Фильтры поиска</h3>
            </a-col>
            <a-col span="24">
              <a-row :gutter="GRID_BIG_SPACING">
                <a-col span="8">
                  <a-form-item label="Идентификатор" name="id">
                    <a-input v-model:value="formState.id" :disabled="false" />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="Статус" name="status">
                    <b-select
                      v-model:value="formState.personStatus"
                      :allow-clear="true"
                      :load-options="
                        () => [
                          { label: 'Новая', value: '1' },
                          { label: 'В работе', value: '2' },
                        ]
                      "
                      :disabled="false"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="Дата создания карточки" name="date">
                    <a-range-picker
                      v-model:value="formState.dateStart"
                      format="DD.MM.YYYY"
                      :allowEmpty="[true, true]"
                      :disabled="false"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="Фамилия" name="brigadeNumber">
                    <a-input
                      v-model:value="formState.lastName"
                      :disabled="false"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="Имя" name="brigadeNumber">
                    <a-input
                      v-model:value="formState.firstName"
                      :disabled="false"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="Отчество" name="brigadeNumber">
                    <a-input
                      v-model:value="formState.patrName"
                      :disabled="false"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col span="24">
              <div class="buttons-wrapper__left">
                <a-button type="default">
                  <template #icon><SearchOutlined /></template>Поиск
                </a-button>
                <a-button type="default">
                  <template #icon><StopOutlined /></template> Очистить фильтры
                </a-button>
                <a-button type="default">
                  <template #icon><FileExcelOutlined /></template> Экспорт в ODS
                </a-button>
                <a-button type="default">
                  <template #icon><FormOutlined /></template
                  >Редактировать</a-button
                >
                <a-button type="default">
                  <template #icon><DeleteOutlined /></template>Удалить
                </a-button>
              </div>
            </a-col>
            <a-col span="24">
              <b-table
                :pagination="true"
                :columns="registryColumns"
                :total="40"
                :loading="loadingTable"
                :data-source="tableDataMock"
                :page-size="currentPageSize"
                :pageSizeOptions="['20', '50', '100']"
                :current="currentPage"
                :selectedRowKey="selectedRowKey"
                :selection="true"
                :row-change="true"
                @selectedRowChange="selectedRowChange"
                @paginationChange="paginationChange"
                @sortChange="sortChange"
                @updateColumns="updateColumns"
              />
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- <base-modal
        v-if="openCantDeleteModal === true"
        v-model:value="openCantDeleteModal"
        title="Удаление бригады"
        :closable="true"
        @submit="openCantDeleteModal = false"
        submit-button-title="Закрыть"
        cancel-button-title=""
      >
        <template #body> Невозможно удалить бригаду.</template>
      </base-modal>
      <base-modal
        v-if="openDeleteModal === true"
        v-model:value="openDeleteModal"
        title="Удаление бригады"
        :closable="true"
        @submit="openDeleteModal = false"
        submit-button-title="Закрыть"
        cancel-button-title=""
      >
        <template #body>
          Бригада {{ currentBrigade.brigadeNumber }} на дату
          {{ currentBrigade.futureDate.format("DD.MM.YYYY") }}
          удалена.</template
        >
      </base-modal> -->
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import BTable from "@/components/BTable.vue";
import { defineComponent, onMounted, ref } from "vue";
import { registryColumns } from "./consts";
import { tableDataMock } from "./__mocks/tableDataMock";
import PageWrapper from "@/components/PageWrapper.vue";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import {
  SearchOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  StopOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import BSelect from "@/components/BSelect.vue";

export default defineComponent({
  name: "PersonRegistry",
  components: {
    BTable,
    BSelect,
    PageWrapper,
    SearchOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    StopOutlined,
    FormOutlined,
  },
  setup() {
    const loadingTable = ref(true);
    const formState = ref({
      id: undefined,
      lastName: undefined,
      firstName: undefined,
      patrName: undefined,
      dateStart: undefined,
      personStatus: undefined,
    });
    onMounted(() => {
      setTimeout(() => {
        loadingTable.value = false;
      }, 1600);
    });
    return {
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      registryColumns,
      tableDataMock,
      formState,
      loadingTable,
    };
  },
});
</script>
<style scoped lang="scss">
.registry__body {
  overflow-y: auto;
  padding-right: $offset-sm;
  height: calc(100vh - 232px);
}
</style>
