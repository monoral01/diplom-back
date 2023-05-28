import { Dayjs } from "dayjs";
import { CardHistoryState } from "./CardHistoryEntity";
import { CardStatus } from "./Common";
import { FileItem } from "./File";
import { OperationState } from "./OperationEntity";
import { AccountState } from "./AdditionalInfoEntity";

export type CompanyCardState = {
  id?: string;
  userId?: string;
  createDate?: string;
  companyStatus?: CardStatus;
  companyName?: string;
  companyNumber?: number;
  companyInn?: number;
  companyDirectorName?: string;
  companyCountry?: { label: string; value: string };
  companyAddress?: string;
  companyRegistrationDate?: Dayjs;
  postAddress?: string;
  lawAddress?: string;
  history: CardHistoryState[];
  operations: OperationState[];
  accounts: AccountState[];
};
