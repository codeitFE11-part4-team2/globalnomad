import { useState } from 'react';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  passwordinput?: boolean; // passwordinput으로 이름 변경
}

export default function InputItem({
  label,
  id,
  error,
  passwordinput, // 변경된 prop 이름
  errorMessage,
  className,
  ...props
}: InputProps) {
  // 비밀번호 표시 여부 상태
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="gap-[8px] flex flex-col relative">
      <label
        htmlFor={id}
        className="text-lg font-regular text-[black] font-pretendard"
      >
        {label}
      </label>

      <div className="relative">
        {/* passwordinput 여부에 따라 input 다르게 렌더링 */}
        <input
          id={passwordinput ? `${id}-password` : id} // id 다르게 설정
          className={`font-pretendard placeholder-gray-600 text-lg rounded-[6px] w-full h-[58px] pl-[20px] pr-[40px] 
            border ${error ? 'border-red-500' : 'border-gray-600'} ${className}`}
          type={passwordinput && !isPasswordVisible ? 'password' : 'text'}
          {...props}
        />

        {/* 비밀번호 표시/숨기기 아이콘 */}
        {passwordinput && (
          <span
            onClick={() => setPasswordVisible(!isPasswordVisible)} // 클릭 시 상태 변경
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

      {/* 에러 메시지 출력 */}
      <input
        id={id}
        className={`font-pretendard placeholder-gray-600 text-lg rounded-[6px] 
          w-full h-[58px]  
          pl-[20px] border ${error ? 'border-red-500' : 'border-gray-600'} 
          ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-red-3 text-xs font-regular">{errorMessage}</p>
      )}
    </div>
  );
}
