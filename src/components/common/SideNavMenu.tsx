'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useRef, useState, ChangeEvent } from 'react';
import {
  SideMenuIcon1,
  SideMenuICon2,
  SideMenuICon3,
  SideMenuICon4,
} from '@/lib/constants';

interface ProfileImage {
  file: File | null;
  preview: string;
}

export default function SideNavMenu() {
  // 메뉴 선택되는 상태변화를 segment로 추적하려고 생각중
  const segment = useSelectedLayoutSegment();

  const [profileImage, setProfileImage] = useState<ProfileImage>({
    file: null,
    preview: '/icons/defaultuser_icon.svg',
  });
  const imageRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImage = () => {
    imageRef.current?.click();
  };

  return (
    <div className="w-[384px] h-[432px] rounded-xl p-6 flex flex-col items-center gap-6 border border-gray-300">
      <div className="w-40 h-40 relative">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={profileImage.preview}
            alt="프로필사진"
            className="w-full h-full"
          />
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          hidden
          ref={imageRef}
          onChange={handleFileChange}
        />
        <div
          className="w-11 h-11 rounded-full bg-green-3 absolute bottom-0 right-3 flex justify-center items-center cursor-pointer"
          onClick={handleImage}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M16.8103 6.05983L4.05422 18.8473L3.28125 20.7186L5.1525 19.9456L17.94 7.18952L16.8103 6.05983ZM19.3627 3.50795L18.81 4.06014L19.9397 5.18983L20.4923 4.63717C20.6374 4.49205 20.7188 4.29529 20.7188 4.09014C20.7188 3.88499 20.6374 3.68823 20.4923 3.54311L20.4572 3.50795C20.3853 3.43608 20.3 3.37907 20.2061 3.34017C20.1122 3.30127 20.0116 3.28125 19.9099 3.28125C19.8083 3.28125 19.7076 3.30127 19.6137 3.34017C19.5198 3.37907 19.4345 3.43608 19.3627 3.50795Z"
              stroke="white"
              strokeWidth="2.0625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="w-full">
        <ul className="grid gap-2">
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              {SideMenuIcon1}
              <span className="text-lg font-bold">내 정보</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-nomad-black fill-nomad-black bg-green-2"
            >
              {SideMenuICon2}

              <span className="text-lg font-bold">예약 내역</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              {SideMenuICon3}

              <span className="text-lg font-bold">내 체험 관리</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              {SideMenuICon4}

              <span className="text-lg font-bold">예약 현황</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
