<template>
  <a-row class="sidebar__menu">
    <a-col span="24">
      <PageWrapperSidebarMenu />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageWrapperSidebarMenu from "./PageWrapperSidebarMenu.vue";

export default defineComponent({
  name: "PageWrapperSidebar",
  components: {
    PageWrapperSidebarMenu,
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  &__header {
    color: $text-base;
    size: 20px;
    font-size: 20px;
    font-weight: 700;
    margin-top: $offset-xs;
    line-height: 24px;
  }

  &__technical-support {
    position: absolute;
    bottom: 32px;

    & span {
      color: $text-base;
    }

    & a {
      color: $text-base;
      font-weight: 700;

      &:hover {
        color: $text-contrast;
      }
    }
  }

  &__menu {
    margin-top: 36px;
  }
}

.divider {
  background-color: $red;
  width: 1px;
  height: 32px;
}
</style>
