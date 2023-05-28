<template>
  <PageWrapper>
    <template #subheader>
      <div class="buttons-wrapper__right card__buttons">
        <a-button type="primary" ghost>Сохранить</a-button>
        <a-button type="primary">закрыть</a-button>
        <a-button type="primary">удалить</a-button>
      </div>
    </template>
    <template #title>{{ header }}</template>
    <template #body>
      <a-divider />
      <div class="card__body">
        <a-form
          ref="formRef"
          :model="addInfoState"
          layout="vertical"
          :rules="{}"
          :validateOnRuleChange="true"
        >
          <a-row>
            <a-col span="24">
              <div class="tab-wrapper">
                <a @click="handleTabChange('/mainInfo')">
                  Основная информация
                </a>
                <a class="active-tab"> Информация по счетам </a>
              </div>
            </a-col>
            <a-col span="24">
              <div class="tab-content">
                <a-row :gutter="GRID_BIG_SPACING">
                  <a-col span="24">
                    <a-row
                      :gutter="GRID_BASE_SPACING"
                      class="margined-card-body"
                    >
                      <a-col span="24">
                        <h4>Сведения об операциях клиента</h4>
                      </a-col>
                      <a-col span="24">
                        <b-collapse header="Последние операции">
                          <a-col span="24">
                            <a-form-item label=" ">
                              <a-checkbox
                                v-model:checked="
                                  addInfoState.operationsDetailed
                                "
                              >
                                Подробно
                              </a-checkbox>
                            </a-form-item>
                          </a-col>
                          <OperationHistory
                            :value="addInfoState.operationHistory"
                            :columns="operationColumns"
                          />
                        </b-collapse>
                      </a-col>
                      <a-col span="24">
                        <h4>Сведения о счетах клиента</h4>
                      </a-col>
                      <a-col
                        span="24"
                        v-for="item in addInfoState.accounts"
                        :key="item.requisitesCheckingAccount"
                      >
                        <b-collapse
                          :header="`Счёт №${item.requisitesCheckingAccount}`"
                        >
                          <a-row :gutter="GRID_BASE_SPACING">
                            <a-col span="8">
                              <a-form-item
                                name="timeCreate"
                                label="Время создания"
                              >
                                <a-input
                                  v-model:value="item.timeCreate"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="8">
                              <a-form-item
                                name="accountStatus"
                                label="Статус счёта"
                              >
                                <a-input
                                  v-model:value="item.accountStatus"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="8">
                              <a-form-item name="type" label="Тип счёта">
                                <a-input v-model:value="item.type" disabled />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="holder"
                                label="Держатель счёта"
                              >
                                <a-input v-model:value="item.holder" disabled />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="phoneNumber"
                                label="Номер телефона"
                              >
                                <a-input
                                  v-model:value="item.phoneNumber"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="sum"
                                label="Сумма средств на счёте"
                              >
                                <a-input v-model:value="item.sum" disabled />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="debt"
                                :label="`Долг на ${dayjs().format(
                                  'DD.MM.YYYY HH:mm'
                                )}`"
                              >
                                <a-input v-model:value="item.debt" disabled />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="percent"
                                label="Процентная ставка"
                              >
                                <a-input
                                  v-model:value="item.percent"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="debtDeadline"
                                label="Крайний срок платежа"
                              >
                                <a-input
                                  v-model:value="item.debtDeadline"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="requisitesCheckingAccount"
                                label="Расчётный счёт"
                              >
                                <a-input
                                  v-model:value="item.requisitesCheckingAccount"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="requisitesBankName"
                                label="Название банка"
                              >
                                <a-input
                                  v-model:value="item.requisitesBankName"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item name="requisitesBIK" label="БИК">
                                <a-input
                                  v-model:value="item.requisitesBIK"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item name="requisitesKPP" label="КПП">
                                <a-input
                                  v-model:value="item.requisitesKPP"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="requisitesKorrAccount"
                                label="Корр.счёт"
                              >
                                <a-input
                                  v-model:value="item.requisitesKorrAccount"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="12">
                              <a-form-item
                                name="requisitesCardNumber"
                                label="№ карты"
                              >
                                <a-input
                                  v-model:value="item.requisitesCardNumber"
                                  disabled
                                />
                              </a-form-item>
                            </a-col>
                            <a-col span="24">
                              <a-button
                                type="primary"
                                ghost
                                @click="saveRequisites"
                                >Скачать в pdf</a-button
                              >
                            </a-col>
                          </a-row>
                        </b-collapse>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { initialAddInfoState, initialCardState } from "../consts";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import BCollapse from "@/components/BCollapse.vue";
import { cardOptionsMap, CardMode } from "@/models/Common";
import BSelect from "@/components/BSelect.vue";
import router from "@/router";
import { AdditionalInfoState } from "@/models/AdditionalInfoEntity";
import OperationHistory from "@/modules/common/OperationHistory.vue";
import {
  operationHistoryColumns,
  operationHistoryColumnsShort,
} from "@/modules/common/consts";
import dayjs from "dayjs";
export default defineComponent({
  name: "PersonCardAdditionalInfo",
  components: {
    PageWrapper,
    BCollapse,
    OperationHistory,
  },
  setup() {
    const route = useRoute();
    const cardMode = computed(() => route.params.mode as string);
    const addInfoState = reactive<AdditionalInfoState>(initialAddInfoState);
    const currentTab = ref("/mainInfo");
    const disabled = computed(() => cardOptionsMap[cardMode.value].disabled);
    const header = computed(() => cardOptionsMap[cardMode.value].header);
    onMounted(() => {
      switch (cardMode.value) {
        case CardMode.ADD:
          Object.assign(addInfoState, initialCardState);
          break;
        case CardMode.EDIT:
          break;
        case CardMode.VIEW:
          break;
      }
    });
    const operationColumns = computed(() => {
      if (addInfoState.operationsDetailed) {
        return operationHistoryColumns;
      }
      return operationHistoryColumnsShort;
    });
    const saveRequisites = () => {
      console.log("save");
    };
    const handleTabChange = (tab: string) => {
      const newLink = `${route.path.split("/").slice(0, -1).join("/")}${tab}`;
      router.push(newLink);
      currentTab.value = tab;
    };
    return {
      cardOptionsMap,
      header,
      cardMode,
      addInfoState,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      disabled,
      saveRequisites,
      currentTab,
      handleTabChange,
      operationColumns,
      dayjs,
    };
  },
});
</script>
<style scoped lang="scss">
.ant-input-disabled {
  color: black;
}
.ant-divider {
  margin-top: 0;
  margin-bottom: 12px;
}
.active-tab {
  color: $primary-color !important;
  font-weight: 700;
  border-bottom: 1px solid $primary-color;
  height: 16px;
}
.tab-wrapper {
  display: flex;
  flex-wrap: wrap;

  & > a {
    font-size: 16px;
    margin-right: $offset-sm;
    margin-bottom: $offset-sm;
    text-transform: uppercase;
    white-space: nowrap;
    color: $text-secondary;
  }
}
img {
  width: 16vw;
  height: 24vh;
  object-fit: contain;
}
.card {
  &__buttons {
    margin-top: $offset-xs;
  }
  &__divider {
    height: 100%;
  }
  &__navigation {
    margin: 0;
    padding: 0;
  }
}
.tab-content {
  height: calc(100vh - 360px);
  overflow-y: auto;
  padding-right: $offset-sm;
}

.card__body {
  overflow-y: auto;
  padding-bottom: $offset-sm;
  height: calc(100vh - 240px);
}

@media (max-width: $max-widh-extension) {
  .tab-content {
    height: calc(100vh - 392px);
  }
}
@media (max-device-width: $max-tablet-width) {
  .tab-content {
    overflow-x: hidden;
    height: calc(100vh - 210px);
  }
  .card__body {
    overflow-y: hidden;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
