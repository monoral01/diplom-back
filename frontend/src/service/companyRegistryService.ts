import { baseService } from "./baseService";

export const getCompanyRegistry = async ({
  page,
  pageSize,
  filters,
}: {
  page: string | number;
  pageSize: string | number;
  filters: any;
}) => {
  const res = await baseService.get("/api/company/registry", {
    params: { ...filters, page, pageSize },
  });
  return res.data;
};

export const getCompany = async (id: string | number) => {
  const res = await baseService.get(`/api/company/${id}`);
  return res.data;
};

export const updateCompany = async (body: any, id: string | number) => {
  const res = await baseService.put(`/api/company/${id}`, body);
  return res.data;
};

export const postCompany = async (body: any) => {
  const res = await baseService.post("/api/company", body);
  return res.data;
};

export const deleteCompany = async (id: string | number) => {
  const res = await baseService.delete(`/api/company/${id}`);
  return res.data;
};
