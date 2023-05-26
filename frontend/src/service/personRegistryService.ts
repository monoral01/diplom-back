import { baseService } from "./baseService";

export const getCompanyRegistry = async () => {
  const res = await baseService.get("/api/personRegistry");
  return res.data;
};

export const postCompanyRegistry = async (body: any) => {
  console.log(body);
  const res = await baseService.post("/api/personRegistry", body);
  return res.data;
};
