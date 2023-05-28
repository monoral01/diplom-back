import { CellConst } from "@/common/consts";

export const registryColumns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Статус",
    dataIndex: "personStatus",
    width: 200,
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    width: 200,
  },
  {
    title: "Имя",
    dataIndex: "firstName",
    width: 200,
  },
  {
    title: "Отчество",
    dataIndex: "patrName",
    width: 200,
  },
  {
    title: "Дата создания карточки",
    dataIndex: "createDate",
    width: 200,
    slot: CellConst.DATE,
  },
];
