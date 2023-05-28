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
                  <a-form-item label="Статус" name="personStatus">
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
                <a-button type="default" @click="search">
                  <template #icon><SearchOutlined /></template>Поиск
                </a-button>
                <a-button type="default" @click="reset">
                  <template #icon><StopOutlined /></template> Очистить фильтры
                </a-button>
                <a-button type="default" @click="openCard">
                  <template #icon><FormOutlined /></template
                  >Редактировать</a-button
                >
                <a-button type="default" @click="deleteCard">
                  <template #icon><DeleteOutlined /></template>Удалить
                </a-button>
              </div>
            </a-col>
            <a-col span="24">
              <b-table
                :pagination="true"
                :columns="registryColumns"
                :total="dataSource.length"
                :loading="loadingTable"
                :data-source="dataSource"
                :page-size="currentPageSize"
                :pageSizeOptions="['20', '50', '100']"
                :current="currentPage"
                :selectedRowKey="selectedRowKey"
                :selection="true"
                :row-change="true"
                @selectedRowChange="selectedRowChange"
                @paginationChange="paginationChange"
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
  StopOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import BSelect from "@/components/BSelect.vue";
import {
  deletePerson,
  getPersonRegistry,
} from "@/service/personRegistryService";
import { useTable } from "@/helpers/useTable";
import router from "@/router";
import { errorNotification, infoNotification } from "@/helpers/notification";

export default defineComponent({
  name: "PersonRegistry",
  components: {
    BTable,
    BSelect,
    PageWrapper,
    SearchOutlined,
    DeleteOutlined,
    StopOutlined,
    FormOutlined,
  },
  setup() {
    const formState = ref({
      id: undefined,
      lastName: undefined,
      firstName: undefined,
      patrName: undefined,
      dateStart: undefined,
      personStatus: undefined,
    });
    const {
      dataSource,
      total,
      currentFilters,
      currentPageSize,
      currentPage,
      loadingTable,
      selectedRowKey,
      selectedRow,
      paginationChange,
      selectedRowChange,
    } = useTable(getPersonRegistry);
    const reset = () => {
      formState.value.id = undefined;
      formState.value.lastName = undefined;
      formState.value.firstName = undefined;
      formState.value.patrName = undefined;
      formState.value.dateStart = undefined;
      formState.value.personStatus = undefined;
    };
    const search = async () => {
      dataSource.value = await getPersonRegistry({
        page: currentPage.value,
        pageSize: currentPageSize.value,
        filters: formState.value,
      });
    };
    const openCard = () => {
      router.push(`/personRegistry/card/edit/${selectedRowKey.value}/mainInfo`);
    };
    const deleteCard = async () => {
      try {
        await deletePerson(selectedRowKey.value);
        infoNotification("Запись удалена");
      } catch (err) {
        errorNotification("При удалении произошла ошибка");
      }
    };
    onMounted(async () => {
      dataSource.value = await getPersonRegistry({
        page: 1,
        pageSize: 5,
        filters: formState.value,
      });
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
      dataSource,
      total,
      currentFilters,
      currentPageSize,
      currentPage,
      selectedRowKey,
      selectedRow,
      paginationChange,
      selectedRowChange,
      reset,
      search,
      openCard,
      deleteCard,
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
