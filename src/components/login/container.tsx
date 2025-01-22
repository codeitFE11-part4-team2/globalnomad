import { HTMLAttributes, ReactNode } from 'react';

// 본 Container는 div 태그를 기본값으로 함
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  color: 'white' | 'gray';
  children: ReactNode;
  addClassName?: string | string[];
}

export default function Container({
  color = 'white',
  children,
  addClassName,
  ...rest
}: ContainerProps) {
  const colorClasses = {
    white: 'bg-white',
    gray: 'bg-gray-100',
  };

  // addClassName이 배열인 경우 조인하고, 아니면 그대로 사용
  const additionalClassNames = Array.isArray(addClassName)
    ? addClassName.join(' ')
    : addClassName;

  // 최종적으로 클래스 이름 결합
  const divClass = [colorClasses[color], additionalClassNames]
    .filter(Boolean) // undefined, null, false, 빈 문자열은 필터링
    .join(' ');

  return (
    <div className={divClass} {...rest}>
      {children}
    </div>
  );
}
