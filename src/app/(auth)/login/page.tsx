'use client';

import { useEffect, useState } from 'react';
import { authApi } from '@/services/auth';
import { useAuthStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import Loginform from '../../../components/login/loginform';
import Container from '@/components/login/container';
import PwErrorModal from '../../../components/login/PwErrorModal';
import EmailErrorModal from '@/components/login/EmailErrorModal';
import { modalStore } from '@/store/modalStore';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const [isClient, setIsClient] = useState(false);

  const { modalType, isOpen } = modalStore();

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
            redirectUri: 'https://globalnomad-11-2-test.vercel.app/login',
            token: kakaoCode,
          })
          .then((response) => {
            const { accessToken, user, refreshToken } = response.data as {
              accessToken: string;
              refreshToken: string;
              user: {
                id: number;
                email: string;
                nickname: string;
                profileImageUrl: string;
                createdAt: string;
                updatedAt: string;
              };
            };

            login(user, accessToken, refreshToken);

            window.location.href = '/';
          })
          .catch((error) => {
            console.error('카카오 로그인 오류', error);
            if (error.response) {
              if (error.response.status === 403) {
                alert('회원가입이 필요합니다.');
                const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
                const redirectUri =
                  'https://globalnomad-11-2-test.vercel.app/kakaosignup';
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
    <>
      {isOpen && modalType === 'emailerror' && <EmailErrorModal />}
      {isOpen && modalType === 'pwerror' && <PwErrorModal />}

      <Container
        color="white"
        addClassName="max-w-[640px] w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        sm:aspect-[350/885] sm:max-w-[350px] sm:max-h-[645px] 
        md:aspect-[640/1003] md:max-w-[640px] md:max-h-[779px] 
        lg:aspect-[640/779] lg:max-w-[640px] lg:max-h-[779px] 
        "
      >
        <div
          className="flex flex-col gap-[56px]
        sm:gap-[40px] sm:w-[350px] sm:max-h-[467px]
        md:gap-[48px] md:w-[640px] md:max-h-[531px]
        lg:gap-[48px] lg:w-[640px] lg:max-h-[531px]
        "
        >
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/logo_big.svg"
              alt="노마드 로고"
              width={270}
              height={154}
              className="block mx-auto 
              md:w-[340px] md:h-[192px]"
            />
          </Link>

          {isLoading ? (
            <div className="text-center text-gray-500">로그인 중...</div>
          ) : (
            <Loginform />
          )}
        </div>
      </Container>
    </>
  );
}
