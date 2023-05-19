/* eslint-disable import/named */
<template>
  <a-row :gutter="GRID_SMALL_SPACING">
    <a-col span="24">
      <a-table
        class="ant-table-striped"
        size="middle"
        :columns="columns"
        :data-source="columns?.length ? dataSource : []"
        :row-selection="selection ? rowSelection : false"
        :pagination="pagination"
        :loading="loading"
        :custom-row="customRow"
        :row-key="(record: any) => record.key"
        :scroll="scroll"
        @change="sortChange"
        @resizeColumn="handleResizeColumn"
      >
        <template v-if="rowChange" #headerCell="{ title }"
          ><div class="table-header-cell-content">
            <span>{{ title }}</span>
          </div>
        </template>
        <template #bodyCell="{ record, index, column }">
          <template
            v-if="
              column.dataIndex === CellConst.REMOVE_RECORD &&
              !disabled &&
              record[column.allowDeleteAttribute]
            "
          >
            <svg
              @click="onDelete(record.key, index)"
              class="table-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
                fill="#ABB5BA"
              />
            </svg>
          </template>

          <template
            v-if="
              column.dataIndex === CellConst.EDIT_RECORD &&
              record[column.allowEditAttribute]
            "
          >
            <svg
              @click="onEdit(record.key)"
              class="table-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z"
                fill="#ABB5BA"
              />
            </svg>
          </template>

          <template
            v-if="
              column.dataIndex === CellConst.WATCH &&
              record[column.fileAttributeName]
            "
          >
            <svg
              @click="onWatch(record.key)"
              class="table-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
                fill="#ABB5BA"
              />
            </svg>
          </template>

          <template
            v-if="
              column.dataIndex === CellConst.DOWNLOAD_FILE &&
              record[column.fileAttributeName]
            "
          >
            <svg
              @click="onDownload(record.key)"
              class="table-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12Z"
                fill="#ABB5BA"
              />
              <path
                d="M12 15L6.46002 9.54L7.88002 8.12L11 11.25V2H13V11.25L16.13 8.12L17.55 9.55L12 15Z"
                fill="#ABB5BA"
              />
            </svg>
          </template>

          <template v-if="column.dataIndex === CellConst.PRINT">
            <svg
              @click="onPrint(record.key)"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 8.5C21.16 8.5 22.5 9.84 22.5 11.5V17.5H18.5V21.5H6.5V17.5H2.5V11.5C2.5 9.84 3.84 8.5 5.5 8.5H6.5V3.5H18.5V8.5H19.5ZM8.5 5.5V8.5H16.5V5.5H8.5ZM16.5 19.5V15.5H8.5V19.5H16.5ZM18.5 15.5H20.5V11.5C20.5 10.95 20.05 10.5 19.5 10.5H5.5C4.95 10.5 4.5 10.95 4.5 11.5V15.5H6.5V13.5H18.5V15.5ZM19.5 12C19.5 12.55 19.05 13 18.5 13C17.95 13 17.5 12.55 17.5 12C17.5 11.45 17.95 11 18.5 11C19.05 11 19.5 11.45 19.5 12Z"
                fill="#ABB5BA"
              />
            </svg>
          </template>

          <template v-if="column.slot === CellConst.CHECKBOX">
            <a-checkbox
              :class="{ 'checkbox-disabled': column.disabled || disabled }"
              v-model:checked="record[column.dataIndex]"
              @click="onChange(record.key, column)"
            />
          </template>

          <template v-if="column.slot === CellConst.DATE">
            {{
              record[column.dataIndex]
                ? dayjs(record[column.dataIndex]).format(
                    column.format ?? "DD.MM.YYYY"
                  )
                : "-"
            }}
          </template>

          <template v-if="column.slot === CellConst.RANGE">
            {{
              dayjs(record[column.dataIndex][0]).format(
                column.format ?? "DD.MM.YYYY"
              )
            }}
            -
            {{
              record[column.dataIndex][1]
                ? dayjs(record[column.dataIndex][1]).format(
                    column.format ?? "DD.MM.YYYY"
                  )
                : "..."
            }}
          </template>

          <template v-if="column.slot === CellConst.BOOL">
            {{ record[column.dataIndex] ? "Да" : "Нет" }}
          </template>

          <template v-if="column.slot === CellConst.OPEN_PHOTO">
            <a-button
              :disabled="disabled"
              type="link"
              @click="openPhoto(record.photoUuid)"
              >Открыть</a-button
            >
          </template>
        </template>
      </a-table>

      <a-pagination
        v-if="pagination && columns.length"
        size="small"
        class="pagination"
        :current="current"
        :pageSize="pageSize"
        :showLessItems="true"
        :total="total"
        :show-total="(total: string | number) => `Количество записей: ${total}`"
        show-size-changer
        :default-current="current"
        :page-size-options="pageSizeOptions"
        :default-page-size="pageSize"
        @change="paginationChange"
        @showSizeChange="paginationChange"
      >
        <template #buildOptionText="{ value }">
          {{ value }}
        </template>
      </a-pagination>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, ref } from "vue";
