'use client';

import { useAuthStore } from '@/store';
import Link from 'next/link';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user?.nickname}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
}
