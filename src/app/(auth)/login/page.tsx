'use client';

import Loginform from '../../../components/login/loginform';
import Container from '@/components/login/container';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { authApi } from '@/services/auth'; // 수정: authApi로 변경
// import { useRouter } from 'next/navigation'; // 수정: useRouter 추가

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken); // zustand에서 setToken 가져오기
  // const router = useRouter(); // 리디렉션을 위해 useRouter 추가

  useEffect(() => {
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
          const data = response.data as { accessToken: string }; // 응답 타입을 명시적으로 지정
          // 응답받은 토큰을 zustand 상태에 저장
          setToken(data.accessToken); // 'accessToken'을 사용
          window.location.href = '/'; // 로그인 후 홈으로 리디렉션
        })
        .catch((error) => {
          console.error('카카오 로그인 오류', error);
          if (error.response) {
            // 서버 응답 오류
            console.error('서버 오류 응답:', error.response.data);
          } else if (error.request) {
            // 요청이 서버에 도달했지만 응답을 받지 못한 경우
            console.error('요청 오류:', error.request);
          } else {
            // 다른 오류
            console.error('일반 오류:', error.message);
          }
          alert('카카오 로그인에 실패했습니다.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []); // router 추가

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
