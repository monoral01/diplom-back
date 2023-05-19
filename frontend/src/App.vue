<template>
  <a-config-provider :locale="locale">
    <div class="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { watchEffect, defineComponent, ref } from "vue";
import ruRU from "ant-design-vue/es/locale/ru_RU";

export default defineComponent({
  setup() {
    const token = ref("");
    watchEffect(() => {
      fetch("/api")
        .then((response) => response.json())
        .then((response) => {
          token.value = response.token;
        });
      console.log(token.value);
    });
    return { token, locale: ruRU };
  },
});
</script>
<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

// * {
//   font-family: "Montserrat", sans-serif;
// }
#app {
  // width: calc(100% - 310px);
  overflow: hidden;
}

h4 {
  font-size: $font-size-xs;
  line-height: 24px;
  font-weight: 700;
  color: $text-base !important;
  margin: 0;
}

h3 {
  font-weight: 700;
  color: $text-base !important;
  margin: 0;
}
// spin
.app-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
}
// form

.ant-form .ant-form-item .ant-form-item-label,
.ant-form .ant-form-item .ant-form-item-control {
  flex: 0;
}

.ant-form-item {
  justify-content: flex-end;
  // height: 100%;

  // Дополнительный индикатор для групп/полей типа checkbox
  // Когда в ПЗ поле указано как обязательное, но любое значение принимается
  &.required {
    .ant-form-item-label label {
      &::after {
        display: inline-block;
        margin-left: 4px;
        color: #ff4d4f;
        content: "*";
      }
    }
  }
}

.ant-form-item-label {
  padding-bottom: $offset-xxs;
  min-height: 33px;

  & label {
    color: $text-base;
    font-weight: 600;
    padding-left: 0;
    font-size: 15px;
    line-height: 24px;

    &::after {
      content: "";
      position: relative;
      top: -0.5px;
      margin: 0 0 0 4px !important;
    }

    &.ant-form-item-required:not(.ant-form-item-required-mark-optional) {
      font-weight: 400;
      size: 15px;
      height: 24px;

      &::after {
        display: inline-block;
        color: #ff4d4f;
        margin: 0 2px 0 2px !important;
        content: "*";
      }

      &::before {
        display: none;
      }
    }
  }
}

.label-radio-group {
  .ant-form-item-label {
    & label {
      padding-left: 0;
    }
  }
}

.ant-form-item-control-input-content {
  & input {
    height: $filter-field;
  }
}

// select
.ant-select-selector {
  height: $filter-field !important;
}

.ant-select-arrow {
  top: 60%;
  color: $text-contrast;

  .ant-select-suffix {
    & > svg {
      display: none !important;
    }

    &:after {
      content: "";
      display: block;
      width: 10px;
      height: 5px;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0L5 5L10 0H0Z' fill='%23ABB5BA'/%3E%3C/svg%3E");
      transition: transform 0.2s ease-in-out;
    }
  }
}

.ant-select.ant-select-open {
  .ant-select-arrow .ant-select-suffix:after {
    transform: rotate(180deg);
  }

  .rc-virtual-list-scrollbar-show {
    display: block !important;
  }
}

// checkbox
.checkbox-wrapper {
  display: flex;
  align-items: flex-end;
}

.ant-checkbox-inner {
  border-radius: 2px;
}

// button
.ant-btn:not(.ant-btn-link) > span {
  text-transform: uppercase;
  font-size: $font-size-xxs;
  font-weight: 700;
  letter-spacing: 0.16px;
  line-height: 16px;
}

.ant-btn-background-ghost.ant-btn-primary[disabled] {
  color: $primary-color;
  border: 1px solid $primary-color;
  opacity: 0.5;

  &:hover {
    color: $primary-color;
    border: 1px solid $primary-color;
  }
}

// button-link
.ant-btn-link {
  padding: 0;
}

.buttons-wrapper {
  margin-bottom: $offset-sm;

  &__right {
    display: flex;
    justify-content: flex-end;

    & button {
      margin-left: $offset-xxs;
    }
  }

  &__left {
    & button {
      margin-right: $offset-xxs;
    }
  }
}

// collapse
.ant-collapse {
  background-color: #fff;
  border-radius: $collapse-border-radius;
  border: 1px solid $table-border;
  border-bottom: unset;

  & > .ant-collapse-item {
    border-bottom: 1px solid $table-border;

    &:last-child {
      border-radius: $collapse-border-radius;

      & > .ant-collapse-header {
        border-radius: $collapse-border-radius;
      }
    }

    & .ant-collapse-header {
      background: #fff;
      padding: $offset-sm $offset-md;
      font-size: 18px;
      line-height: 27px;
      font-weight: 700;
      color: $text-base !important;
    }

    & .ant-collapse-content {
      border-top: unset;
      border-radius: 0 0 $collapse-border-radius $collapse-border-radius;

      &-box {
        padding: 0 $offset-md $offset-sm;
      }
    }
  }
}

