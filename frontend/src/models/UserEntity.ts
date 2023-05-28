import { SystemPermissions } from "@/common/consts";
import { Dayjs } from "dayjs";

export interface UserEntity {
  id?: string;
  uuid?: string;
  fio?: string;
  createDate?: Dayjs;
  permissions: { index: number; permission: SystemPermissions }[];
}
