// import axios from 'axios';

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default instance;

// export const registerOAuthApp = async (provider: string) => {
//   try {
//     const appKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 API 키 (혹은 구글 API 키로 수정 가능)

//     if (!appKey) {
//       throw new Error('appKey가 설정되지 않았습니다. 환경변수를 확인해주세요.');
//     }

//     const data = {
//       appKey, // 카카오 또는 구글 API 키
//       provider, // 'KAKAO' 또는 'GOOGLE'
//     };

//     const response = await instance.post('/oauth/apps', data); // 여기서 "/oauthApps" 사용

//     return response;
//   } catch (error) {
//     console.error('OAuth 앱 등록 오류:', error);
//     throw error;
//   }
// };

// export const signInWithKakao = async (data: {
//   redirectUri: string;
//   token: string;
// }) => {
//   try {
//     const response = await instance.post('oauth/sign-in/kakao', data);
//     return response; // 응답 반환
//   } catch (error) {
//     console.error('카카오 로그인 오류', error);
//     throw error; // 오류를 다시 던져서 호출한 곳에서 처리하게끔
//   }
// };
