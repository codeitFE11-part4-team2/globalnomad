import { api } from '@/lib/axios';

interface LoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginRequest) => {
    return api.post<LoginResponse>('/auth/login', data);
  },
  // 다른 인증 관련 api 들 추가
  // signin: (data)=> ~
};
