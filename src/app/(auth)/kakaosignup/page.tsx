'use client';
import React, { useEffect, useState } from 'react';
import KakaoSignUpForm from '@/components/signup/kakaosignupform';
import Container from '@/components/login/container';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../../components/common/Button';
import { authApi } from '@/services/auth';
import { AxiosError } from 'axios';

const KakaoSignup = () => {
  const [kakaoCode, setKakaoCode] = useState<string | null>(null);
  const [nickname, setNickname] = useState(''); // 닉네임 상태 추가
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setKakaoCode(code);
    }
  }, []);

  const handleSignup = async () => {
    if (!nickname || !kakaoCode) {
      if (!nickname) {
        console.log('닉네임이 없습니다.');
      }
      if (!kakaoCode) {
        console.log('인가코드가 없습니다.');
      }
      alert('모든 정보를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const redirectUri =
        'https://globalnomad-11-2-test.vercel.app/kakaosignup';
      console.log('카카오 간편회원가입 요청 데이터:', {
        nickname,
        redirectUri,
        token: kakaoCode,
      });
      const response = await authApi.signUpWithKakao({
        nickname,
        redirectUri,
        token: kakaoCode,
      });

      console.log('회원가입 성공:', response);

      window.location.href = '/';
    } catch (error: unknown) {
      console.error('회원가입 실패', error);

      if (error instanceof AxiosError) {
        console.error('서버 응답 오류:', error.response);
        console.error('응답 데이터:', error.response?.data);
        console.error('응답 상태:', error.response?.status);
      } else if (error instanceof Error) {
        console.error('일반 오류:', error.message);
      } else {
        console.error('알 수 없는 오류:', error);
      }

      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          <KakaoSignUpForm setNickname={setNickname} />
          <Button
            type="button"
            variant="nomad-black"
            size="full"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? '가입 중...' : '회원가입 하기'}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default KakaoSignup;
