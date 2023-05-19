<template>
  <a-row>
    <PageWrapperHeader />
  </a-row>
  <a-row>
    <a-col
      span="4"
      class="page__menu-wrapper"
      :class="{ collapsed: !showSidebar }"
    >
      <div>
        <PageWrapperSidebar />
        <div @click="toggleSidebar" class="page__expand-button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </div>
      </div>
    </a-col>
    <a-col
      :span="24"
      class="page__content-row-wrapper"
      :class="{ collapsed: !showSidebar }"
    >
      <div class="page__content-wrapper">
        <a-row :gutter="GRID_BASE_SPACING">
          <a-col span="24">
            <div class="page__subheader">
              <slot name="subheader" />
            </div>
          </a-col>
          <a-col span="24">
            <h3 class="page__title">
              <slot name="title" />
            </h3>
          </a-col>
        </a-row>
        <slot name="body" />
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PageWrapperSidebar from "./PageWrapperSidebar.vue";
import PageWrapperHeader from "./PageWrapperHeader.vue";
import { GRID_BASE_SPACING } from "@/common/consts";

export default defineComponent({
  name: "PageWrapper",
  components: {
    PageWrapperSidebar,
    PageWrapperHeader,
  },
  props: {
    tabs: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const showSidebar = ref(true);
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    };
    return {
      GRID_BASE_SPACING,
      showSidebar,
      toggleSidebar,
    };
  },
});
</script>

<style scoped lang="scss">
.page {
  &__menu-wrapper {
    padding-left: $offset-sm;
    padding-top: $offset-sm;
    padding-bottom: $offset-sm;
    background: $background-sidebar;
    height: 100vh;
    position: fixed;
    width: 310px;
    min-width: 310px;
    box-shadow: 0 4px 16px rgb(61 116 143 / 10%);
    transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

    &.collapsed {
      transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      width: 0;
      margin-right: 330px;
      margin-left: -330px;

      .page__expand-button {
        left: 0;
        transition: all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

        svg {
          transform: none;
        }
      }
    }
  }

  &__expand-button {
    position: fixed;
    top: 50%;
    width: 20px;
    height: 28px;
    border-radius: 0 4px 4px 0;
    left: 308px;
    cursor: pointer;
    background-color: $background-sidebar;
    box-shadow: 0 4px 16px rgb(61 116 143 / 10%);
    z-index: 2;
    transition: all 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

    svg {
      width: 24px;
      transform: scaleX(-1);
    }
  }

  &__content-wrapper {
    padding-top: $offset-md;
    padding-left: 44px;
    padding-right: $offset-md;
    overflow: hidden;
    height: 100%;
    margin-top: -22px;
    width: calc(100% - 360px);
  }

  &__content-row-wrapper {
    position: unset;
    margin-left: 310px;
    width: calc(100% - 310px) !important;
    overflow: hidden;
    transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

    &.collapsed {
      margin-left: 0;
    }
  }

  &__subheader {
    padding-right: $offset-md;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: 700;
    color: $text-base;
    line-height: 36px;
  }
  .header {
    &__title {
      color: $background-sidebar;
      // font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 8px;
    }
  }
  @media (max-device-width: $max-tablet-width) {
    &__subheader {
      padding-top: 2.5vh;
    }
    &__header-mobile {
      background: #20bdbd;
    }
    &__title {
      text-align: center;
      font-size: 18px;
      line-height: 22px;
      font-weight: 600;
      color: white;
    }
    &__content-wrapper {
      overflow: hidden;
      height: 100vh;
      padding: 0;
      width: 100%;
    }
    &__content-row-wrapper {
      margin-left: 0;
    }
  }
}
</style>
