import { Ref, ref } from "vue";
import { DEFAULT_PAGE_SIZE, DEFAULT_SORTER, FIRST_PAGE } from "@/common/consts";
import { errorNotification } from "./notification";

type Service<T> = (
  page: number,
  pageSize: number,
  sort: string,
  filters: any[]
) => Promise<{
  data: T[];
  total: number;
}>;

export const createTable = <T>(
  service: Service<T>,
  customSorter?: (currentField: string) => string
) => {
  const total = ref(0);
  const currentFilters = ref();
  const currentPage = ref(FIRST_PAGE);
  const currentPageSize = ref(DEFAULT_PAGE_SIZE);
  const currentSorter = ref(DEFAULT_SORTER);
  const selectedRowKey = ref();
  const selectedRow = ref();
  const loadingTable = ref(false);

  const dataSource: Ref<T[]> = ref([]);

  const selectedRowChange = (rowKey: string | undefined) => {
    selectedRowKey.value = rowKey;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    selectedRow.value = dataSource.value.find((item) => item.key === rowKey);
  };

  const paginationChange = async (page: number, pageSize: number) => {
    loadingTable.value = true;
    try {
      const res = await service(
        page,
        pageSize,
        currentSorter.value,
        currentFilters.value
      );

      dataSource.value = res.data;
      currentPage.value = page;
      currentPageSize.value = pageSize;
    } catch {
      errorNotification("При обновлении пагинации произошла ошибка");
    } finally {
      loadingTable.value = false;
    }
  };

  const sortChange = async (field: string, order: string) => {
    loadingTable.value = true;
    try {
      let sorter = field;

      if (customSorter) {
        sorter = customSorter(field);
      }

      if (order === "descend") {
        sorter = `-${sorter}`;
      }

      currentPage.value = FIRST_PAGE;

      const res = await service(
        currentPage.value,
        currentPageSize.value,
        sorter,
        currentFilters.value
      );

      dataSource.value = res.data;
      currentSorter.value = sorter;
    } catch {
      errorNotification("При обновлении сортировки произошла ошибка");
    } finally {
      loadingTable.value = false;
    }
  };

  return {
    dataSource,
    total,
    loadingTable,
    currentFilters,
    currentSorter,
    currentPage,
    currentPageSize,
    selectedRowKey,
    selectedRow,
    paginationChange,
    sortChange,
    selectedRowChange,
  };
};
