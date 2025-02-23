'use client';

import React from 'react';
import Image from 'next/image';
import { authApi } from '../../services/auth';

const KakaoLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = 'https://globalnomad-11-2-test.vercel.app/login';

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleKakaoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await authApi.registerOAuthApp('kakao');
      console.log('카카오 OAuth 앱 등록 성공:', response);

      window.location.href = kakaoLoginUrl;
    } catch (error) {
      console.error('카카오 OAuth 앱 등록 실패:', error);
      alert('카카오 OAuth 앱 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <a href={kakaoLoginUrl} onClick={handleKakaoLogin}>
      <Image
        src="/icons/icon-logo-kakao.svg"
        alt="카카오 로고"
        className="md:w-[72px] md:h-[72px] w-[48px] h-[48px]"
        width={72}
        height={72}
      />
    </a>
  );
};

export default KakaoLoginButton;
