import { SystemPermissions } from "@/common/consts";

export interface UserEntity {
  userId: string;
  fio: string;
  createrDate: string;
  permissions: SystemPermissions[];
}
