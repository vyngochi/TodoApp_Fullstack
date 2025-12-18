import axios from "axios";
import { authStore, logout } from "../store/AuthStore";
import type { ResponseModel } from "../model/ResponseModel";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({ message: "Network error" });
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = authStore.state.refreshToken;
        const res = await api.post<ResponseModel<{ refreshToken: string }>>(
          "/todoapp/refresh-token",
          { refreshToken }
        );

        const newToken = res.data.data?.refreshToken;

        localStorage.setItem("accessToken", newToken || "");

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (error) {
        logout();
        window.location.href = "/auth";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error.response.data);
  }
);
export default api;
