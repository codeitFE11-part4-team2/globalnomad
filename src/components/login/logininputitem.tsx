interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean; // error를 전달받을 수 있도록 추가
}

export default function InputItem({
  label,
  id,
  error,
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
          border ${error ? 'border-red-500' : 'border-gray-600'} ${className}`} // 조건부 클래스 추가
        {...props}
      />
    </div>
  );
}
