'use client';

import Image from 'next/image';
import { useAuthStore } from '@/store';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // useRouter 추가
import useOutsideClick from '@/hooks/useOutsideClick'; // 커스텀 훅 import
import logo from '../../../public/icons/icon-logomd.svg';
import NotificationPopup from './NotificationPopup';

const handleLogoClick = () => {
  location.replace('/');
};

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // useRouter 추가

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick(notificationRef, () => setNotificationOpen(false));

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 425); // 모바일 화면 크기 설정 (425px 이하)
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/kakaosignup'
  ) {
    return null;
  }

  // 로그아웃 후 홈으로 리디렉션하는 함수
  const handleLogout = () => {
    logout(); // 로그아웃 처리
    router.push('/'); // 홈으로 리디렉션
  };

  return (
    <header className="w-full h-[70px] p-[10px] flex justify-center items-center border-b border-gray-300 gap-0 bg-white">
      <nav className="w-[1200px] h-[30px] flex justify-between items-center">
        <Link href="/" onClick={handleLogoClick}>
          <Image width={172} height={30} src={logo} alt="노마드 로고" />
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            {/* 알림 아이콘 */}
            <div
              ref={notificationRef} // ref 적용
              onClick={() => setNotificationOpen((prev) => !prev)}
              className="relative cursor-pointer"
            >
              <Image
                src="/icons/icon-notification.svg"
                alt="알림 아이콘"
                width={20}
                height={20}
              />
              {isNotificationOpen && (
                <NotificationPopup onClose={() => setNotificationOpen(false)} />
              )}
            </div>

            <div className="h-[22px] border-r border-gray-300" />

            {/* 사용자 프로필 사진과 닉네임 */}
            <div ref={dropdownRef} className="relative flex items-center gap-5">
              {user?.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt="프로필 이미지"
                  width={42.29}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[40px] h-[40px] bg-gray-400 rounded-full flex justify-center items-center">
                  <span>{user?.nickname?.[0]}</span>
                </div>
              )}

              <span
                className="cursor-pointer text-black text-md font-medium font-pretendard"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {user?.nickname}
              </span>

              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 w-[160px] bg-white border border-gray-300 rounded-[6px] 
                py-2 mt-2 text-center font-medium text-2lg font-pretendard z-20"
                >
                  <Link
                    href={isMobile ? '/mobilemyinform' : '/myinformation'}
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-200"
                  >
                    마이페이지
                  </Link>
                  {/* 로그아웃 버튼 클릭 시 홈으로 리디렉션 */}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-900 hover:bg-gray-200 "
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4 font-pretendard text-md font-medium">
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
