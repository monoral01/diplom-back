import axios from "axios";

export const baseService = axios.create();

baseService.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("KSSZ-Token");
  if (accessToken && req.headers) {
    // eslint-disable-next-line no-param-reassign
    req.headers["KSSZ-Token"] = accessToken;
  }
  if (req?.url?.includes("kssz") && req.headers) {
    const ksszToken = "Y3NhOnVONEQ5dlM1RzI=";
    // eslint-disable-next-line no-param-reassign
    req.headers.Authorization = `Basic ${ksszToken}`;
  }
  return req;
});

baseService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
