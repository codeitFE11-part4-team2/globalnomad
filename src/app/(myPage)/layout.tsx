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

  const handleMenuItemClick = (href: string) => {
    setIsMenuItemClicked(false);
    setIsSideNavVisible(false);
    router.push(href);
  };

  useEffect(() => {
    setIsMenuItemClicked(true);
    setIsSideNavVisible(false);
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setIsSideNavVisible(true);
      setIsMenuItemClicked(false);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleShowSideNav = () => {
    setIsSideNavVisible(true);
    setIsMenuItemClicked(false);
  };

  const isMobileMyInformPage = pathname === '/mobilemyinform';

  return (
    <div className="w-[344px] md:w-[696px] lg:w-[1208px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px]">
      <div className={`md:block ${isSideNavVisible ? '' : 'hidden'}`}>
        <SideNavMenu onMenuItemClick={handleMenuItemClick} />{' '}
      </div>

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
