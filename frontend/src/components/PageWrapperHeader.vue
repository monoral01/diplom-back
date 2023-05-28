<template>
  <div class="header-wrapper">
    <div class="header__logo">
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
    </div>
    <div class="header__content">
      <h1 class="header__title">Система учёта клиентов банка</h1>

      <div>
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="left">
            <template #title>
              <span>
                {{ fio.lastName }}
                {{ fio.firstName }}
                {{ fio.patrName }}
              </span>
            </template>
            <svg
              style="
                width: 24px;
                height: 24px;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M512 597.333333v341.333334H170.666667a341.333333 341.333333 0 0 1 341.333333-341.333334z m0-42.666666c-141.44 0-256-114.56-256-256s114.56-256 256-256 256 114.56 256 256-114.56 256-256 256z m110.72 247.978666a149.76 149.76 0 0 1 0-69.248l-42.325333-24.448 42.666666-73.898666 42.325334 24.448A149.162667 149.162667 0 0 1 725.333333 624.853333V576h85.333334v48.853333c22.698667 6.741333 43.178667 18.773333 59.946666 34.645334l42.325334-24.448 42.666666 73.898666-42.325333 24.448a149.76 149.76 0 0 1 0 69.205334l42.325333 24.448-42.666666 73.898666-42.325334-24.448a149.162667 149.162667 0 0 1-59.946666 34.645334V960h-85.333334v-48.853333a149.162667 149.162667 0 0 1-59.946666-34.645334l-42.325334 24.448-42.666666-73.898666 42.325333-24.405334zM768 725.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z"
                class="tooltip"
              />
            </svg>
          </a-tooltip>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <div @click="logoutUser">Выйти</div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { logout } from "@/service/authorizationService";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageWrapperHeader",
  setup() {
    const router = useRouter();
    const logoutUser = async () => {
      console.log("logoutUser");
      await logout();
      router.push("/");
    };
    const fio = computed(() => {
      const fullName = localStorage.getItem("fio");
      if (fullName) {
        const fullNameArray = fullName.split(" ");
        return {
          lastName: fullNameArray[0],
          firstName: fullNameArray[1],
          patrName: fullNameArray[3],
        };
      }
      return { lastName: "", firstName: "", patrName: "" };
    });
    return {
      logoutUser,
      fio,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid $background-sidebar;
  }

  &__logo {
    width: 310px;
    padding: 0 24px;
    flex-shrink: 0;

    svg {
      width: 100%;
      margin-top: 12px;
      // margin-bottom: 8px;
    }

    p {
      margin: 0;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: $text-base;
      padding-left: 4px;
    }
  }

  &__content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 32px;
    align-items: center;
  }

  &__title {
    color: $primary-color;
    font-size: $font-size-md;
    font-weight: 700;
    font-style: normal;
    line-height: 150%;
    margin-bottom: 0;
  }

  &__action {
    width: 225px;
    display: flex;

    & svg {
      margin-left: $offset-md;
      cursor: pointer;

      &:hover path {
        fill: $text-contrast;
        transition: 0.5s;
      }
    }
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
}
</style>
