'use client';

import { ReactNode, useState, useEffect } from 'react';
import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';
import { useRouter } from 'next/navigation';

type Props = { children: ReactNode };

export default function myPageLayout({ children }: Props) {
  const [isMenuItemClicked, setIsMenuItemClicked] = useState(false); // 메뉴 클릭 여부 상태
  const [isSideNavVisible, setIsSideNavVisible] = useState(true); // SideNavMenu 표시 여부 상태
  const router = useRouter(); // Next.js 라우터 사용

  const handleMenuItemClick = () => {
    setIsMenuItemClicked(true); // 메뉴 클릭 시 children을 보이게 설정
    setIsSideNavVisible(false); // 메뉴 클릭 시 SideNavMenu 숨기기
  };

  // 뒤로 가기 버튼을 눌렀을 때 SideNavMenu 보이게 하기
  useEffect(() => {
    // 뒤로가기나 페이지가 변경될 때 SideNavMenu 다시 보여주기
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
      </div>
    </div>
  );
}
