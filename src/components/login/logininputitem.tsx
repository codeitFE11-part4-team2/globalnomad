import { useState } from 'react';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  passwordinput?: boolean;
  labelClassName?: string; // label 스타일을 외부에서 지정할 수 있도록 추가
}

export default function InputItem({
  label,
  id,
  error,
  passwordinput,
  errorMessage,
  className,
  labelClassName, // labelClassName을 받아서 사용
  ...props
}: InputProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="gap-[8px] flex flex-col relative">
      {/* label 스타일을 props로 받으면 이를 적용 */}
      <label
        htmlFor={id}
        className={`font-pretendard text-[black] ${labelClassName || 'text-lg font-regular'}`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={passwordinput ? `${id}-password` : id}
          className={`font-pretendard placeholder-gray-600 text-lg rounded-[6px] w-full h-[58px] pl-[20px]
            border ${error ? 'border-red-500' : 'border-gray-600'} ${className}`}
          type={passwordinput && !isPasswordVisible ? 'password' : 'text'}
          {...props}
        />

        {passwordinput && (
          <span
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                isPasswordVisible
                  ? '/icons/icon-visibility_on.svg'
                  : '/icons/icon-visibility_off.svg'
              }
              alt={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
              width={20.47}
              height={20.47}
            />
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-red-3 text-xs font-regular">{errorMessage}</p>
      )}
    </div>
  );
}
