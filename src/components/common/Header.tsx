'use client';

import Image from 'next/image';
import { useAuthStore } from '@/store';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import logo from '../../../public/icons/icon-logomd.svg';

const handleLogoClick = () => {
  location.replace('/');
};

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full h-[70px] p-[10px] flex justify-center items-center border-b border-gray-300 gap-0">
      <nav className="w-[1200px] h-[30px] flex justify-between items-center">
        <Link href="/" onClick={handleLogoClick}>
          <Image width={172} height={30} src={logo} alt="노마드 로고" />
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            {/* 알림 아이콘 */}
            <div
              onClick={toggleNotification}
              className="relative cursor-pointer"
            >
              <Image
                src="/icons/icon-notification.svg"
                alt="알림 아이콘"
                width={20}
                height={20}
              />
              {isNotificationOpen && (
                <div className="absolute right-0 top-8 w-[200px] bg-white border border-gray-300 shadow-lg p-4">
                  <p>알림</p>
                  {/* 알림 내용을 여기에 추가할 수 있음 */}
                </div>
              )}
            </div>

            <div className="h-[22px] border-r border-gray-300" />

            {/* 사용자 프로필 사진과 닉네임 */}
            <div className="relative flex items-center gap-5">
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
                onClick={toggleDropdown}
              >
                {user?.nickname}
              </span>

              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 w-[160px] bg-white border border-gray-300 rounded-[6px] 
                py-2 mt-2 text-center font-mediume text-2lg font-pretendard"
                >
                  <Link
                    href="/mypage"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-200"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={logout}
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
