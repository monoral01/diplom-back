import { AccountState } from "@/models/AdditionalInfoEntity";
import {
  AccountStatus,
  AccountType,
  Currency,
  OperationState,
  OperationStatus,
  OperationType,
} from "@/models/OperationEntity";

export const operationTableMock: OperationState[] = [
  {
    time: "16.05.2023 12:52",
    status: OperationStatus.SUCCESS,
    message: undefined,
    description: "16.05.2023 Перевод на счёт 4230118000000123131545 500 RUB",
    type: OperationType.TRANSFER_TO_YOURSELF,
    sender: "Кирилл С.",
    senderBank: "ПАО Сбербанк",
    senderPhoneNumber: "+7 900 000 00 00",
    senderAccountNumber: "4230118000000100001233",
    recipient: "Кирилл С.",
    recipientBank: "ПАО Сбербанк",
    recipientPhoneNumber: "+7 900 000 00 00",
    recipientAccountNumber: "4230118000000123131545",
    sum: 500,
    transferFee: 0,
    currency: Currency.RUB,
  },
  {
    time: "16.05.2023 12:52",
    status: OperationStatus.SUCCESS,
    message: undefined,
    description: "16.05.2023 Перевод на счёт 4230118000000123131545 500 RUB",
    type: OperationType.TRANSFER_TO_YOURSELF,
    sender: "Кирилл С.",
    senderBank: "ПАО Сбербанк",
    senderPhoneNumber: "+7 900 000 00 00",
    senderAccountNumber: "4230118000000100001233",
    recipient: "Кирилл С.",
    recipientBank: "ПАО Сбербанк",
    recipientPhoneNumber: "+7 900 000 00 00",
    recipientAccountNumber: "4230118000000123131545",
    sum: 500,
    transferFee: 0,
    currency: Currency.RUB,
  },
  {
    time: "16.05.2023 12:52",
    status: OperationStatus.SUCCESS,
    message: undefined,
    description: "16.05.2023 Перевод на счёт 4230118000000123131545 500 RUB",
    type: OperationType.TRANSFER_TO_YOURSELF,
    sender: "Кирилл С.",
    senderBank: "ПАО Сбербанк",
    senderPhoneNumber: "+7 900 000 00 00",
    senderAccountNumber: "4230118000000100001233",
    recipient: "Кирилл С.",
    recipientBank: "ПАО Сбербанк",
    recipientPhoneNumber: "+7 900 000 00 00",
    recipientAccountNumber: "4230118000000123131545",
    sum: 500,
    transferFee: 0,
    currency: Currency.RUB,
  },
];

export const accountsMock: AccountState[] = [
  {
    timeCreate: "16.05.2023 12:52",
    status: AccountStatus.ACTIVE,
    type: AccountType.CREDIT,
    holder: "Кирилл С.",
    phoneNumber: "+7 900 000 00 00",
    sum: 80000,
    debt: 20000,
    percent: "4%",
    debtDeadline: "19.05.2023 00:00",
    currency: Currency.RUB,
    requisitesCheckingAccount: "12312312521123",
    requisitesBankName: "ПАО Сбербанк",
    requisitesBIK: "132541251",
    requisitesKPP: "151256125",
    requisitesKorrAccount: "136136",
    requisitesCardNumber: "235235235235621",
  },
  {
    timeCreate: "08.08.2021 12:52",
    status: AccountStatus.ACTIVE,
    type: AccountType.BUDGET,
    holder: "Кирилл С.",
    phoneNumber: "+7 900 000 00 00",
    sum: 10000,
    debt: 0,
    percent: "0%",
    debtDeadline: "",
    currency: Currency.RUB,
    requisitesCheckingAccount: "12312312521352",
    requisitesBankName: "ПАО Сбербанк",
    requisitesBIK: "132541251",
    requisitesKPP: "151256125",
    requisitesKorrAccount: "136136",
    requisitesCardNumber: "34734734734734",
  },
];

export const operationHistoryColumnsShort = [
  {
    title: "Дата и время",
    dataIndex: "time",
    width: 200,
  },
  {
    title: "Статус",
    dataIndex: "status",
    width: 200,
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: 200,
  },
  {
    title: "Тип",
    dataIndex: "type",
    width: 200,
  },
  {
    title: "Отправитель",
    dataIndex: "sender",
    width: 200,
  },
  {
    title: "Получатель",
    dataIndex: "recipient",
    width: 200,
  },
];

export const operationHistoryColumns = [
  {
    title: "Дата и время",
    dataIndex: "time",
    width: 200,
  },
  {
    title: "Статус",
    dataIndex: "status",
    width: 200,
  },
  {
    title: "Сообщение",
    dataIndex: "message",
    width: 200,
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: 200,
  },
  {
    title: "Тип",
    dataIndex: "type",
    width: 200,
  },
  {
    title: "Отправитель",
    dataIndex: "sender",
    width: 200,
  },
  {
    title: "Банк отправителя",
    dataIndex: "senderBank",
    width: 200,
  },
  {
    title: "Номер счёта отправителя",
    dataIndex: "senderAccountNumber",
    width: 200,
  },
  {
    title: "Получатель",
    dataIndex: "recipient",
    width: 200,
  },
  {
    title: "Банк получателя",
    dataIndex: "recipientBank",
    width: 200,
  },
  {
    title: "Номер счёта получателя",
    dataIndex: "recipientAccountNumber",
    width: 200,
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    width: 200,
  },
  {
    title: "Налог",
    dataIndex: "transferFee",
    width: 200,
  },
  {
    title: "Валюта",
    dataIndex: "currency",
    width: 200,
  },
];
