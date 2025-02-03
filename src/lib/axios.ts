// src/lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';

// config 타입 확장
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retry?: boolean;
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 클라이언트 사이드에서만 실행되도록 체크
const isClient = typeof window !== 'undefined';

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열(큐)
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 대기 중인 요청들을 처리하는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 요청을 구독하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers = [];
};

// 인증이 필요한 api
export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
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
    async (error: AxiosError) => {
      const originalConfig = error.config as InternalAxiosRequestConfig;

      if (!originalConfig || !error.response || originalConfig.retry) {
        return Promise.reject(error);
      }

      if (error.response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // 현재 토큰으로 토큰 갱신 시도
            const {
              data: { accessToken },
            } = await axios.post(
              `${baseURL}/auth/tokens`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${useAuthStore.getState().token}`,
                },
              }
            );

            // 새 토큰 저장
            const { setToken } = useAuthStore.getState();
            setToken(accessToken);

            // 원본 요청의 헤더 업데이트
            if (originalConfig.headers) {
              originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            }

            // 대기 중인 요청들 처리
            onRefreshed(accessToken);

            // 원본 요청 재시도
            originalConfig.retry = true;
            return axiosInstance(originalConfig);
          } catch (refreshError) {
            // 토큰 갱신 실패 시 로그아웃
            const { logout } = useAuthStore.getState();
            logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // 토큰 갱신 중인 경우 대기
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              if (originalConfig.headers) {
                originalConfig.headers.Authorization = `Bearer ${token}`;
              }
              originalConfig.retry = true;
              resolve(axiosInstance(originalConfig));
            });
          });
        }
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

// 인증이 필요없는 public api
export const publicAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증이 필요없는 API만 처리
export const publicApi = {
  get: <T>(url: string, config = {}) => publicAxios.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) =>
    publicAxios.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) =>
    publicAxios.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => publicAxios.delete<T>(url, config),
};

// 에러처리 인터셉터
publicAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);
