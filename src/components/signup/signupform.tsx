'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../common/Button';
import InputItem from '../login/logininputitem';
import Image from 'next/image';
import { api } from '@/lib/axios'; // api 객체 임포트
import { useRouter } from 'next/navigation'; // useRouter 임포트
import { useAuthStore } from '@/store/auth'; // 경로 수정

// 응답 데이터 타입 정의
interface SignUpResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [isClient, setIsClient] = useState(false); // 클라이언트 사이드 확인용 상태
  const router = useRouter(); // useRouter 훅 사용

  // zustand 상태 업데이트 함수 가져오기
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 응답 타입을 SignUpResponse로 지정
      const response = await api.post<SignUpResponse>('/users', {
        email,
        nickname,
        password,
      });

      console.log('회원가입 성공:', response.data);

      // 회원가입 성공 시 토큰과 유저 정보 zustand 상태에 저장
      const { access_token, user } = response.data;
      if (access_token) {
        setToken(access_token); // zustand 상태에 토큰 저장
        setUser(user); // zustand 상태에 유저 정보 저장
      }

      // 회원가입 성공 후 홈 페이지로 리다이렉트
      if (isClient) {
        // 클라이언트 사이드에서만 router.push 호출
        router.push('/'); // 홈 페이지로 이동
      }
    } catch (err) {
      setError('회원가입에 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null; // 클라이언트에서만 렌더링하도록 하기
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <form className="gap-[28px] flex flex-col" onSubmit={handleSubmit}>
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputItem
          label="닉네임"
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputItem
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="nomad-black"
          size="full"
          disabled={loading}
        >
          {loading ? '가입 중...' : '회원가입 하기'}
        </Button>
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이신가요?
        <Link href="/login" aria-label="로그인으로 이동">
          <span className="text-gray-900 text-[16px] font-medium underline">
            로그인하기
          </span>
        </Link>
      </p>
      <div className="flex gap-[40px] text-xl text-gray-800 font-regular flex justify-center items-center whitespace-nowrap">
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 회원가입하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>
      <div className="flex gap-[16px] flex justify-center items-center ">
        <Image
          src="/icons/icon-logo-google.svg"
          alt="구글 로고"
          width={72}
          height={72}
        />
        <Image
          src="/icons/icon-logo-kakao.svg"
          alt="카카오 로고"
          width={72}
          height={72}
        />
      </div>
    </div>
  );
}

export default SignUpForm;
