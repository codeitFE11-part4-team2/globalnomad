import { useForm, Controller } from 'react-hook-form';
import InputItem from '../login/logininputitem';

interface FormData {
  nickname: string;
}

interface KakaoSignUpFormProps {
  setNickname: (nickname: string) => void;
}

function KakaoSignUpForm({ setNickname }: KakaoSignUpFormProps) {
  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  return (
    <div>
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
              setNickname(e.target.value);
            }}
            error={!!errors.nickname}
            errorMessage={errors.nickname?.message}
          />
        )}
      />
    </div>
  );
}

export default KakaoSignUpForm;
