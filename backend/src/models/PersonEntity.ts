import { CardHistoryState } from "./CardHistoryEntity";
import { CardStatus } from "./Common";
import { FileItem } from "./File";

export type PersonCardState = {
  id?: string;
  createDate?: string;
  personStatus?: CardStatus;
  lastName?: string;
  firstName?: string;
  patrName?: string;
  reasonCredit?: string;
  birthDate?: string;
  companyName?: string;
  companyNumber?: number;
  companyINN?: number;
  companyDirectorName?: string;
  companyCountry?: { label: string; value: string };
  postAddress?: string;
  lawAddress?: string;
  companyRegistrationDate?: string;
  passportSerialNumber?: number;
  passportNumber?: number;
  issuedBy?: string;
  factAddress?: string;
  addressOfResidence?: string;
  history: CardHistoryState[];
  files: FileItem[];
};
