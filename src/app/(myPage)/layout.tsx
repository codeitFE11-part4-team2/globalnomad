'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';

type LayoutProps = {
  children: ReactNode;
  modal?: ReactNode;
};

type Props = LayoutProps;

export default function myPageLayout({ children, modal }: Props) {
  const pathname = usePathname();

  if (pathname === '/mobilemyinform') {
    return (
      <>
        {children}
        {modal}
      </>
    );
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
