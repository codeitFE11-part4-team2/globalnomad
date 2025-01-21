import { ReactNode } from 'react';
import SideNavMenu from '@/components/common/SideNavMenu';

type Props = { children: ReactNode; modal: ReactNode };
export default function myPageLayout({ children, modal }: Props) {
  return (
    <>
      <SideNavMenu />
      {children}
      {modal}
    </>
  );
}
