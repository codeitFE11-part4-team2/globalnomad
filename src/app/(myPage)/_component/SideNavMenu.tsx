'use client';

import { useAuthStore } from '@/store/auth'; // Zustand store import
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, ChangeEvent } from 'react';
import {
  EditProfileIcon,
  SideMenuIcon1,
  SideMenuIcon2,
  SideMenuIcon3,
  SideMenuIcon4,
} from '@/lib/constants/icons';
import { useFixProfile } from '@/store/fixprofile';
interface ProfileImage {
  file: File | null;
  preview: string;
}
export async function ProfileImageUrl(file: File, token: string | null) {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(
    'https://sp-globalnomad-api.vercel.app/11-2/users/me/image',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('서버 응답 오류:', errorData);
    throw new Error('이미지 업로드 실패!');
  }

  const data = await response.json();
  if (data && data.profileImageUrl) {
    return data.profileImageUrl;
  } else {
    console.error('ProfileImageUrl이 응답에 없음:', data);
    throw new Error('ProfileImageUrl을 찾을 수 없습니다.');
  }
}

export default function SideNavMenu() {
  const { user } = useAuthStore();
  const { setImageurl } = useFixProfile();
  const pathname = usePathname(); // 현재 경로 가져오기

  const [profileImage, setProfileImage] = useState<ProfileImage>({
    file: null,
    preview: user?.profileImageUrl || '/icons/defaultuser_icon.svg',
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const token = useAuthStore((state) => state.token); // Zustand에서 access-token 가져오기

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.log('파일크기 5MB 초과');
        return;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.log('지원하는 이미지형식이 아님');
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        setProfileImage({
          file,
          preview: reader.result as string,
        });

        try {
          const uploadedUrl = await ProfileImageUrl(file, token);
          setProfileImage((prev) => ({
            ...prev,
            preview: uploadedUrl,
          }));

          setImageurl(uploadedUrl);
        } catch (error) {
          console.error('프로필 이미지 업로드 실패:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImage = () => {
    imageRef.current?.click();
  };

  const menuItems = [
    {
      href: '/myinformation',
      label: '내 정보',
      icon: (isActive: boolean) => (
        <SideMenuIcon1
          className={isActive ? 'fill-nomad-black' : 'fill-gray-700'}
        />
      ),
    },
    {
      href: '/reservations/history',
      label: '예약 내역',
      icon: (isActive: boolean) => (
        <SideMenuIcon2
          className={isActive ? 'fill-nomad-black' : 'fill-gray-700'}
        />
      ),
    },
    {
      href: '/myactivity',
      label: '내 체험 관리',
      icon: (isActive: boolean) => (
        <SideMenuIcon4
          className={isActive ? 'fill-nomad-black' : 'fill-gray-700'}
        />
      ),
    },
    {
      href: '/reservations/status',
      label: '예약 현황',
      icon: (isActive: boolean) => (
        <SideMenuIcon3
          className={isActive ? 'fill-nomad-black' : 'fill-gray-700'}
        />
      ),
    },
  ];

  return (
    <div className="md:w-[251px] sm:w-[344px] lg:w-[384px] h-[432px] rounded-xl p-6 flex flex-col items-center gap-6 border border-gray-300 shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)]">
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
          <EditProfileIcon className="fill-gray-700" />
        </div>
      </div>
      <div className="w-full">
        <ul className="grid gap-2">
          {menuItems.map(({ href, label, icon }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl 
                    ${isActive ? 'bg-green-2 text-nomad-black' : 'text-gray-700'}`}
                >
                  {icon(isActive)}
                  <span className="text-lg font-bold">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
