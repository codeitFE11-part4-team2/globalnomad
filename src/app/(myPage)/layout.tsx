import { ReactNode } from 'react';
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';
type Props = { children: ReactNode; modal: ReactNode };
export default function myPageLayout({ children, modal }: Props) {
  // 추후 로그인여부 판별하는 훅 붙일예정

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
