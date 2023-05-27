import axios from "axios";

export const baseService = axios.create();

baseService.interceptors.request.use(async (req) => {
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
