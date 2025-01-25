'use client';

import { useEffect, useState } from 'react';
import { authApi } from '@/services/auth';
import { useAuthStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import Loginform from '../../../components/login/loginform';
import Container from '@/components/login/container';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const params = new URLSearchParams(window.location.search);
      const kakaoCode = params.get('code');

      if (kakaoCode) {
        setIsLoading(true);
        authApi
          .signInWithKakao({
            redirectUri: 'http://localhost:3000/login',
            token: kakaoCode,
          })
          .then((response) => {
            const { accessToken, user } = response.data as {
              accessToken: string;
              user: {
                id: number;
                email: string;
                nickname: string;
                profileImageUrl: string;
                createdAt: string;
                updatedAt: string;
              };
            };

            login(user, accessToken);

            window.location.href = '/';
          })
          .catch((error) => {
            console.error('카카오 로그인 오류', error);
            if (error.response) {
              if (error.response.status === 403) {
                alert('회원가입이 필요합니다.');
                const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
                const redirectUri = 'http://localhost:3000/kakaosignup';
                const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

                // 403 에러 발생 시 카카오 로그인 페이지로 리디렉션하여 새로운 인가 코드를 받음
                window.location.href = kakaoLoginUrl;
              } else {
                console.error('서버 오류 응답:', error.response.data);
              }
            } else if (error.request) {
              console.error('요청 오류:', error.request);
            } else {
              console.error('일반 오류:', error.message);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [isClient]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="gray"
        addClassName="max-w-[640px] max-h-[779px] w-full h-auto aspect-[640/779] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-[56px]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/logo_big.svg"
              alt="노마드 로고"
              width={340}
              height={192}
              className="block mx-auto"
            />
          </Link>

          {isLoading ? (
            <div className="text-center text-gray-500">로그인 중...</div>
          ) : (
            <Loginform />
          )}
        </div>
      </Container>
    </div>
  );
}
