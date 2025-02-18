import { ReactNode } from 'react';

interface StatusLayoutProps {
  children: ReactNode;
}

export default function StatusLayout({ children }: StatusLayoutProps) {
  return <>{children}</>;
}
