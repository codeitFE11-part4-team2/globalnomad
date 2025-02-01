interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string; // errorMessage를 prop으로 추가
}

export default function InputItem({
  label,
  id,
  error,
  errorMessage, // errorMessage 추가
  className,
  ...props
}: InputProps) {
  return (
    <div className="gap-[8px] flex flex-col">
      <label
        htmlFor={id}
        className="text-lg font-regular text-[black] font-pretendard"
      >
        {label}
      </label>
      <input
        id={id}
        className={`font-pretendard placeholder-gray-600 text-lg rounded-[6px] w-[640px] h-[58px] pl-[20px] 
          border ${error ? 'border-red-500' : 'border-gray-600'} ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-red-3 text-xs font-regular">{errorMessage}</p> // 에러 메시지 출력
      )}
    </div>
  );
}
