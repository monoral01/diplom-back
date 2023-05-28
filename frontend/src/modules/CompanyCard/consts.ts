import { CompanyCardState } from "@/models/CompanyEntity";
import { AdditionalInfoState } from "@/models/AdditionalInfoEntity";

export const initialCardState: CompanyCardState = {
  id: undefined,
  companyStatus: undefined,
  createDate: undefined,
  companyName: undefined,
  companyNumber: undefined,
  companyInn: undefined,
  companyDirectorName: undefined,
  companyAddress: undefined,
  companyRegistrationDate: undefined,
  postAddress: undefined,
  lawAddress: undefined,
  history: [],
  operations: [],
  accounts: [],
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
  operationHistory: [],
  accounts: [],
};
