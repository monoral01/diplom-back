import { Dayjs } from "dayjs";
import { CardHistoryState } from "./CardHistoryEntity";
import { CardStatus } from "./Common";
import { FileItem } from "./File";

export type CompanyCardState = {
  companyId?: string;
  createUserId?: string;
  createDate?: string;
  status?: CardStatus;
  companyName?: string;
  companyNumber?: number;
  creditHistoryResult?: boolean;
  companyINN?: number;
  companyDirectorName?: string;
  companyCountry?: { label: string; value: string };
  companyAddress?: string;
  companyRegistrationDate?: Dayjs;
  postAddress?: string;
  lawAddress?: string;
  history: CardHistoryState[];
  files: FileItem[];
};
