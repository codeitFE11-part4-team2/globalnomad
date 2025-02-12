import React from 'react';
import { Button } from '../common/Button';

interface ConfirmationModalProps {
  onClose: () => void;
}

const ConfirmationModal = ({ onClose }: ConfirmationModalProps) => {
  return (
    <div>
      <div>
        <p>예약이 완료되었습니다.</p>
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
