import { CardStatus } from "@/models/Common";
import { PersonCardState } from "@/models/PersonEntity";
import dayjs from "dayjs";
import { accountsMock, operationTableMock } from "../common/consts";
import { AdditionalInfoState } from "@/models/AdditionalInfoEntity";
export const initialAddInfoState: AdditionalInfoState = {
  operationsDetailed: true,
  operationHistory: operationTableMock,
  accounts: accountsMock,
};
export const initialCardState: PersonCardState = {
  // id: undefined,
  // status: undefined,
  // firstName: undefined,
  // lastName: undefined,
  // patrName: undefined,
  // reasonCredit: undefined,
  // companyName: undefined,
  // companyNumber: undefined,
  // companyINN: undefined,
  // companyDirectorName: undefined,
  // companyAddress: undefined,
  // companyRegistrationDate: undefined,
  // passportSerialNumber: undefined,
  // passportNumber: undefined,
  // issuedBy: undefined,
  // factAddress: undefined,
  // addressOfResidence: undefined,
  // files: [],
  id: "ФЛ123011",
  personStatus: CardStatus.NEW,
  createDate: "15.05.2023",
  lastName: "Сон",
  firstName: "Кирилл",
  patrName: "Романович",

  reasonCredit: "Маленькая кредитная история",
  companyName: "ООО Рога и Копыта",
  companyNumber: 12983091823908,
  companyINN: 112121219,
  companyDirectorName: "Сон К.Р.",
  lawAddress: "г Псков, ул Советская д 30",
  postAddress: "г Псков, ул Советская д 30",
  companyRegistrationDate: dayjs("1.01.1970"),
  passportSerialNumber: 1111,
  passportNumber: 111112,
  issuedBy: "ГУ МВД и тд и тп",
  factAddress: "г. Санкт-Петербург, улица Пушкина, дом Колотушкина",
  addressOfResidence: "Псковская обл, г. Псков, ул Байкова, д 13 кв 5",
  files: [],
  history: [
    {
      key: 1,
      id: 1,
      dateTime: "11/05/2023",
      info: "Справочный звонок. Предоставление информации",
    },
  ],
};
