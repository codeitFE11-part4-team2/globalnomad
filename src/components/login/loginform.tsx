import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../common/Button';
import InputItem from './logininputitem';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';
import Link from 'next/link';
import KakaoLoginButton from './KakoLoginButton';
import { useForm, Controller } from 'react-hook-form';
import { AxiosError } from 'axios'; // AxiosError 타입을 import
import { modalStore } from '@/store/modalStore';

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface FormData {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string; // 서버에서 반환하는 에러 메시지 형식
}

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { openModal } = modalStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    setError: setFormError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>('auth/login', {
        email: data.email,
        password: data.password,
      });

      const { user, accessToken, refreshToken } = response.data;
      login(user, accessToken, refreshToken);

      if (isMounted) {
        router.push('/');
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      if (error.response?.data?.message === '비밀번호가 일치하지 않습니다.') {
        openModal('pwerror');
      } else if (
        error.response?.data?.message === '존재하지 않는 유저입니다.'
      ) {
        openModal('emailerror');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormError('email', {
        type: 'manual',
        message: '이메일 형식으로 작성해 주세요.',
      });
    } else {
      clearErrors('email');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setFormError('password', {
        type: 'manual',
        message: '8자 이상 작성해 주세요.',
      });
    } else {
      clearErrors('password');
    }
  };

  if (!isMounted) {
    return null;
  }

  const isButtonDisabled =
    loading || !isValid || !!errors.email || !!errors.password;

  return (
    <div className="flex flex-col gap-[32px]">
      <form
        className="gap-[32px] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
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
          name="password"
          control={control}
          rules={{
            required: '비밀번호는 필수 입력 사항입니다.',
          }}
          render={({ field }) => (
            <InputItem
              label="비밀번호"
              id="pw"
              passwordinput
              placeholder="비밀번호를 입력해주세요"
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

        <Button
          type="submit"
          variant="green"
          size="full"
          disabled={isButtonDisabled}
        >
          {loading ? '로그인 중...' : '로그인 하기'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이 아니신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-green-3 text-[16px] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
      <div
        className="flex gap-[40px] text-md text-gray-800 font-regular flex justify-center items-center whitespace-nowrap
      md:text-xl"
      >
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 로그인하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>
      <div className="flex gap-[16px] flex justify-center items-center ">
        <Image
          src="/icons/icon-logo-google.svg"
          alt="구글 로고"
          width={48}
          height={48}
          className="md:w-[72px] md:h-[72px]"
        />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
