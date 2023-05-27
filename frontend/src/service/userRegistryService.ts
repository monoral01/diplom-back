import { baseService } from "./baseService";

export const getUserRegistry = async () => {
  const res = await baseService.get("/api/user/registry");
  return res.data;
};

export const postUser = async (body: any) => {
  console.log(body);
  const res = await baseService.post("/api/user", body);
  return res.status;
};
