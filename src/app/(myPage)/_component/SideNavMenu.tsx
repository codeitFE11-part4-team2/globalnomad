'use client';

import { useAuthStore } from '@/store/auth'; // Zustand store import
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
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
    console.error('서버 응답 오류:', errorData); // 서버 응답 오류 내용
    throw new Error('이미지 업로드 실패!');
  }

  const data = await response.json();
  console.log(data); // 응답 데이터 확인
  if (data && data.profileImageUrl) {
    return data.profileImageUrl;
  } else {
    console.error('ProfileImageUrl이 응답에 없음:', data); // 응답에서 ProfileImageUrl이 없는 경우
    throw new Error('ProfileImageUrl을 찾을 수 없습니다.');
  }
}

export default function SideNavMenu() {
  // 메뉴 선택되는 상태변화를 segment로 추적하려고 생각중
  const { setImageurl } = useFixProfile();
  const segment = useSelectedLayoutSegment();

  const [profileImage, setProfileImage] = useState<ProfileImage>({
    file: null,
    preview: '/icons/defaultuser_icon.svg',
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const token = useAuthStore((state) => state.token); // Zustand에서 access-token 가져오기

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크
      if (file.size > MAX_FILE_SIZE) {
        console.log('파일크기 5MB 초과');
        return;
      }

      // 파일 형식 체크
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.log('지원하는 이미지형식이 아님');
        return;
      }

      // 로컬 미리보기 이미지 업데이트
      const reader = new FileReader();
      reader.onload = async () => {
        setProfileImage({
          file,
          preview: reader.result as string,
        });

        // 서버에 이미지 업로드
        try {
          const uploadedUrl = await ProfileImageUrl(file, token);
          setProfileImage((prev) => ({
            ...prev,
            preview: uploadedUrl, // 업로드된 이미지 URL로 미리보기 업데이트
          }));

          setImageurl(uploadedUrl);

          console.log('업로드된 프로필 이미지 URL:', uploadedUrl);
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
          <EditProfileIcon className="fill-gray-700" />
        </div>
      </div>
      <div className="w-full">
        <ul className="grid gap-2">
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              <SideMenuIcon1 className="fill-gray-700" />
              <span className="text-lg font-bold">내 정보</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-nomad-black fill-nomad-black bg-green-2"
            >
              <SideMenuIcon2 className="fill-gray-700" />
              <span className="text-lg font-bold">예약 내역</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              <SideMenuIcon3 className="fill-gray-700" />
              <span className="text-lg font-bold">내 체험 관리</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              <SideMenuIcon4 className="fill-gray-700" />
              <span className="text-lg font-bold">예약 현황</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