import dayjs from "dayjs";
import { CellConst, GRID_SMALL_SPACING } from "@/common/consts";

export default defineComponent({
  name: "BTable",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    dataSource: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    current: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    pageSizeOptions: {
      type: Array,
      default: () => ["5", "10", "20", "50", "100"],
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: [Boolean, Object],
      default: false,
    },
    selectedRowKey: {
      default: undefined,
    },
    selection: {
      default: false,
      type: Boolean,
    },
    rowChange: {
      default: false,
      type: Boolean,
    },
    showAll: {
      default: false,
    },
    scroll: {
      type: Object,
    },
  },
  emits: [
    "paginationChange",
    "sortChange",
    "selectedRowChange",
    "onDelete",
    "onEdit",
    "onWatch",
    "onDownload",
    "onPrint",
    "onChange",
    "openPhoto",
    "updateSelectValue",
    "updateColumns",
    "updateDatepickerValue",
    "updateInputValue",
    "onLinkClick",
  ],
  setup(props, { emit }) {
    const state = reactive({
      selectedRowKeys: [],
    });
    // using for SELECTPICKER, DATEPICKER, INPUT selected record identify
    const currentRow = ref();
    const selectRow = (
      record: {
        key: never;
      },
      event: any
    ) => {
      if (
        state.selectedRowKeys.length > 0 &&
        record.key === state.selectedRowKeys[0]
      ) {
        // if click on button for photoModal don't reset selected row
        if (event.target.innerText === "Открыть") {
          return;
        }
        state.selectedRowKeys.length = 0;
        emit("selectedRowChange", undefined);
      } else {
        state.selectedRowKeys.length = 0;
        state.selectedRowKeys.push(record.key);
        emit("selectedRowChange", record.key);
      }
    };
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: state.selectedRowKeys,
      };
    });
    const customRow = (record: any) => {
      return {
        onClick: (event: any) => {
          currentRow.value = record;
          selectRow(record, event);
        },
      };
    };
    const handleResizeColumn = (width: number, column: any) => {
      // eslint-disable-next-line no-param-reassign
      column.width = width;
    };
    // if "Reset PSU filters", reset selectedRow too
    watchEffect(() => {
      if (props.selectedRowKey === undefined) {
        state.selectedRowKeys.length = 0;
      }
    });
    const paginationChange = (page: number, pageSize: number) => {
      emit("paginationChange", page, pageSize);
    };
    const sortChange = (
      pag: {
        pageSize: number;
        current: number;
      },
      filters: any,
      sorter: any
    ) => {
      emit("sortChange", sorter.field, sorter.order);
    };
    const onDelete = (key: string, index: number) => {
      if (!props.disabled) {
        emit("onDelete", key, index);
      }
    };
    const onEdit = (key: string) => {
      if (!props.disabled) {
        emit("onEdit", key);
      }
    };
    const onWatch = (key: string) => {
      if (!props.disabled) {
        emit("onWatch", key);
      }
    };
    const onDownload = (key: string) => {
      if (!props.disabled) {
        emit("onDownload", key);
      }
    };
    const onChange = (key: string, column: any) => {
      if (!props.disabled) {
        emit("onChange", key, column);
      }
    };
    const onPrint = (key: string) => {
      if (!props.disabled) {
        emit("onPrint", key);
      }
    };
    const openPhoto = (uuid: string) => {
      if (!props.disabled) {
        emit("openPhoto", uuid);
      }
    };
    const onLinkClick = (id: string) => {
      emit("onLinkClick", id);
    };
    const updateColumns = (value: any) => {
      emit("updateColumns", value);
    };
    const updateSelectValue = (value: any) => {
      emit("updateSelectValue", value, currentRow.value.key);
    };
    const updateDatepickerValue = (value: any) => {
      emit("updateDatepickerValue", value, currentRow.value.key);
    };
    const updateInputValue = (value: any) => {
      emit("updateInputValue", value, currentRow.value.key);
    };
    return {
      rowSelection,
      onDelete,
      onEdit,
      onWatch,
      onDownload,
      onChange,
      onPrint,
      onLinkClick,
      updateColumns,
      updateSelectValue,
      updateInputValue,
      updateDatepickerValue,
      openPhoto,
      customRow,
      paginationChange,
      sortChange,
      handleResizeColumn,
      CellConst,
      dayjs,
      GRID_SMALL_SPACING,
    };
  },
});
</script>

