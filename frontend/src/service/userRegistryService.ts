import { UserEntity } from "@/models/UserEntity";
import { baseService } from "./baseService";
import dayjs from "dayjs";

export const getUserRegistry = async ({
  page,
  pageSize,
  filters,
}: {
  page: string | number;
  pageSize: string | number;
  filters: any;
}) => {
  const res = await baseService.get("/api/user/registry", {
    params: { ...filters, page, pageSize },
  });
  return res.data.map((user: UserEntity) => ({ ...user, key: user.id }));
};

export const postUser = async (body: any) => {
  console.log(body);
  const res = await baseService.post("/api/user", body);
  return res.data;
};

export const getUser = async (id: string | number) => {
  const res = await baseService.get(`/api/user/${id}`);
  return {
    ...res.data,
    createDate: dayjs(res.data.createDate),
    permissions: res.data.permissions.map((perm: any, index: number) => ({
      permission: perm,
      index: index,
    })),
  };
};

export const getPermissions = async (id: string | number) => {
  const res = await baseService.get(`/api/user/permissions`);
  return res.data.map((perm: any, index: number) => ({
    permission: perm,
    index: index,
  }));
};

export const updateUser = async (body: any, id: string | number) => {
  const res = await baseService.put(`/api/user/${id}`, body);
  return res.data;
};

export const deleteUser = async (id: string | number) => {
  const res = await baseService.delete(`/api/user/${id}`);
  return res.data;
};
