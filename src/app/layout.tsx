import '@/styles/globals.css';
import { pretendard } from './fonts';
import QueryProvider from '@/providers/query-provider';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: 'This is for Global Nomads',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className="antialiased bg-[#FAFBFC]">
        <QueryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}