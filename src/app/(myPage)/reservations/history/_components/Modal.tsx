'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ children, title }: ModalProps) {
  const router = useRouter();

  // esc 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  // 외부 클릭 시 모달 닫기
  const handleBackGroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleBackGroundClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600"
          >
            <Image
              src={'/icons/btn_X_40px.png'}
              alt="closeBtn"
              width={40}
              height={40}
            />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
