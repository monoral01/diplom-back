<template>
  <PageWrapper>
    <template #subheader>
      <div class="buttons-wrapper__right card__buttons">
        <a-button type="primary" ghost>Сохранить</a-button>
        <a-button type="primary">закрыть</a-button>
        <a-button type="primary" :disabled="!entityCardState.status"
          >удалить</a-button
        >
      </div>
    </template>
    <template #title>{{ header }}</template>
    <template #body>
      <a-divider />
      <div class="card__body">
        <a-form
          ref="formRef"
          :model="entityCardState"
          layout="vertical"
          :rules="{}"
          :validateOnRuleChange="true"
        >
          <a-row>
            <a-col span="24">
              <div class="tab-wrapper">
                <a class="active-tab"> Основная информация </a>
                <a @click="handleTabChange('/additionalInfo')">
                  Информация по счетам
                </a>
              </div>
            </a-col>
            <a-col span="16">
              <div class="tab-content">
                <a-row :gutter="GRID_BIG_SPACING">
                  <a-col span="24">
                    <a-row
                      :gutter="GRID_BASE_SPACING"
                      class="margined-card-body"
                    >
                      <a-col span="24">
                        <h3>Сведения о компании</h3>
                      </a-col>
                      <a-col span="12">
                        <a-form-item
                          name="companyName"
                          label="Название компании"
                        >
                          <a-input
                            v-model:value="entityCardState.companyName"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="status" label="Статус карточки">
                          <a-input
                            v-model:value="entityCardState.status"
                            disabled
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="createDate" label="Дата создания">
                          <a-input
                            v-model:value="entityCardState.createDate"
                            disabled
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <CreditHistoryResult
                          :value="entityCardState.creditHistoryResult"
                          :loading="false"
                        />
                      </a-col>
                      <a-col span="16"></a-col>
                      <a-col span="6">
                        <a-form-item name="companyNumber" label="ОГРН/ОГРНИП">
                          <a-input
                            v-model:value="entityCardState.companyNumber"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="companyINN" label="ИНН/КПП">
                          <a-input
                            v-model:value="entityCardState.companyINN"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item
                          label="Дата регистрации"
                          name="companyRegistrationDate"
                        >
                          <a-date-picker
                            v-model:value="
                              entityCardState.companyRegistrationDate
                            "
                            format="DD.MM.YYYY"
                            :disabled="false"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item
                          name="companyDirectorName"
                          label="ФИО руководителя"
                        >
                          <a-input
                            v-model:value="entityCardState.companyDirectorName"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <a-form-item name="postAddress" label="Почтовый адрес">
                          <a-input
                            v-model:value="entityCardState.postAddress"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <a-form-item
                          name="lawAddress"
                          label="Юридический адрес"
                        >
                          <a-input
                            v-model:value="entityCardState.lawAddress"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <a-form-item
                          name="companyCountry"
                          label="Страна регистрации"
                        >
                          <b-select
                            v-model:value="entityCardState.companyCountry"
                            :disabled="disabled"
                            :loadOptions="() => [{ label: 'РФ', value: '1' }]"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="24">
                        <b-collapse header="Документы">
                          <a-row :gutter="GRID_BASE_SPACING">
                            <a-col span="24">
                              <!-- <a-button
                                type="primary"
                                ghost
                                @click="saveRequisites"
                                >Приложить файл</a-button
                              > -->
                              <MultipleFileUpload />
                            </a-col>
                          </a-row>
                        </b-collapse>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col span="1">
              <a-divider type="vertical" class="card__divider" />
            </a-col>
            <a-col span="7">
              <div class="tab-content">
                <CardHistory
                  v-model:value="entityCardState.history"
                  :disabled="disabled"
                  @addItem="onAddHistoryManually"
                  @removeItem="onRemoveHistoryManually"
                />
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
import { EntityCardState } from "@/models/EntityEntity";
import { useRoute } from "vue-router";
import { initialCardState, cardHistoryColumns } from "./consts";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import BCollapse from "@/components/BCollapse.vue";
import { CardHistoryState } from "@/models/CardHistoryEntity";
import CardHistory from "../common/CardHistory.vue";
import { cardOptionsMap, CardMode } from "@/models/Common";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload.vue";
import BSelect from "@/components/BSelect.vue";
import CreditHistoryResult from "../common/CreditHistoryResult.vue";
import router from "@/router";

export default defineComponent({
  name: "EntityCard",
  components: {
    PageWrapper,
    CardHistory,
    BCollapse,
    MultipleFileUpload,
    BSelect,
    CreditHistoryResult,
  },
  setup() {
    const route = useRoute();
    const cardMode = computed(() => route.params.mode as string);
    const entityCardState = reactive<EntityCardState>(initialCardState);
    const disabled = computed(() => cardOptionsMap[cardMode.value].disabled);
    const currentTab = ref("/mainInfo");
    const header = computed(() => cardOptionsMap[cardMode.value].header);
    onMounted(() => {
      switch (cardMode.value) {
        case CardMode.ADD:
          Object.assign(entityCardState, initialCardState);
          break;
        case CardMode.EDIT:
          break;
        case CardMode.VIEW:
          break;
      }
    });
    const saveRequisites = () => {
      console.log("save");
    };
    const onAddHistoryManually = (item: CardHistoryState) => {
      const lastItemId = entityCardState.history.sort(
        (prev, curr) => prev.id - curr.id
      )[0];
      console.log(lastItemId);
      entityCardState.history.push(item);
    };
    const onRemoveHistoryManually = (id: number | string) => {
      entityCardState.history = entityCardState.history.filter(
        (historyItem) => historyItem.id !== id
      );
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
      entityCardState,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      disabled,
      cardHistoryColumns,
      saveRequisites,
      onAddHistoryManually,
      onRemoveHistoryManually,
      handleTabChange,
      currentTab,
    };
  },
});
</script>
<style scoped lang="scss">
.card {
  &__buttons {
    margin-top: $offset-xs;
  }
  &__divider {
    height: 100%;
  }
}
.tab-content {
  height: calc(100vh - 360px);
  overflow-y: auto;
  padding-right: $offset-sm;
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
