import { CellConst } from "@/common/consts";

export const registryColumns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Статус",
    dataIndex: "companyStatus",
    width: 200,
  },
  {
    title: "Название",
    dataIndex: "companyName",
    width: 200,
  },
  {
    title: "ИНН",
    dataIndex: "companyInn",
    width: 200,
  },
  {
    title: "ОГРНИП",
    dataIndex: "companyNumber",
    width: 200,
  },
  {
    title: "Директор",
    dataIndex: "companyDirectorName",
    width: 200,
  },
  {
    title: "Дата регистрации",
    dataIndex: "companyRegistrationDate",
    width: 200,
    slot: CellConst.DATE,
  },
  {
    title: "Дата создания карточки",
    dataIndex: "createDate",
    width: 200,
    slot: CellConst.DATE,
  },
];
