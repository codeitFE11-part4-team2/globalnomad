'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useRef, useState, ChangeEvent } from 'react';
import {
  editProfileIcon,
  SideMenuIcon1,
  SideMenuICon2,
  SideMenuICon3,
  SideMenuICon4,
} from '@/lib/icons';

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
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.log('파일크기 5mb 초과');
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.log('지원하는 이미지형식이 아님');
        return;
      }
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
    <div className="md:w-[251px] lg:w-[384px] h-[432px] rounded-xl p-6 flex flex-col items-center gap-6 border border-gray-300">
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
          {editProfileIcon}
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
