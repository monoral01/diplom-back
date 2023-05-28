<template>
  <PageWrapper>
    <template #subheader>
      <div class="buttons-wrapper__right card__buttons">
        <a-button type="primary" ghost>Сохранить</a-button>
        <a-button type="primary">закрыть</a-button>
        <a-button type="primary" :disabled="!companyCardState.companyStatus"
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
          :model="companyCardState"
          layout="vertical"
          :rules="rules"
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
                            v-model:value="companyCardState.companyName"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item
                          name="companyStatus"
                          label="Статус карточки"
                        >
                          <a-input
                            v-model:value="companyCardState.companyStatus"
                            disabled
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="createDate" label="Дата создания">
                          <a-input
                            v-model:value="companyCardState.createDate"
                            disabled
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="companyNumber" label="ОГРН/ОГРНИП">
                          <a-input
                            v-model:value="companyCardState.companyNumber"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="6">
                        <a-form-item name="companyInn" label="ИНН/КПП">
                          <a-input
                            v-model:value="companyCardState.companyInn"
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
                              companyCardState.companyRegistrationDate
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
                            v-model:value="companyCardState.companyDirectorName"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <a-form-item name="postAddress" label="Почтовый адрес">
                          <a-input
                            v-model:value="companyCardState.postAddress"
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
                            v-model:value="companyCardState.lawAddress"
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
                            v-model:value="companyCardState.companyCountry"
                            :disabled="disabled"
                            :loadOptions="() => [{ label: 'РФ', value: '1' }]"
                          />
                        </a-form-item>
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
                  v-model:value="companyCardState.history"
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
import { CompanyCardState } from "@/models/CompanyEntity";
import { useRoute } from "vue-router";
import { initialCardState, cardHistoryColumns } from "./consts";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import { CardHistoryState } from "@/models/CardHistoryEntity";
import CardHistory from "../common/CardHistory.vue";
import { cardOptionsMap, CardMode } from "@/models/Common";
import BSelect from "@/components/BSelect.vue";
import router from "@/router";
import {
  getCompany,
  postCompany,
  updateCompany,
} from "@/service/companyRegistryService";
import { errorNotification } from "@/helpers/notification";

export default defineComponent({
  name: "CompanyCard",
  components: {
    PageWrapper,
    CardHistory,
    BSelect,
  },
  setup() {
    const route = useRoute();
    const cardMode = computed(() => route.params.mode as string);
    const cardId = computed(() => route.params.id as string);
    const companyCardState = reactive<CompanyCardState>(initialCardState);
    const currentTab = ref("/mainInfo");
    const disabled = computed(() => cardOptionsMap[cardMode.value].disabled);
    const header = computed(() => cardOptionsMap[cardMode.value].header);
    onMounted(async () => {
      if (
        cardMode.value === CardMode.EDIT ||
        cardMode.value === CardMode.VIEW
      ) {
        const newState = await getCompany(cardId.value);
        Object.assign(companyCardState, newState);
      }
    });
    const formRef = ref();
    const rules = {
      lastName: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      firstName: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      passportSerialNumber: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      passportNumber: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      issuedBy: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      addressOfResidence: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
      birthDate: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
    };
    const saveRequisites = () => {
      console.log("save");
    };
    const onAddHistoryManually = (item: CardHistoryState) => {
      const lastItemId = companyCardState.history.sort(
        (prev, curr) => prev.id - curr.id
      )[0];
      console.log(lastItemId);
      companyCardState.history.push(item);
    };
    const onRemoveHistoryManually = (id: number | string) => {
      companyCardState.history = companyCardState.history.filter(
        (historyItem) => historyItem.id !== id
      );
    };
    const handleTabChange = (tab: string) => {
      const newLink = `${route.path.split("/").slice(0, -1).join("/")}${tab}`;
      router.push(newLink);
      currentTab.value = tab;
    };
    const submit = async () => {
      formRef.value
        .validate()
        .then(async () => {
          if (companyCardState.id) {
            try {
              await updateCompany(companyCardState, companyCardState.id);
            } catch {
              errorNotification("При сохранении карточки произошла ошибка");
            }
          } else {
            let id;
            try {
              id = await postCompany(companyCardState);
            } catch {
              errorNotification("При сохранении карточки произошла ошибка");
            }
            const newState = await getCompany(id);
            Object.assign(companyCardState, newState);
          }
        })
        .catch(() => errorNotification("Заполните обязательные поля"));
    };
    return {
      cardOptionsMap,
      header,
      cardMode,
      companyCardState,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      disabled,
      cardHistoryColumns,
      saveRequisites,
      onAddHistoryManually,
      onRemoveHistoryManually,
      handleTabChange,
      currentTab,
      submit,
      rules,
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
