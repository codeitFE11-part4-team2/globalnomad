'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../common/Button';
import InputItem from '../login/logininputitem';
import Image from 'next/image';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useForm, Controller } from 'react-hook-form';

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

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false); // loading 상태 추가
  const router = useRouter();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    // setError,
    // clearErrors,
    // setValue,
    getValues, // getValues를 useForm에서 가져옴
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange', // onChange로 유효성 검사
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return '이메일 형식으로 작성해 주세요.'; // 문자열 반환
    }
    return true; // 유효한 이메일인 경우
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }
    return true;
  };

  // 비밀번호 확인을 실시간으로 체크하도록 수정
  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (confirmPassword !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return true;
  };

  const handleSubmitForm = async (data: FormData) => {
    const { email, nickname, password } = data;

    try {
      setLoading(true);
      const response = await api.post<SignUpResponse>('/users', {
        email,
        nickname,
        password,
      });

      console.log('회원가입 성공:', response.data);

      const { access_token, user } = response.data;
      if (access_token) {
        setToken(access_token);
        setUser(user);
      }

      if (isClient) {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 버튼 비활성화 상태 체크
  const isButtonDisabled =
    !isValid || !!errors.email || !!errors.password || !!errors.confirmPassword;

  return (
    <div className="flex flex-col gap-[10px]">
      <form
        className="gap-[28px] flex flex-col"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일은 필수 입력 사항입니다.',
            validate: (value) => validateEmail(value), // 유효성 검사
          }}
          render={({ field }) => (
            <InputItem
              label="이메일"
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validateEmail(e.target.value); // 이메일 유효성 검사
              }}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: '닉네임은 필수 입력 사항입니다.',
          }}
          render={({ field }) => (
            <InputItem
              label="닉네임"
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={field.value || ''}
              onChange={field.onChange}
              error={!!errors.nickname}
              errorMessage={errors.nickname?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: '비밀번호는 필수 입력 사항입니다.',
            validate: (value) => validatePassword(value), // 비밀번호 유효성 검사
          }}
          render={({ field }) => (
            <InputItem
              label="비밀번호"
              id="password"
              type="password"
              placeholder="8자 이상 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validatePassword(e.target.value); // 비밀번호 유효성 검사
              }}
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: '비밀번호 확인은 필수 입력 사항입니다.',
            validate: (value) =>
              validateConfirmPassword(value, getValues('password')), // 비밀번호 확인 유효성 검사
          }}
          render={({ field }) => (
            <InputItem
              label="비밀번호 확인"
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validateConfirmPassword(e.target.value, getValues('password')); // 비밀번호 확인 유효성 검사
              }}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="nomad-black"
          size="full"
          disabled={isButtonDisabled || loading} // 로딩 상태와 유효성 검사 결과에 따라 버튼 활성화
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
