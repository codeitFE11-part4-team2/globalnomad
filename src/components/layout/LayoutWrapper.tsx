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
  const isActivityPage = pathname.includes('/activity/');
  const isAuthPage =
    ['/login', '/signup', '/kakaosignup'].includes(pathname) || isActivityPage;
  const showFooter = !isAuthPage;

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
