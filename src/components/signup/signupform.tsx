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
import { AxiosError } from 'axios';
import { modalStore } from '@/store/modalStore';

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

interface ErrorResponse {
  message: string; // 서버에서 반환하는 에러 메시지 형식
}

function SignUpForm() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { openModal } = modalStore();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'manual',
        message: '이메일 형식으로 작성해 주세요.',
      });
    } else {
      clearErrors('email');
    }
  };

  const validateNickname = (nickname: string) => {
    if (nickname.length > 10) {
      setError('nickname', {
        type: 'manual',
        message: '열 자 이하로 작성해주세요.',
      });
    } else {
      clearErrors('nickname');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError('password', {
        type: 'manual',
        message: '비밀번호는 8자 이상이어야 합니다.',
      });
    } else {
      clearErrors('password');
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    const password = getValues('password');
    if (confirmPassword !== password) {
      setError('confirmPassword', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      clearErrors('confirmPassword');
    }
  };

  const handleSubmitForm = async (data: FormData) => {
    const { email, nickname, password } = data;

    try {
      const isValidForm = await trigger();

      if (!isValidForm) {
        return;
      }

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
        alert('가입이 완료되었습니다!');
        router.push('/login');
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      if (error.response?.data?.message === '중복된 이메일입니다.') {
        openModal('checkemail');
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    !isValid ||
    !!errors.email ||
    !!errors.password ||
    !!errors.confirmPassword ||
    loading;

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
                validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(field.value)}
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
              onChange={(e) => {
                field.onChange(e);
                validateNickname(e.target.value);
              }}
              onBlur={() => validateNickname(field.value)}
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
          }}
          render={({ field }) => (
            <InputItem
              label="비밀번호"
              id="password"
              passwordinput
              placeholder="8자 이상 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(field.value)}
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
          }}
          render={({ field }) => (
            <InputItem
              label="비밀번호 확인"
              id="confirmPassword"
              passwordinput
              placeholder="비밀번호를 한번 더 입력해 주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validateConfirmPassword(e.target.value);
              }}
              onBlur={() => validateConfirmPassword(field.value)}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="green"
          size="full"
          disabled={isButtonDisabled}
        >
          {loading ? '가입 중...' : '회원가입 하기'}
        </Button>
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이신가요?
        <Link href="/login" aria-label="로그인으로 이동">
          <span className="text-green-3 text-[16px] font-medium underline">
            로그인하기
          </span>
        </Link>
      </p>
      <div
        className="flex gap-[40px] text-md text-gray-800 font-regular flex justify-center items-center whitespace-nowrap
      md:text-xl"
      >
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 회원가입하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>
      <div className="flex gap-[16px] flex justify-center items-center ">
        <Image
          src="/icons/icon-logo-google.svg"
          alt="구글 로고"
          className="md:w-[72px] md:h-[72px] w-[48px] h-[48px]"
          width={72}
          height={72}
        />
        <Image
          src="/icons/icon-logo-kakao.svg"
          alt="카카오 로고"
          className="md:w-[72px] md:h-[72px] w-[48px] h-[48px]"
          width={72}
          height={72}
        />
      </div>
    </div>
  );
}

export default SignUpForm;
