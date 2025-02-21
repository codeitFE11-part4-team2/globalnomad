'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/signup', '/kakaosignup'].includes(pathname);

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
