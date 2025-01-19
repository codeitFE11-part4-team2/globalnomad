// src/lib/axios.ts
import axios from "axios";
import { useAuthStore } from "@/store";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 클라이언트 사이드에서만 실행되도록 체크
const isClient = typeof window !== "undefined";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

if (isClient) {
  // 클라이언트 사이드일 때만 인터셉터 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const { logout } = useAuthStore.getState();
        logout();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}

// API 메서드 래퍼 (타입 안정성을 위해)
export const api = {
  get: <T>(url: string, config = {}) => axiosInstance.get<T>(url, config),

  post: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.post<T>(url, data, config),

  put: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.put<T>(url, data, config),

  delete: <T>(url: string, config = {}) => axiosInstance.delete<T>(url, config),
};
