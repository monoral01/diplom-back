import { SystemPermissions } from "@/common/consts";

export interface UserEntity {
  id: string;
  uuid: string;
  fio: string;
  createrDate: string;
  permissions: SystemPermissions[];
}
