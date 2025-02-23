'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';

type Props = { children: ReactNode };

export default function myPageLayout({ children }: Props) {
  const pathname = usePathname();

  if (pathname === '/mobilemyinform') {
    return <>{children}</>;
  }

  return (
    <div className="w-[344px] md:w-[696px] lg:w-[1208px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px]">
      <div className="hidden md:block">
        <SideNavMenu />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
