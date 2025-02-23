'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로를 확인하기 위한 훅
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';

type Props = { children: ReactNode; modal: ReactNode };

export default function myPageLayout({ children, modal }: Props) {
  const pathname = usePathname(); // 현재 경로를 가져옵니다.

  // '/mobilemyinform' 경로인 경우 레이아웃을 제외
  if (pathname === '/mobilemyinform') {
    return (
      <>
        {children}
        {modal}
      </>
    ); // 이 경우는 레이아웃을 제외하고 children과 modal만 렌더링
  }

  return (
    <div className="w-full md:w-[696px] lg:w-[1200px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px] px-6">
      <div className="hidden md:block">
        <SideNavMenu />
      </div>
      <div className="flex-1">{children}</div>
      {modal}
    </div>
  );
}
