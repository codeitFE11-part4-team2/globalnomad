interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputItem({ label, id, ...props }: InputProps) {
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
        className="font-pretendard placeholder-gray-600 text-lg border border-gray-600 rounded-[6px] w-[640px] h-[58px] pl-[20px]"
        {...props}
      />
    </div>
  );
}
