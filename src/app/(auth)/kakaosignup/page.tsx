'use client';

import React, { useEffect, useState } from 'react'; // React와 useEffect, useState를 한 번에 임포트
import InputItem from '@/components/login/logininputitem';
import { Button } from '../../../components/common/Button';
import { authApi } from '@/services/auth'; // authApi import
import { AxiosError } from 'axios'; // AxiosError를 import

const KakaoSignup = () => {
  const [kakaoCode, setKakaoCode] = useState<string | null>(null); // 타입을 string | null로 설정
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // URL에서 쿼리 파라미터 추출
    const code = params.get('code'); // 'code' 파라미터 추출

    if (code) {
      setKakaoCode(code); // 카카오 인가코드 저장
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleSignup = async () => {
    if (!nickname || !kakaoCode) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      // 간편회원가입 API 호출
      const redirectUri = 'http://localhost:3000/kakaosignup'; // 회원가입 후 리디렉션될 URI
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

      // 응답 데이터 사용 (예: 로그인 성공 후 토큰 저장)
      console.log('회원가입 성공:', response);

      // 예시로 상태 관리나 로그인 상태 저장을 할 수 있습니다.
      // 예: setToken(response.accessToken);

      // 회원가입 성공 후 리디렉션
      window.location.href = '/'; // 홈으로 리디렉션
    } catch (error: unknown) {
      console.error('회원가입 실패', error);

      // error가 AxiosError인지 확인하고 처리
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
        onChange={(e) => setNickname(e.target.value)} // 닉네임 상태 업데이트
      />
      <Button
        type="button"
        variant="nomad-black"
        size="full"
        onClick={handleSignup} // 회원가입 버튼 클릭 시 호출
        disabled={loading} // 로딩 중일 때 버튼 비활성화
      >
        {loading ? '가입 중...' : '회원가입 하기'}
      </Button>
    </div>
  );
};

export default KakaoSignup;
