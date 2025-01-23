'use client';

import Image from 'next/image';
import { useAuthStore } from '@/store';
import Link from 'next/link';

import logo from '../../../public/icons/logomd.svg';

const handleLogoClick = () => {
  location.replace('/');
};

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="w-full h-[70px] p-[10px] flex justify-center items-center border-b border-gray-300 gap-0">
      <nav className="w-full max-w-[1200px] h-[30px] flex justify-between items-center">
        <Link href="/" onClick={handleLogoClick}>
          <Image width={172} height={30} src={logo} alt="노마드 로고" />
        </Link>
        {isAuthenticated ? (
          <div>
            <span>Welcome, {user?.nickname}</span>
            <button onClick={logout}>Logout</button>
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
