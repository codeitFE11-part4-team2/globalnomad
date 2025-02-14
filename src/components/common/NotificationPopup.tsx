import React, { useState } from 'react';
import Image from 'next/image';
import closeIcon from '../../../public/icons/icon-close.svg';
import closeGrayIcon from '../../../public/icons/icon-close-gray.svg';
import dotIcon from '../../../public/icons/icon-dot.svg';

export interface NotificationItemProps {
  message: string;
  time: string;
  status: 'completed' | 'cancelled';
  minutesAgo: string;
}

interface NotificationPopupProps {
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItemProps[]>([
    {
      message:
        '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
      time: '2023-01-14 15:00~18:00',
      status: 'completed',
      minutesAgo: '1분 전',
    },
  ]);

  // 개별 알림 삭제 함수
  const handleDeleteNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  // 전체 알림창 닫기 함수
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onClose();
  };

  // 팝업 내부 클릭 시 이벤트 전파 방지
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handlePopupClick}
      className="absolute top-[60px] right-5 w-[368px] flex flex-col items-start p-[24px_20px] gap-4 rounded-[10px] border border-gray-400 bg-green-2 shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)] z-[1000] box-border"
    >
      <div className="flex justify-between items-center self-stretch">
        <h3 className="m-0 text-[20px] font-bold leading-[32px] text-black font-pretendard">
          알림 {notifications.length}개
        </h3>
        <button
          onClick={handleClose}
          className="bg-transparent border-0 cursor-pointer p-0"
        >
          <Image src={closeIcon} alt="close" width={24} height={24} />
        </button>
      </div>
      {notifications.length === 0 ? (
        <div className="w-[328px] h-[120px] flex items-center justify-center text-[14px] leading-[24px] text-black font-pretendard font-normal">
          새로운 알림이 없습니다.
        </div>
      ) : (
        <div className="w-[328px] flex flex-col items-start gap-1 p-[16px_12px] rounded-[5px] border border-gray-400 bg-white box-border">
          {notifications.map((notification, index) => (
            <div key={index} className="flex flex-col w-full gap-2">
              <div className="flex justify-between items-center w-full">
                <Image
                  src={dotIcon}
                  alt="notification status"
                  width={5}
                  height={5}
                  className="flex-shrink-0"
                />
                <button
                  onClick={() => handleDeleteNotification(index)}
                  className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-transparent border-0 cursor-pointer p-0"
                >
                  <Image
                    src={closeGrayIcon}
                    alt="close notification"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-[24px] text-black font-pretendard font-regular">
                  {notification.message}
                </p>
                <span className="text-[12px] leading-[18px] text-gray-600 font-pretendard font-regular">
                  {notification.minutesAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
