'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { deleteActivity } from '@/lib/activitydetail/activitydetail';
import { ActivityDetailResponse } from '@/lib/activitydetail/activitydetailTypes';
import kebab from '../../../public/icons/kebab.svg';
import Check from '../../../public/icons/icon-check.svg';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { AxiosError } from 'axios';

interface ActivityKebabProps {
  activity: ActivityDetailResponse;
  onDelete: (deletedActivityId: number) => void;
}

export default function ActivityKebab({
  activity,
  onDelete,
}: ActivityKebabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 메뉴가 열려 있고, 클릭이 menuRef 또는 buttonRef 외부에서 발생한 경우에만 닫음
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEdit = () => {
    router.push(`/myPage/myactivity/${activity.id}`); // 경로 수정 필요
  };

  const handleDelete = async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await deleteActivity(activity.id, activity.userId);
      onDelete(activity.id);
      setShowDeleteModal(false);
      router.push('/myActivity'); // 경로 수정 필요
    } catch (error) {
      console.error('체험 삭제에 실패했습니다.', error);

      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 400) {
        const errorMessage = axiosError.response.data?.message;

        if (errorMessage === '신청 예약이 있는 체험은 삭제할 수 없습니다.') {
          alert('신청 예약이 있는 체험은 삭제할 수 없습니다.');
          return;
        }
      }

      alert(
        axiosError.response?.data?.message ||
          '삭제에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative" onClick={(event) => event.stopPropagation()}>
      <button ref={buttonRef} onClick={toggleMenu} className="p-2">
        <Image src={kebab} alt="Kebab Menu" width={40} height={40} />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-40 right-[8px] top-[48px] bg-white rounded-[6px] w-[160px] h-auto border-[1px] border-gray-300"
        >
          <ul className="text-center">
            <li
              className="px-[46px] py-[18px] cursor-pointer hover:bg-gray-100 text-2lg font-medium"
              onClick={handleEdit}
            >
              수정하기
            </li>
            <hr className="border-t border-gray-300" />
            <li
              className="px-[46px] py-[18px] cursor-pointer hover:bg-gray-100 text-2lg font-medium"
              onClick={() => setShowDeleteModal(true)}
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-[12px] w-[298px] h-[184px] flex flex-col items-center ">
            <Image
              src={Check}
              alt="check mark"
              width={24}
              height={24}
              className="mt-[24px]"
            />
            <p className="text-center text-lg text-nomad-black mt-[16px]">
              예약을 삭제하시겠어요?
            </p>
            <div className="flex justify-between mt-[32px] gap-[8px]">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-[80px] h-[38px] bg-white border border-nomad-black text-nomad-black text-md font-bold rounded-[6px]"
              >
                아니요
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-[80px] h-[38px] bg-nomad-black text-white text-md font-bold rounded-[6px] disabled:opacity-50"
              >
                {isDeleting ? '삭제 중' : '삭제하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
