import { CellConst } from "@/common/consts";

export const registryColumns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "ФИО",
    dataIndex: "fio",
    width: 200,
  },
  {
    title: "Дата создания",
    dataIndex: "createDate",
    width: 200,
    slot: CellConst.DATE,
  },
];
