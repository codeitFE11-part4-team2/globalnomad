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
  // 기존 로그인 API
  login: (data: LoginRequest) => {
    return api.post<LoginResponse>('/auth/login', data);
  },

  // OAuth 앱 등록 API (카카오 또는 구글 등)
  registerOAuthApp: async (provider: string) => {
    try {
      const appKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 API 키 (혹은 구글 API 키로 수정 가능)

      if (!appKey) {
        throw new Error(
          'appKey가 설정되지 않았습니다. 환경변수를 확인해주세요.'
        );
      }

      const data = {
        appKey, // 카카오 또는 구글 API 키
        provider, // 'KAKAO' 또는 'GOOGLE'
      };

      const response = await api.post('/oauth/apps', data); // '/oauth/apps'로 요청 전송
      return response;
    } catch (error) {
      console.error('OAuth 앱 등록 오류:', error);
      throw error;
    }
  },

  // 카카오 로그인 API
  signInWithKakao: async (data: { redirectUri: string; token: string }) => {
    try {
      const response = await api.post('/oauth/sign-in/kakao', data); // '/oauth/sign-in/kakao'로 요청 전송
      return response; // 응답 반환
    } catch (error) {
      console.error('카카오 로그인 오류', error);
      throw error; // 오류를 다시 던져서 호출한 곳에서 처리하게끔
    }
  },

  // 다른 인증 관련 API 추가 가능
};
