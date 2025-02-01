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
  token: string;
}

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }, // isValid 상태 추가
    setValue,
    setError: setFormError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange', // onChange로 유효성 검사
    reValidateMode: 'onChange', // 필드 값이 바뀔 때마다 유효성 재검사
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<LoginResponse>('auth/login', {
        email: data.email,
        password: data.password,
      });

      const { user, token } = response.data;
      login(user, token);

      if (isMounted) {
        router.push('/');
      }
    } catch (err) {
      setError('로그인 실패');
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
      clearErrors('email'); // 정상적인 이메일 입력 시 에러 지우기
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setFormError('password', {
        type: 'manual',
        message: '8자 이상 작성해 주세요.',
      });
    } else {
      clearErrors('password'); // 정상적인 비밀번호 입력 시 에러 지우기
    }
  };

  if (!isMounted) {
    return null;
  }

  // 이메일과 비밀번호 오류 상태가 있을 때 버튼 비활성화
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
                validateEmail(e.target.value); // 이메일 입력 시 검증
              }}
              onBlur={() => validateEmail(field.value)} // 포커스 아웃 시 이메일 검증
              error={!!errors.email} // error 상태 전달
              errorMessage={errors.email?.message} // 에러 메시지 전달
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
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                validatePassword(e.target.value); // 비밀번호 입력 시 검증
              }}
              onBlur={() => validatePassword(field.value)} // 포커스 아웃 시 비밀번호 길이 검증
              error={!!errors.password} // error 상태 전달
              errorMessage={errors.password?.message} // 에러 메시지 전달
            />
          )}
        />

        <Button
          type="submit"
          variant="green"
          size="full"
          disabled={isButtonDisabled} // 이메일 또는 비밀번호에 에러가 있으면 버튼 비활성화
        >
          {loading ? '로그인 중...' : '로그인 하기'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이 아니신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-gray-900 text-[16px] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
      <div className="flex gap-[40px] text-xl text-gray-800 font-regular flex justify-center items-center whitespace-nowrap">
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 로그인하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>
      <div className="flex gap-[16px] flex justify-center items-center ">
        <Image
          src="/icons/icon-logo-google.svg"
          alt="구글 로고"
          width={72}
          height={72}
        />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