<style lang="scss">
.table-icon {
  cursor: pointer;

  &:hover path {
    fill: $primary-color;
  }
}

.ant-pagination {
  margin: $offset-xs 0 0 !important;
  // float: right;
  li {
    ::marker {
      display: none;
    }
  }
}

.ant-pagination-item {
  margin-right: 4px;
}

.ant-pagination-total-text {
  // position: absolute;
  left: 20px;
  color: $text-base;
}

.ant-pagination-options {
  color: $text-base;

  .ant-select-selector {
    border: unset !important;
  }

  .ant-select-focused .ant-select-selector,
  .ant-select-selector:focus,
  .ant-select-selector:active,
  .ant-select-open .ant-select-selector {
    border-color: unset !important;
    box-shadow: none !important;
  }

  .ant-select-selection-item {
    color: $primary-color;
    top: 0;
    font-weight: 700;
  }

  &::before {
    content: "Записей на стр: ";
    color: $text-base;
    padding-right: $offset-xxs;
  }
  &::marker {
    display: none;
  }
  // select
  .ant-select {
    margin-right: 0;
    color: $text-contrast;
    font-size: 16px;

    .ant-select-selection {
      background: $text-contrast;
      border: 1px solid $text-contrast;
      border-radius: 4px;
    }

    .ant-select-selection__rendered {
      margin-right: 16px;
      margin-left: 16px;
      line-height: 30px;
    }

    // single
    .ant-select-selection--single {
      height: 15px;

      .ant-select-selection__rendered {
        margin-right: 28px;
      }
    }

    // icon
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

    // open
    &.ant-select-open {
      .ant-select-arrow .ant-select-suffix:after {
        transform: rotate(180deg);
      }
    }

    // focused
    &.ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
      box-shadow: none;
    }
  }

  // dropdown
  .ant-select-dropdown {
    border-radius: 3px;

    .ant-select-dropdown-menu-item {
      padding: 8px;
      white-space: normal;
      line-height: 16px;
      color: $text-base;
      font-size: 13px;

      &-active:not(.ant-select-dropdown-menu-item-disabled),
      &:hover:not(.ant-select-dropdown-menu-item-disabled) {
        background-color: $text-contrast;
      }

      &-disabled,
      &-disabled:hover {
        color: transparentize($text-contrast, 0.5);
      }

      &-selected {
        font-weight: 400;
        text-shadow: 0 0 0 currentColor;
        background-color: $text-contrast;
      }
    }
  }
}

.ant-pagination-options-size-changer .ant-select-selector {
  height: $arrow-select !important;
}

// table
.ant-table table {
  border: 1px solid $table-border;
  border-radius: $border-radius;

  & .ant-empty-normal {
    margin: $offset-xs 0;
  }

  & .ant-empty-image {
    display: none;
  }
}

.ant-table-content {
  overflow: auto;
}

td.ant-table-column-sort {
  background-color: rgba(237, 252, 250, 0.6);
}

.ant-table-striped {
  background: $table-striped;
}

.ant-table-thead > tr > th {
  background: #fff;
  padding: $offset-xs $offset-sm !important;
  font-weight: 700;
  color: $text-base;

  .table-header-cell-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .table-header-column-change {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
  }
}

.ant-table-tbody > tr > td {
  padding: $offset-xs $offset-sm !important;

  svg {
    cursor: pointer;
  }
}

.ant-table-column-title {
  color: $text-base;
  font-weight: 700;
  font-size: $font-size-xxs;
}

.ant-table-thead
  > tr
  > th:not(:last-child):not(.ant-table-selection-column):not(
    .ant-table-row-expand-icon-cell
  ):not([colspan])::before {
  background-color: unset;
}
.ant-table-row-level-1 {
  & .ant-table-cell-with-append {
    padding-left: 10px !important;
  }
}
.ant-table-selection-column,
.ant-table-selection-col {
  display: none;
}

.ant-table-cell {
  & .ant-select {
    width: 100%;
    height: $filter-field;
  }

  & .ant-input {
    height: $filter-field;
  }
}

.checkbox-disabled {
  pointer-events: none;
}

.table-link {
  cursor: pointer;
  text-decoration: underline;
}
</style>
