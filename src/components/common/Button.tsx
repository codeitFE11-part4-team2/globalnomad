import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from './Spinner';

type ButtonVariant = 'nomad-black' | 'white' | 'gray-600' | 'green';
type ButtonSize = 'small' | 'xsmall' | 'medium' | 'large' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // 버튼 내부에 들어갈 컨텐츠
  variant?: ButtonVariant; // 버튼 스타일(기본값: 'nomad-balack')
  size?: ButtonSize; // 버튼 크기(기본값: 'medium')
  className?: string; // 추가적인 css 클래스
  isLoading?: boolean; // 로딩 상태 표시 여부
  fullWidth?: boolean; // 버튼을 부모 너비에 맞춰 확장할지 여부
}

export function Button({
  children,
  variant = 'nomad-black',
  size = 'medium',
  className = '',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  // variant 별 스타일(hover, focus 상태 포함)
  const variantStyles = {
    'nomad-black':
      'bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500',
    white:
      'bg-white text-black border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200',
    'gray-600':
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400',
    green:
      'bg-green-3 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-600',
  };

  // 크기별 스타일(width, height, 글자 크기)
  const sizeStyles = {
    small: 'w-[108px] h-[38px] text-sm',
    xsmall: 'w-[120px] h-[48px] text-base',
    medium: 'w-[144px] h-[48px] text-base',
    large: 'w-[350px] h-[48px] text-base',
    full: 'px-6 py-3 text-base w-full',
  };

  // 공통 스타일
  const baseStyles =
    'flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner className="w-5 h-5" /> : children}
    </button>
  );
}
