'use client';

import React, { useEffect, useState } from 'react';
import InputItem from '@/components/login/logininputitem';
import { Button } from '../../../components/common/Button';
import { authApi } from '@/services/auth';
import { AxiosError } from 'axios';

const KakaoSignup = () => {
  const [kakaoCode, setKakaoCode] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
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
      alert('모든 정보를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const redirectUri = 'http://localhost:3000/kakaosignup';
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

      // 예시로 상태 관리나 로그인 상태 저장을 할 수 있습니다.
      // 예: setToken(response.accessToken);

      // 회원가입 성공 후 리디렉션
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
      <InputItem
        label="닉네임"
        id="nickname"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
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
  );
};

export default KakaoSignup;
