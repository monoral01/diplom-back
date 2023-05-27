import { UserEntity } from "@/models/UserEntity";
import { baseService } from "./baseService";
import { SystemPermissions } from "@/common/consts";

export const getUserData = async ({
  userLogin,
  userPassword,
}: {
  userLogin?: string;
  userPassword?: string;
}): Promise<{
  token: string;
  fio: string;
  permissions: SystemPermissions[];
}> => {
  const res = await baseService.post("/api/user/login", {
    userLogin,
    userPassword,
  });
  return res.data;
};

export const logout = async () => {
  const res = await baseService.post("/api/user/logout", {});
  return res.status;
};
