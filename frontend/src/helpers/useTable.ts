import { Ref, ref } from "vue";
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from "@/common/consts";
import { errorNotification } from "./notification";

type Service<T> = ({
  page,
  pageSize,
  filters,
}: {
  page: number;
  pageSize: number;
  filters: any[];
}) => Promise<{
  data: T[];
}>;

export const useTable = <T>(service: Service<T>) => {
  const total = ref(0);
  const currentFilters = ref();
  const currentPage = ref(FIRST_PAGE);
  const currentPageSize = ref(DEFAULT_PAGE_SIZE);
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
      const res = await service({
        page,
        pageSize,
        filters: currentFilters.value,
      });

      dataSource.value = res.data;
      currentPage.value = page;
      currentPageSize.value = pageSize;
    } catch {
      errorNotification("При обновлении пагинации произошла ошибка");
    } finally {
      loadingTable.value = false;
    }
  };

  return {
    dataSource,
    total,
    loadingTable,
    currentFilters,
    currentPage,
    currentPageSize,
    selectedRowKey,
    selectedRow,
    paginationChange,
    selectedRowChange,
  };
};
