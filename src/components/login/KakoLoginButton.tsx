'use client';

import React from 'react';
import Image from 'next/image';
import { authApi } from '../../services/auth'; // 수정: authApi로 변경

const KakaoLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 앱 키
  const redirectUri = 'http://localhost:3000/login'; // 카카오에 등록한 리디렉션 URI

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleKakaoLogin = async (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 동작인 링크 이동을 방지

    try {
      // 카카오 앱 등록을 수행
      const response = await authApi.registerOAuthApp('kakao'); // 수정: authApi로 변경
      console.log('카카오 OAuth 앱 등록 성공:', response);

      // OAuth 앱 등록 후 카카오 로그인 페이지로 리디렉션
      window.location.href = kakaoLoginUrl;
    } catch (error) {
      console.error('카카오 OAuth 앱 등록 실패:', error);
      alert('카카오 OAuth 앱 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <a
      href={kakaoLoginUrl}
      onClick={handleKakaoLogin} // 이미지 클릭 시 OAuth 앱 등록 후 리디렉션
      // className="cursor-pointer"
    >
      <Image
        src="/icons/icon-logo-kakao.svg"
        alt="카카오 로고"
        width={72}
        height={72}
      />
    </a>
  );
};

export default KakaoLoginButton;
