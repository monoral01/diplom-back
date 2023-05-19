<template>
  <PageWrapper>
    <template #title>Создать карточку</template>
    <template #body>
      <div class="card__body">
        <a-row :gutter="GRID_BASE_SPACING" class="add-card__modal-wrapper">
          <a-col span="10" class="add-card__modal-body">
            <a-row :gutter="GRID_BIG_SPACING" class="add-card__choose-mode">
              <div @click="router.push('/personRegistry/card/add/mainInfo')">
                <h3>Карточка физического лица</h3>
              </div>
              <div @click="router.push('/entityRegistry/card/add/mainInfo')">
                <h3>Карточка юридического лица</h3>
              </div>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { GRID_BIG_SPACING, GRID_BASE_SPACING } from "@/common/consts";
import PageWrapper from "@/components/PageWrapper.vue";
import { errorNotification } from "@/helpers/notification";
import router from "@/router";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const defaultValues = { login: undefined, password: undefined };
    const authorizationFormState = ref(defaultValues);
    const formRef = ref();
    const authorizationRules = {
      login: [{ required: true, message: "Введите логин" }],
      password: [{ required: true, message: "Введите пароль" }],
    };
    const login = () => {
      formRef.value
        .validate()
        .then(() => {
          router.push("/personRegistry");
        })
        .catch(() => errorNotification());
    };
    return {
      GRID_BIG_SPACING,
      GRID_BASE_SPACING,
      authorizationFormState,
      authorizationRules,
      login,
      formRef,
      router,
    };
  },
  components: { PageWrapper },
});
</script>
<style lang="scss" scoped>
.add-card {
  &__modal-body {
    padding: 12px;
    margin-left: 40px;
  }
  &__modal-wrapper {
    height: 200px;
    margin-top: 40px;
  }
  &__choose-mode {
    > div {
      align-items: center;
      display: flex;
      justify-content: center;
      text-align: center;
      height: 180px;
      width: 300px;
      border: 1px solid gray;
      border-radius: 16px;
      margin-right: 48px;
      &:hover {
        cursor: pointer;
        background-color: $background-sidebar;
      }
    }
  }
}
.card__body {
  overflow-y: auto;
  padding-bottom: $offset-sm;
  height: calc(100vh - 240px);
}
</style>
