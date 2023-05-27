import { CardStatus } from "@/models/Common";
import { CompanyCardState } from "@/models/CompanyEntity";
import dayjs from "dayjs";
import { accountsMock, operationTableMock } from "../common/consts";
import { AdditionalInfoState } from "@/models/AdditionalInfoEntity";

export const initialCardState: CompanyCardState = {
  // id: undefined,
  // status: undefined,
  // createDate: undefined,
  // companyName: undefined,
  // companyNumber: undefined,
  // companyINN: undefined,
  // creditHistoryResult: undefined
  // companyDirectorName: undefined,
  // companyAddress: undefined,
  // companyRegistrationDate: undefined,
  // postAddress: undefined,
  // lawAddress: "г Псков, ул Советская д 30",
  // files: [],
  // history: [],
  id: "1",
  companyStatus: CardStatus.NEW,
  createDate: "15.05.2023",
  companyName: "ООО Рога и Копыта",
  companyNumber: 12983091823908,
  companyINN: 112121219,
  creditHistoryResult: true,
  companyDirectorName: "Чеч К.К.",
  companyAddress: "г Псков, ул Советская д 30",
  companyRegistrationDate: dayjs("1.01.1970"),
  postAddress: "г Псков, ул Советская д 30",
  lawAddress: "г Псков, ул Советская д 30",
  files: [],
  history: [
    {
      key: 1,
      id: 1,
      dateTime: "13/05/2023",
      info: "Предложение кредита. Отказ",
    },
  ],
};

export const cardHistoryColumns = [
  {
    title: "Дата и время",
    dataIndex: "dateTime",
    width: 200,
  },
  {
    title: "Событие",
    dataIndex: "info",
    width: 200,
  },
];
export const initialAddInfoState: AdditionalInfoState = {
  operationsDetailed: true,
  operationHistory: operationTableMock,
  accounts: accountsMock,
};
