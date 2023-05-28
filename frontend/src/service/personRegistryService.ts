import { baseService } from "./baseService";

export const getPersonRegistry = async ({
  page,
  pageSize,
  filters,
}: {
  page: string | number;
  pageSize: string | number;
  filters: any;
}) => {
  const res = await baseService.get("/api/person/registry", {
    params: { ...filters, page, pageSize },
  });
  return res.data;
};

export const getPerson = async (id: string | number) => {
  const res = await baseService.get(`/api/person/${id}`);
  return res.data;
};

export const updatePerson = async (body: any, id: string | number) => {
  const res = await baseService.put(`/api/person/${id}`, body);
  return res.data;
};

export const postPerson = async (body: any) => {
  const res = await baseService.post("/api/person", body);
  return res.data;
};

export const deletePerson = async (id: string | number) => {
  const res = await baseService.delete(`/api/person/${id}`);
  return res.status;
};
