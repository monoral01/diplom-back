<template>
  <a-row class="start-page__background">
    <a-col span="24">
      <a-row :gutter="GRID_BASE_SPACING" class="start-page__modal-wrapper">
        <a-col span="9"> </a-col>
        <a-col span="6" class="start-page__modal-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path
              d="M 22.15625 0 A 1.0001 1.0001 0 0 0 21.464844 0.29296875 L 21.445312 0.3125 L 0.87890625 20.878906 C -0.28429206 22.042104 -0.28429206 23.957896 0.87890625 25.121094 L 21.464844 45.707031 A 1.0001 1.0001 0 0 0 22.878906 45.707031 L 22.898438 45.6875 L 43.464844 25.121094 C 44.628041 23.957896 44.628041 22.042104 43.464844 20.878906 L 22.878906 0.29296875 A 1.0001 1.0001 0 0 0 22.15625 0 z M 22.234375 2.4765625 L 42.050781 22.292969 C 42.449681 22.691868 42.449681 23.308132 42.050781 23.707031 L 25.933594 39.824219 C 26.052442 39.242277 26.138227 38.651984 26.169922 38.052734 A 1.0001 1.0001 0 0 0 26.169922 37.947266 C 26.036349 35.421796 25.108902 33.01145 23.537109 31.050781 L 30.878906 23.707031 A 1.0001 1.0001 0 0 0 30.878906 22.292969 L 22.898438 14.3125 C 21.275291 12.594247 20.319287 10.358489 20.181641 8 C 20.299146 5.9866151 21.018169 4.0654641 22.234375 2.4765625 z M 18.410156 6.1757812 C 18.291308 6.7577229 18.205523 7.3480156 18.173828 7.9472656 A 1.0001 1.0001 0 0 0 18.173828 8.0527344 C 18.307423 10.578631 19.236316 12.988371 20.808594 14.949219 L 13.464844 22.292969 A 1.0001 1.0001 0 0 0 13.464844 23.707031 L 21.464844 31.708984 C 23.075846 33.424403 24.02503 35.651211 24.162109 38 C 24.044604 40.013385 23.325581 41.934536 22.109375 43.523438 L 2.2929688 23.707031 C 1.8940686 23.308131 1.8940686 22.691869 2.2929688 22.292969 L 18.410156 6.1757812 z M 22.171875 16.414062 L 28.757812 23 L 22.171875 29.585938 L 15.585938 23 L 22.171875 16.414062 z"
              fill="#0077c7"
            />
          </svg>
          <div>
            Добро пожаловать в систему
            <h3>"Система учёта клиентов банка"!</h3>
            Введите логин и пароль:
          </div>
          <a-form
            ref="formRef"
            :rules="authorizationRules"
            :model="authorizationFormState"
            class="authorization"
            layout="vertical"
          >
            <a-row :gutter="GRID_BASE_SPACING">
              <a-col span="24">
                <a-form-item name="login" label="Логин">
                  <a-input v-model:value="authorizationFormState.login" />
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item name="password" label="Пароль">
                  <a-input-password
                    :visibilityToggle="false"
                    v-model:value="authorizationFormState.password"
                  />
                </a-form-item>
              </a-col>
              <a-col span="24"> </a-col>
              <a-col span="24">
                <a-button @click="login">Войти</a-button>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col span="9"> </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { GRID_BASE_SPACING } from "@/common/consts";
import { errorNotification } from "@/helpers/notification";
import router from "@/router";
import { getUserData } from "@/service/authorizationService";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "start-page",
  setup() {
    const defaultValues = { login: undefined, password: undefined };
    const authorizationFormState = ref<{ login?: string; password?: string }>(
      defaultValues
    );
    const formRef = ref();
    const authorizationRules = {
      login: [{ required: true, message: "Введите логин" }],
      password: [{ required: true, message: "Введите пароль" }],
    };
    const login = () => {
      formRef.value
        .validate()
        .then(async () => {
          try {
            const { userData, token } = await getUserData(
              authorizationFormState.value
            );
            localStorage.setItem("userData", JSON.stringify(userData));
            router.push("/personRegistry");
          } catch (error) {
            errorNotification("Логин или пароль неверный, попробуйте ещё раз");
            formRef.value.validate();
          }
        })
        .catch(() => errorNotification("Некорректно заполнены поля"));
    };
    return {
      GRID_BASE_SPACING,
      authorizationFormState,
      authorizationRules,
      login,
      formRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.start-page {
  &__modal-body {
    background-color: $background-sidebar;
    border: 3px solid gray;
    top: 100px;
    padding: 12px;
  }
  &__background {
    height: 100vh;
    background-image: linear-gradient(
        to bottom,
        rgba(27, 27, 126, 0.9),
        rgba(81, 81, 255, 0.9)
      ),
      url(@/assets/background.png);
  }
  &__modal-wrapper {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 800px;
    text-align: center;
  }
}
</style>
