'use client';

import { Button } from '@/components/common/Button';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputItem from '@/components/login/logininputitem';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function Myinform() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">내 정보</h2>
        <Button>저장하기</Button>
      </div>
      <form
        className="gap-[28px] flex flex-col"
        onSubmit={handleSubmit(() => {})}
      >
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
              id="password"
              type="password"
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
              type="password"
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
      </form>
    </div>
  );
}

export default Myinform;
