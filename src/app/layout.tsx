import type { Metadata } from 'next';
import '@/styles/globals.css';
import { pretendard } from './fonts';
import QueryProvider from '@/providers/query-provider';

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
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
