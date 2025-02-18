import React from 'react';
import { Button } from '../common/Button';

interface ConfirmationModalProps {
  onClose: () => void;
}

const ConfirmationModal = ({ onClose }: ConfirmationModalProps) => {
  return (
    <div>
      <p className="text-2lg font-medium pt-[108px]">예약이 완료되었습니다.</p>
      <div className="flex justify-end pt-[40px] pr-[28px]">
        <Button onClick={onClose} className="w-[120px] h-[48px]">
          확인
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
