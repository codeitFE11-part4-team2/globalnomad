'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useRef, useState, ChangeEvent } from 'react';

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
      const imageURL = URL.createObjectURL(file);
      setProfileImage({
        file,
        preview: imageURL,
      });
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
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M21.1 12.5L22.5 13.91L15.97 20.5L12.5 17L13.9 15.59L15.97 17.67L21.1 12.5ZM11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4ZM11 6C10.4696 6 9.96086 6.21071 9.58579 6.58579C9.21071 6.96086 9 7.46957 9 8C9 8.53043 9.21071 9.03914 9.58579 9.41421C9.96086 9.78929 10.4696 10 11 10C11.5304 10 12.0391 9.78929 12.4142 9.41421C12.7893 9.03914 13 8.53043 13 8C13 7.46957 12.7893 6.96086 12.4142 6.58579C12.0391 6.21071 11.5304 6 11 6ZM11 13C11.68 13 12.5 13.09 13.41 13.26L11.74 14.93L11 14.9C8.03 14.9 4.9 16.36 4.9 17V18.1H11.1L13 20H3V17C3 14.34 8.33 13 11 13Z" />
              </svg>
              <span className="text-lg font-bold">내 정보</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-nomad-black fill-nomad-black bg-green-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M17 21L14.25 18L15.41 16.84L17 18.43L20.59 14.84L21.75 16.25M12.8 21H5C3.89 21 3 20.11 3 19V5C3 3.89 3.89 3 5 3H19C20.11 3 21 3.89 21 5V12.8C20.39 12.45 19.72 12.2 19 12.08V5H5V19H12.08C12.2 19.72 12.45 20.39 12.8 21ZM12 17H7V15H12M14.68 13H7V11H17V12.08C16.15 12.22 15.37 12.54 14.68 13ZM17 9H7V7H17" />
              </svg>

              <span className="text-lg font-bold">예약 내역</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V9H19V19ZM5 7V5H19V7H5ZM10.56 17.46L16.5 11.53L15.43 10.47L10.56 15.34L8.45 13.23L7.39 14.29L10.56 17.46Z" />
              </svg>

              <span className="text-lg font-bold">내 체험 관리</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3.5 px-4 py-2.5 items-center h-11 w-full rounded-xl text-gray-700 fill-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M11.9998 8C13.0607 8 14.0781 8.42143 14.8283 9.17157C15.5784 9.92172 15.9998 10.9391 15.9998 12C15.9998 13.0609 15.5784 14.0783 14.8283 14.8284C14.0781 15.5786 13.0607 16 11.9998 16C10.939 16 9.92156 15.5786 9.17141 14.8284C8.42127 14.0783 7.99984 13.0609 7.99984 12C7.99984 10.9391 8.42127 9.92172 9.17141 9.17157C9.92156 8.42143 10.939 8 11.9998 8ZM11.9998 10C11.4694 10 10.9607 10.2107 10.5856 10.5858C10.2106 10.9609 9.99984 11.4696 9.99984 12C9.99984 12.5304 10.2106 13.0391 10.5856 13.4142C10.9607 13.7893 11.4694 14 11.9998 14C12.5303 14 13.039 13.7893 13.4141 13.4142C13.7891 13.0391 13.9998 12.5304 13.9998 12C13.9998 11.4696 13.7891 10.9609 13.4141 10.5858C13.039 10.2107 12.5303 10 11.9998 10ZM9.99984 22C9.74984 22 9.53984 21.82 9.49984 21.58L9.12984 18.93C8.49984 18.68 7.95984 18.34 7.43984 17.94L4.94984 18.95C4.72984 19.03 4.45984 18.95 4.33984 18.73L2.33984 15.27C2.20984 15.05 2.26984 14.78 2.45984 14.63L4.56984 12.97L4.49984 12L4.56984 11L2.45984 9.37C2.26984 9.22 2.20984 8.95 2.33984 8.73L4.33984 5.27C4.45984 5.05 4.72984 4.96 4.94984 5.05L7.43984 6.05C7.95984 5.66 8.49984 5.32 9.12984 5.07L9.49984 2.42C9.53984 2.18 9.74984 2 9.99984 2H13.9998C14.2498 2 14.4598 2.18 14.4998 2.42L14.8698 5.07C15.4998 5.32 16.0398 5.66 16.5598 6.05L19.0498 5.05C19.2698 4.96 19.5398 5.05 19.6598 5.27L21.6598 8.73C21.7898 8.95 21.7298 9.22 21.5398 9.37L19.4298 11L19.4998 12L19.4298 13L21.5398 14.63C21.7298 14.78 21.7898 15.05 21.6598 15.27L19.6598 18.73C19.5398 18.95 19.2698 19.04 19.0498 18.95L16.5598 17.95C16.0398 18.34 15.4998 18.68 14.8698 18.93L14.4998 21.58C14.4598 21.82 14.2498 22 13.9998 22H9.99984ZM11.2498 4L10.8798 6.61C9.67984 6.86 8.61984 7.5 7.84984 8.39L5.43984 7.35L4.68984 8.65L6.79984 10.2C6.39984 11.37 6.39984 12.64 6.79984 13.8L4.67984 15.36L5.42984 16.66L7.85984 15.62C8.62984 16.5 9.67984 17.14 10.8698 17.38L11.2398 20H12.7598L13.1298 17.39C14.3198 17.14 15.3698 16.5 16.1398 15.62L18.5698 16.66L19.3198 15.36L17.1998 13.81C17.5998 12.64 17.5998 11.37 17.1998 10.2L19.3098 8.65L18.5598 7.35L16.1498 8.39C15.3798 7.5 14.3198 6.86 13.1198 6.62L12.7498 4H11.2498Z" />
              </svg>

              <span className="text-lg font-bold">예약 현황</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
