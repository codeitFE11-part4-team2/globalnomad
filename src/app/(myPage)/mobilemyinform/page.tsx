'use client';

import SideNavMenu from '@/app/(myPage)/_component/SideNavMenu';

export default function mobilemyinform() {
  const handleMenuItemClick = (href: string) => {};

  return (
    <div className="w-full md:w-[696px] lg:w-[1200px] flex md:gap-4 lg:gap-6 justify-center mx-auto mt-6 lg:mt-[72px] px-6">
      <div className="md:block">
        <SideNavMenu onMenuItemClick={handleMenuItemClick} />
      </div>
    </div>
  );
}
