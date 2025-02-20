'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputItem from '@/components/login/logininputitem';
import { useAuthStore } from '@/store/auth'; // Zustand store
import { Button } from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useFixProfile } from '@/store/fixprofile';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function Myinform() {
  const [isClient, setIsClient] = useState(false);
  const { user, setUser, token } = useAuthStore((state) => state); // user, setUser, token 가져오기
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isKakaoUser = user?.email?.endsWith('@kakao.com');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: user?.email || '',
      nickname: user?.nickname || '',
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

  const imageurl = useFixProfile((state) => state.imageurl);

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

  const handleProfileUpdate = async (data: FormData) => {
    if (isKakaoUser) {
      alert('카카오 계정은 비밀번호를 변경할 수 없습니다.');
      return;
    }

    const { nickname, password } = data;

    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    const body: Record<string, any> = {};

    // 변경된 값만 추가
    if (nickname !== user.nickname) {
      body.nickname = nickname;
    }
    if (imageurl !== user.profileImageUrl) {
      body.profileImageUrl = imageurl;
    }
    if (password) {
      body.newPassword = password;
    }
    try {
      const response = await fetch(
        'https://sp-globalnomad-api.vercel.app/11-2/users/me',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error('프로필 업데이트 실패');
      }

      const result = await response.json();
      console.log('프로필 업데이트 성공:', result);

      // 서버에서 프로필 업데이트가 완료된 후, 상태를 갱신합니다.
      // 만약 서버 응답에 수정된 사용자 정보가 포함되어 있다면, 그 값을 상태에 반영할 수 있습니다.
      setUser({
        ...user,
        nickname: result.nickname || user.nickname,
        profileImageUrl: result.profileImageUrl || user.profileImageUrl,
      });
      console.log('업데이트된 사용자 정보:', user);

      // 성공적으로 업데이트되었으면 페이지를 리디렉션할 수 있습니다.
      router.push('/');
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">내 정보</h2>
        <Button onClick={handleSubmit(handleProfileUpdate)}>저장하기</Button>
      </div>
      <form className="gap-[28px] flex flex-col">
        <Controller
          name="nickname"
          control={control}
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
