import {
  OperationStatus,
  OperationType,
  Currency,
  AccountStatus,
  AccountType,
} from "./OperationEntity";
export type OperationHistoryState = {
  time: string;
  status: OperationStatus;
  message?: string;
  description: string;
  type: OperationType;
  sender: string;
  senderBank: string;
  senderPhoneNumber: string;
  senderAccountNumber: string;
  recipient: string;
  recipientBank: string;
  recipientPhoneNumber: string;
  recipientAccountNumber: string;
  sum: number;
  transferFee: number;
  currency: Currency;
};
export type AccountState = {
  timeCreate: string;
  status: AccountStatus;
  type: AccountType;
  holder: string;
  phoneNumber: string;
  sum: number;
  debt: number;
  percent: string;
  debtDeadline: string;
  requisitesCheckingAccount: string;
  requisitesBankName: string;
  requisitesBIK: string;
  requisitesKPP: string;
  requisitesKorrAccount: string;
  requisitesCardNumber: string;
  currency: Currency;
};
export type AdditionalInfoState = {
  operationsDetailed?: boolean;
  operationHistory: OperationHistoryState[];
  accounts: AccountState[];
};
