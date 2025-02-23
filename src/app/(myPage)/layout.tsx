'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로를 확인하기 위한 훅
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';

type LayoutProps = {
  children: ReactNode;
  modal?: ReactNode; // modal을 선택적 속성으로 추가
};

export default function myPageLayout({ children, modal }: LayoutProps) {
  const pathname = usePathname(); // 현재 경로를 가져옵니다.

  // '/mobilemyinform' 경로인 경우 레이아웃을 제외
  if (pathname === '/mobilemyinform') {
    return (
      <>
        {children} {/* /mobilemyinform일 때는 children만 렌더링 */}
        {modal && modal} {/* modal이 있으면 렌더링 */}
      </>
    );
  }

  return (
    <div className="w-full md:w-[696px] lg:w-[1200px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px] px-6">
      <div className="hidden md:block">
        <SideNavMenu />
      </div>
      <div className="flex-1">{children}</div>
      {modal && modal} {/* modal이 있으면 렌더링 */}
    </div>
  );
}
