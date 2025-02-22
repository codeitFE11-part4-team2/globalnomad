'use client';

import { ReactNode, useState, useEffect } from 'react';
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/common/Button';

type Props = { children: ReactNode };

export default function myPageLayout({ children }: Props) {
  const [isMenuItemClicked, setIsMenuItemClicked] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // 메뉴 클릭 시 호출되는 핸들러
  const handleMenuItemClick = (href: string) => {
    setIsMenuItemClicked(false); // 메뉴 클릭 시 children을 잠시 숨기기
    setIsSideNavVisible(false); // 메뉴 클릭 시 SideNavMenu 숨기기
    router.push(href); // Next.js 라우터로 페이지 전환
  };

  // 페이지가 변경된 후, children을 표시하도록 설정
  useEffect(() => {
    setIsMenuItemClicked(true);
    setIsSideNavVisible(false); // children이 보일 때는 SideNavMenu 숨기기
  }, [pathname]); // pathname 변경 시마다 effect 실행

  // 뒤로 가기 버튼을 눌렀을 때 SideNavMenu 보이게 하기
  useEffect(() => {
    const handlePopState = () => {
      setIsSideNavVisible(true); // SideNavMenu 다시 보이게 설정
      setIsMenuItemClicked(false); // children 숨기기
    };

    // 브라우저의 popstate 이벤트 리스너 추가
    window.addEventListener('popstate', handlePopState);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // SideNavMenu 다시 보이게 하는 버튼 클릭 핸들러
  const handleShowSideNav = () => {
    setIsSideNavVisible(true); // 버튼 클릭 시 SideNavMenu 보이게 설정
    setIsMenuItemClicked(false); // children 숨기기
  };

  const isMobileMyInformPage = pathname === '/mobilemyinform';

  return (
    <div className="w-[344px] md:w-[696px] lg:w-[1208px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px]">
      {/* 모바일에서만 SideNavMenu 숨기기 */}
      <div className={`md:block ${isSideNavVisible ? '' : 'hidden'}`}>
        <SideNavMenu onMenuItemClick={handleMenuItemClick} />{' '}
        {/* 클릭 핸들러 전달 */}
      </div>

      {/* 모바일에서 children 보일 때, SideNavMenu 숨기기 */}
      <div
        className={`flex-1 ${!isMenuItemClicked ? 'hidden' : 'block'} md:block`}
      >
        {children}

        {!isSideNavVisible && !isMobileMyInformPage && (
          <div className="md:hidden mt-4">
            <Button
              type="button"
              variant="nomad-black"
              size="full"
              onClick={handleShowSideNav}
            >
              메뉴 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
