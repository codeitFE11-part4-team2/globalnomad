import React, { useState } from 'react';
import Image from 'next/image';
import closeIcon from '../../../public/icons/icon-close.svg';
import closeGrayIcon from '../../../public/icons/icon-close-gray.svg';
import dotIcon from '../../../public/icons/icon-dot.svg';
import {
  getFlattedNotifications,
  useDeleteNotification,
  useNotifications,
} from '@/services/Notification';

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
  // const [notifications, setNotifications] = useState<NotificationItemProps[]>([
  //   {
  //     message:
  //       '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
  //     time: '2023-01-14 15:00~18:00',
  //     status: 'completed',
  //     minutesAgo: '1분 전',
  //   },
  // ]);

  // // 개별 알림 삭제 함수
  // const handleDeleteNotification = (index: number) => {
  //   setNotifications((prev) => prev.filter((_, i) => i !== index));
  // };

  // 알림 조회 훅 사용
  const { data, fetchNextPage, hasNextPage } = useNotifications();

  // 스크롤 이벤트 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage) {
      fetchNextPage();
    }
  };

  // 알림 삭제 훅 사용
  const { mutate: deleteNotification } = useDeleteNotification();

  // 전체 알림 목록 가져오기
  const notifications = getFlattedNotifications(data?.pages);

  // 개별 알림 삭제 함수
  const handleDeleteNotification = (notificationId: number) => {
    deleteNotification(notificationId);
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
      className="fixed md:absolute md:top-[60px] md:right-[50%] md:translate-x-[-90%] md:w-[368px] md:h-[356px] top-0 left-0 w-full h-full flex flex-col items-start p-[24px_20px] gap-4 md:rounded-[10px] border border-gray-400 bg-green-2 shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)] z-[1000] box-border"
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
        <div 
          className="w-[328px] flex flex-col items-start gap-2 overflow-y-auto md:max-h-[250px] h-full pr-2"
          onScroll={handleScroll}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col w-full p-3 bg-white rounded-[5px] border border-gray-400"
            >
              <div className="flex justify-between items-start w-full gap-2">
                <div className="flex items-start gap-2">
                  <svg
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mt-2"
                  >
                    <circle
                      cx="2.5"
                      cy="2.5"
                      r="2.5"
                      fill={
                        notification.content.includes('거절')
                          ? '#FF472E'
                          : '#0085FF'
                      }
                    />
                  </svg>
                </div>
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-transparent border-0 cursor-pointer p-0"
                >
                  <Image
                    src={closeGrayIcon}
                    alt="close"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-[24px] text-black font-pretendard font-regular">
                  {notification.content
                    .split(/(?=승인|거절)/)
                    .map((part, index) => {
                      if (part.startsWith('승인')) {
                        return (
                          <React.Fragment key={index}>
                            <span className="text-blue-3">승인</span>
                            {part.slice(2)}
                          </React.Fragment>
                        );
                      }
                      if (part.startsWith('거절')) {
                        return (
                          <React.Fragment key={index}>
                            <span className="text-red-3">거절</span>
                            {part.slice(2)}
                          </React.Fragment>
                        );
                      }
                      return (
                        <React.Fragment key={index}>{part}</React.Fragment>
                      );
                    })}
                </p>
                <span className="text-[12px] leading-[18px] text-gray-600 font-pretendard font-regular">
                  {/* 임시로 시간 표시 - 실제 데이터에 맞게 수정 필요(createdAt, updatedAt 활용) */}
                  1분 전
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
