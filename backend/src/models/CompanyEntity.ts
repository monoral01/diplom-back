import { CardHistoryState } from "./CardHistoryEntity";
import { CardStatus } from "./Common";
import { FileItem } from "./File";

export type CompanyCardState = {
  id?: string;
  userId?: string;
  createDate?: string;
  companyStatus?: CardStatus;
  companyName?: string;
  companyNumber?: number;
  companyINN?: number;
  companyDirectorName?: string;
  companyCountry?: { label: string; value: string };
  companyAddress?: string;
  companyRegistrationDate?: string;
  postAddress?: string;
  lawAddress?: string;
  history: CardHistoryState[];
  files: FileItem[];
};
