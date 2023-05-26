import { UserEntity } from "@/models/UserEntity";
import { baseService } from "./baseService";

export const getUserData = async ({
  login,
  password,
}: {
  login?: string;
  password?: string;
}): Promise<{ token: string; userData: UserEntity }> => {
  const res = await baseService.post("/api/authorization/login", {
    login,
    password,
  });
  return res.data;
};

export const logout = async () => {
  const res = await baseService.post("/api/authorization/logout", {});
  return res.status;
};
