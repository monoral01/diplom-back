import { baseService } from "./baseService";

export const getCompanyRegistry = async () => {
  const res = await baseService.get("/api");
  return res.data;
};

export const postCompany = async (body: any) => {
  console.log(body);
  const res = await baseService.post("/api/company", body);
  return res.data;
};
