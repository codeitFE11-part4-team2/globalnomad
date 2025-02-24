import { modalStore } from '@/store/modalStore';
import { useRouter } from 'next/navigation';

export default function ActivityCompleteModal() {
  const { isOpen, closeModal } = modalStore();
  const router = useRouter();

  const handleConfirm = () => {
    closeModal('activitycomplete');
    router.push('/myactivity');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex h-[220px] w-[327px] flex-col items-center rounded-[8px] bg-white pt-[72px] sm:h-[250px] sm:w-[540px]  sm:pt-[88px]">
        <p className="text-[#333236] text-center font-pretendard text-[18px] font-medium leading-[26px]">
          체험 등록이 완료되었습니다
        </p>
        <button
          type="button"
          className="absolute bottom-[28px] flex h-[48px] w-[120px] items-center justify-center gap-[10px] rounded-[8px] bg-[#121] px-[46px] py-[14px] text-center font-pretendard text-[16px] font-medium leading-[26px] text-white sm:right-[28px]"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
}
