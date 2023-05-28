<template>
  <PageWrapper>
    <template #subheader>
      <div class="buttons-wrapper__right card__buttons">
        <a-button type="primary" ghost>Сохранить</a-button>
        <a-button type="primary">закрыть</a-button>
        <a-button type="primary" :disabled="!personCardState.personStatus"
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
          :model="personCardState"
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
                      <a-col span="8">
                        <img src="@/assets/male2.jpg" />
                      </a-col>
                      <a-col span="16">
                        <a-row :gutter="GRID_BASE_SPACING">
                          <a-col span="12">
                            <a-form-item name="id" label="Идентификатор">
                              <a-input
                                v-model:value="personCardState.id"
                                disabled
                              />
                            </a-form-item>
                          </a-col>
                          <a-col span="12">
                            <a-form-item
                              name="personStatus"
                              label="Статус карточки"
                            >
                              <a-input
                                v-model:value="personCardState.personStatus"
                                disabled
                              />
                            </a-form-item>
                          </a-col>
                          <a-col span="12">
                            <a-form-item
                              name="createDate"
                              label="Дата создания"
                            >
                              <a-input
                                v-model:value="personCardState.createDate"
                                disabled
                              />
                            </a-form-item>
                          </a-col>
                          <a-col span="12">
                            <a-form-item name="lastName" label="Фамилия">
                              <a-input
                                v-model:value="personCardState.lastName"
                                :disabled="disabled"
                              />
                            </a-form-item>
                          </a-col>
                          <a-col span="12">
                            <a-form-item name="firstName" label="Имя">
                              <a-input
                                v-model:value="personCardState.firstName"
                                :disabled="disabled"
                              />
                            </a-form-item>
                          </a-col>
                          <a-col span="12">
                            <a-form-item name="patrName" label="Отчество">
                              <a-input
                                v-model:value="personCardState.patrName"
                                :disabled="disabled"
                              />
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </a-col>
                      <a-col span="24">
                        <h3>Документ</h3>
                      </a-col>
                      <a-col span="4">
                        <a-form-item name="passportSerialNumber" label="Серия">
                          <a-input
                            v-model:value="personCardState.passportSerialNumber"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="8">
                        <a-form-item
                          name="passportNumber"
                          label="Номер паспорта"
                        >
                          <a-input
                            v-model:value="personCardState.passportNumber"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-item name="issuedBy" label="Кем выдан">
                          <a-input
                            v-model:value="personCardState.issuedBy"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-item
                          name="addressOfResidence"
                          label="Адрес прописки"
                        >
                          <a-input
                            v-model:value="personCardState.addressOfResidence"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-item name="birthDate" label="Дата рождения">
                          <a-date-picker
                            v-model:value="personCardState.birthDate"
                            format="DD.MM.YYYY"
                            :disabled="false"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="24">
                        <h3>Адрес</h3>
                      </a-col>
                      <a-col span="16">
                        <a-form-item
                          name="factAddress"
                          label="Фактический адрес проживания"
                        >
                          <a-input
                            v-model:value="personCardState.factAddress"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="24">
                        <h3>Сведения о компании</h3>
                      </a-col>
                      <template v-if="personCardState.companyName">
                        <a-col span="12">
                          <a-form-item
                            name="companyName"
                            label="Название компании"
                          >
                            <a-input
                              v-model:value="personCardState.companyName"
                              :disabled="disabled"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="6">
                          <a-form-item name="companyName" label="ОГРН/ОГРНИП">
                            <a-input
                              v-model:value="personCardState.companyNumber"
                              :disabled="disabled"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="6">
                          <a-form-item name="companyINN" label="ИНН/КПП">
                            <a-input
                              v-model:value="personCardState.companyINN"
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
                                personCardState.companyRegistrationDate
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
                              v-model:value="
                                personCardState.companyDirectorName
                              "
                              :disabled="disabled"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="12">
                          <a-form-item
                            name="companyCountry"
                            label="Страна регистрации"
                          >
                            <b-select
                              v-model:value="personCardState.companyCountry"
                              :disabled="disabled"
                              :loadOptions="() => [{ label: 'РФ', value: '1' }]"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="12">
                          <a-form-item
                            name="postAddress"
                            label="Почтовый адрес"
                          >
                            <a-input
                              v-model:value="personCardState.postAddress"
                              :disabled="disabled"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="12">
                          <a-form-item
                            name="lawAddress"
                            label="Юридический адрес"
                          >
                            <a-input
                              v-model:value="personCardState.lawAddress"
                              :disabled="disabled"
                            />
                          </a-form-item>
                        </a-col>
                      </template>
                      <a-col span="24" v-else>
                        <h4>Нет сведений о компании</h4>
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
                  v-model:value="personCardState.history"
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
import { PersonCardState } from "@/models/PersonEntity";
import { useRoute } from "vue-router";
import { initialCardState } from "./consts";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import CardHistory from "../common/CardHistory.vue";
import { CardHistoryState } from "@/models/CardHistoryEntity";
import { cardOptionsMap, CardMode } from "@/models/Common";
import BSelect from "@/components/BSelect.vue";
import router from "@/router";

export default defineComponent({
  name: "PersonCard",
  components: {
    PageWrapper,
    CardHistory,
    BSelect,
  },
  setup() {
    const route = useRoute();
    const cardMode = computed(() => route.params.mode as string);
    const personCardState = reactive<PersonCardState>(initialCardState);
    const currentTab = ref("/mainInfo");
    const disabled = computed(() => cardOptionsMap[cardMode.value].disabled);
    const header = computed(() => cardOptionsMap[cardMode.value].header);
    onMounted(() => {
      switch (cardMode.value) {
        case CardMode.ADD:
          Object.assign(personCardState, initialCardState);
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
      const lastItemId = personCardState.history.sort(
        (prev, curr) => prev.id - curr.id
      )[0];
      console.log(lastItemId);
      personCardState.history.push(item);
    };
    const onRemoveHistoryManually = (id: number | string) => {
      personCardState.history = personCardState.history.filter(
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
      personCardState,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      disabled,
      saveRequisites,
      onAddHistoryManually,
      onRemoveHistoryManually,
      currentTab,
      handleTabChange,
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
