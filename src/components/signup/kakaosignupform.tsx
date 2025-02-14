'use client';

import { useState } from 'react';
import InputItem from '../login/logininputitem';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  nickname: string;
}

function KakaoSignUpForm() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

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

  const handleSubmitForm = async (data: FormData) => {
    setLoading(true);
    console.log('닉네임 제출:', data.nickname);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <form
        className="gap-[28px] flex flex-col"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Controller
          name="nickname"
          control={control}
          rules={{ required: '닉네임은 필수 입력 사항입니다.' }}
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
      </form>
    </div>
  );
}

export default KakaoSignUpForm;
