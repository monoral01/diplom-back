<template>
  <PageWrapper>
    <template #subheader>
      <div class="buttons-wrapper__right card__buttons">
        <a-button type="primary" ghost>Сохранить</a-button>
        <a-button type="primary">закрыть</a-button>
        <a-button type="primary" :disabled="!userCardState.id"
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
          :model="userCardState"
          layout="vertical"
          :rules="rules"
          :validateOnRuleChange="true"
        >
          <a-row>
            <a-col span="16">
              <div class="tab-content">
                <a-row :gutter="GRID_BIG_SPACING">
                  <a-col span="24">
                    <a-row
                      :gutter="GRID_BASE_SPACING"
                      class="margined-card-body"
                    >
                      <a-col span="24">
                        <h3>Сведения о пользователе системы</h3>
                      </a-col>
                      <a-col span="12">
                        <a-form-item name="fio" label="ФИО">
                          <a-input
                            v-model:value="userCardState.fio"
                            :disabled="disabled"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-item
                          name="createDate"
                          label="Дата создания карточки"
                        >
                          <a-date-picker
                            v-model:value="userCardState.createDate"
                            format="DD.MM.YYYY"
                            disabled
                          />
                        </a-form-item>
                      </a-col>
                      <a-col span="24">
                        <a-button
                          @click="openAddPermission = true"
                          :disabled="openAddPermission"
                        >
                          Добавить привилегию
                        </a-button>
                      </a-col>
                      <template v-if="openAddPermission">
                        <a-col span="12">
                          <a-form-item name="addPermissionValue" label="">
                            <b-select
                              v-model:value="addPermissionValue"
                              :disabled="disabled"
                              :loadOptions="
                                () => [
                                  { label: 'PersonCard_Create', value: 1 },
                                  { label: 'PersonCard_Edit', value: 2 },
                                  { label: 'PersonCard_View', value: 3 },
                                  { label: 'PersonCard_Delete', value: 4 },
                                  { label: 'PersonRegistry', value: 5 },
                                  { label: 'CompanyCard_Create', value: 6 },
                                  { label: 'CompanyCard_Edit', value: 7 },
                                  { label: 'CompanyCard_View', value: 8 },
                                  { label: 'CompanyCard_Delete', value: 9 },
                                  { label: 'CompanyRegistry', value: 10 },
                                ]
                              "
                            />
                          </a-form-item>
                        </a-col>
                        <a-col span="24">
                          <a-button
                            @click="addPermission"
                            :disabled="!addPermissionValue"
                          >
                            Добавить
                          </a-button>
                          <a-button @click="closeOpenAddPermission">
                            Закрыть
                          </a-button>
                        </a-col>
                      </template>
                      <a-col span="24">
                        <b-table
                          :disabled="false"
                          :columns="permissionsColumns"
                          :data-source="userCardState.permissions"
                        />
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
import { initialCardState } from "./consts";
import { GRID_BASE_SPACING, GRID_BIG_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import { cardOptionsMap, CardMode } from "@/models/Common";
import { UserEntity } from "@/models/UserEntity";
import {
  getPermissions,
  getUser,
  postUser,
  updateUser,
} from "@/service/userRegistryService";
import { errorNotification } from "@/helpers/notification";
import BTable from "@/components/BTable.vue";
import { permissionsColumns } from "./consts";
import BSelect from "@/components/BSelect.vue";

export default defineComponent({
  name: "UserCard",
  components: {
    PageWrapper,
    BTable,
    BSelect,
  },
  setup() {
    const route = useRoute();
    const cardMode = computed(() => route.params.mode as string);
    const cardId = computed(() => route.params.id as string);
    const userCardState = reactive<UserEntity>(initialCardState);
    const openAddPermission = ref(false);
    const addPermissionValue = ref();
    const disabled = computed(() => cardOptionsMap[cardMode.value].disabled);
    const header = computed(() => cardOptionsMap[cardMode.value].header);
    onMounted(async () => {
      if (
        cardMode.value === CardMode.EDIT ||
        cardMode.value === CardMode.VIEW
      ) {
        const newState = await getUser(cardId.value);
        Object.assign(userCardState, newState);
      }
    });
    const formRef = ref();
    const rules = {
      fio: [{ required: true, message: "Поле обязательно для заполнения" }],
    };
    const closeOpenAddPermission = () => {
      addPermissionValue.value = undefined;
      openAddPermission.value = false;
    };
    const addPermission = () => {
      const lastItemId = userCardState.permissions.sort(
        (prev, curr) => prev.index - curr.index
      )[0];
      console.log(lastItemId);
      const itemToAdd = {
        index: addPermissionValue.value.value,
        permission: addPermissionValue.value.label,
      };
      userCardState.permissions.push(itemToAdd);
      closeOpenAddPermission();
    };

    const deletePermission = (key: number) => {
      userCardState.permissions = userCardState.permissions.filter(
        (permission) => permission.index !== key
      );
    };
    const submit = async () => {
      formRef.value
        .validate()
        .then(async () => {
          if (userCardState.id) {
            try {
              await updateUser(userCardState, userCardState.id);
            } catch {
              errorNotification("При сохранении карточки произошла ошибка");
            }
          } else {
            let id;
            try {
              id = await postUser(userCardState);
            } catch {
              errorNotification("При сохранении карточки произошла ошибка");
            }
            const newState = await getUser(id);
            Object.assign(userCardState, newState);
          }
        })
        .catch(() => errorNotification("Заполните обязательные поля"));
    };
    return {
      cardOptionsMap,
      rules,
      formRef,
      header,
      cardMode,
      userCardState,
      GRID_BASE_SPACING,
      GRID_BIG_SPACING,
      disabled,
      submit,
      permissionsColumns,
      openAddPermission,
      closeOpenAddPermission,
      addPermission,
      deletePermission,
      addPermissionValue,
      loadPermissions: getPermissions,
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