.ant-collapse-item .ant-collapse-arrow > svg {
  transform: rotate(90deg) !important;
}

.ant-collapse-item-active .ant-collapse-arrow > svg {
  transform: rotate(-90deg) !important;
}

// upload
.ant-upload-picture-card-wrapper {
  height: 100%;
}

.ant-upload {
  & * {
    color: $text-secondary;
    font-weight: 400;
    font-size: $font-size-xxs;
  }

  &.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
    border: 1px solid $table-border;
    background-color: #fff;
  }
}

// form-item
.ant-form-item {
  margin-bottom: 0;
}

// select
.ant-select-selection-item,
.ant-select-selection-placeholder,
.ant-picker-input > input {
  align-items: center;
  height: $offset-sm;
  line-height: $offset-sm !important;
}

.ant-select-selector {
  padding: $offset-xxs $offset-xs !important;
}

// input
.ant-input {
  padding: $offset-xxs $offset-xs !important;
}

// picker
.ant-picker {
  padding: $offset-xxs $offset-xs !important;
}

// error notification
.error-notification {
  background: $light-red;
}

.ant-notification-notice-description {
  white-space: pre-line;
}
.ant-picker {
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  height: $filter-field;

  &-clear {
    right: 35px !important;
  }

  &-icon {
    width: 20px;
    height: 20px;
    margin-top: -10px;
  }
}
// form item button (scan, photo upload buttons)
.button-form-item {
  & .ant-upload {
    margin-bottom: $offset-sm;
  }

  & .ant-form-item-label {
    display: none;
  }
}

// tab-item
.tab-wrapper {
  & > a {
    font-size: 11px;
    line-height: $offset-xs;
  }
}

.ant-modal .ant-checkbox-group .ant-checkbox-wrapper.ant-checkbox-group-item {
  display: block;
  margin-bottom: $offset-sm;
  word-break: break-word;
}

.ant-modal .ant-checkbox-group {
  display: inline-block;
}

.ant-checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: $offset-xs;
}

.ant-col-12 {
  padding-left: $offset-xs !important;
  padding-right: $offset-xs !important;
}

@media (max-width: 1500px) {
  .ant-form-item-label {
    & label {
      font-size: 15px;
      padding-left: 0;
    }
  }
}

@media (max-width: 1350px) {
  .ant-form-item-label {
    & label {
      font-size: 14px;
    }
  }
  .ant-form-item {
    height: auto;
  }
}
@media (max-device-width: $max-phone-width) {
  .tab-content {
    height: calc(100vh - 210px);
  }

  .ant-checkbox-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1320px) {
  .tab-wrapper {
    & > a {
      margin-right: $offset-xs;
      margin-bottom: $offset-xs;
      // font-size: $font-size-xxs;
    }
    .card {
      &__body {
        & .ant-btn {
          height: auto;
          white-space: break-spaces;
        }
      }
    }
  }
}

.vertical {
  flex-direction: column;

  .ant-form-item-label {
    text-align: left;
  }
}

.clear-view {
  &-wrapper {
    &-mobile {
      h3 {
        color: $primary-color !important;
        font-weight: 700;
      }
      h4 {
        padding-left: 6px;
        color: $primary-color !important;
      }
      padding-left: 0px !important;
      padding-right: 0px !important;
      .ant-form-item {
        label::after {
          display: none !important;
        }
        &-required::after {
          display: none !important;
        }
        &-label {
          height: 33px;
        }
      }
      span {
        color: black;
      }
      .ant {
        &-picker-input > input {
          color: black !important;
        }
        &-table-wrapper {
          padding-left: 6px;
        }
        &-picker-suffix {
          display: none;
        }
        &-select {
          &-selector {
            color: black !important;
          }
          &-arrow {
            display: none;
          }
        }
        &-input {
          color: black !important;
        }
        &-col {
          padding-left: 6px !important;
          padding-right: 6px !important;
        }
      }
    }
    &-desktop {
      .ant-form-item {
        label::after {
          display: none !important;
        }
        &-required::after {
          display: none !important;
        }
      }
      span {
        color: black;
      }
      .ant {
        &-picker-input > input {
          color: black !important;
        }
        &-picker-suffix {
          display: none;
        }
        &-select {
          &-selector {
            color: black !important;
          }
          &-arrow {
            display: none;
          }
        }
        &-input {
          color: black !important;
        }
      }
    }
  }
}
.block-offset-top {
  margin-top: 20px;
}

.margined-card-body {
  margin-top: 30px;
  padding-left: $offset-xxxs;
}
</style>
