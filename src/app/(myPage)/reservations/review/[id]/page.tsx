'use client';

import { Button } from '@/components/common/Button';
import { use, useEffect } from 'react';
import Modal from '../../history/_components/Modal';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { mockReservationResponse } from '@/lib/reservations/mockData';
import starOnIcon from '@/../public/icons/Icon_star_on.png';
import starOffIcon from '@/../public/icons/Icon_star_off.png';

interface ReviewModalProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ReviewModal({ params }: ReviewModalProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationInfo, setReservationInfo] = useState<{
    id: string;
    title: string;
    date: string;
    time: string;
    headCount: number;
    imageUrl: string;
    price: number;
  } | null>(null);

  const searchParams = useSearchParams();

  const { id } = use(params);

  useEffect(() => {
    // 비동기 처리를 try-catch로 감싸서 에러 처리
    try {
      if (searchParams.get('title')) {
        setReservationInfo({
          id,
          title: searchParams.get('title') || '',
          date: searchParams.get('date') || '',
          time: searchParams.get('time') || '',
          headCount: Number(searchParams.get('headCount')) || 0,
          imageUrl: searchParams.get('imageUrl') || '',
          price: Number(searchParams.get('price')) || 0,
        });
      } else {
        const { reservations } = mockReservationResponse;
        const reservation = reservations.find((r) => r.id === parseInt(id));
        if (reservation) {
          setReservationInfo({
            id,
            title: reservation.activity.title,
            date: reservation.date,
            time: `${reservation.startTime}-${reservation.endTime}`,
            headCount: reservation.headCount,
            imageUrl: reservation.activity.bannerImageUrl,
            price: reservation.totalPrice,
          });
        }
      }
    } catch (error) {
      console.error('Error loading reservation info:', error);
      // 에러 발생 시 처리
      router.push('/reservations/history');
    }
  }, [id, searchParams, router]);

  if (!reservationInfo) {
    return <Modal title="후기 작성">Loading...</Modal>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API 통신 시뮬레이션
    setTimeout(() => {
      console.log('제출된 데이터:', {
        reservationId: id,
        rating,
        content,
      });

      setIsSubmitting(false);
      router.back();
    }, 1000);
  };

  return (
    <Modal title="후기 작성">
      <div className="mb-6 flex gap-4 p-4 rounded-lg">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={reservationInfo.imageUrl || ''}
            alt={reservationInfo.title || ''}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="border-b pb-2">
            <h3 className="font-bold text-xl mb-2">{reservationInfo.title}</h3>
            <p className=" font-regular text-2lg mb-1">
              {reservationInfo.date} · {reservationInfo.time} ·{' '}
              {reservationInfo.headCount}명
            </p>
          </div>
          <p className="text-3xl font-bold pt-2">
            ￦{reservationInfo.price?.toLocaleString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="w-12 h-12 flex items-center justify-center transition-colors"
              >
                <Image
                  src={rating >= value ? starOnIcon : starOffIcon}
                  alt={`별점 ${value}점`}
                  width={56}
                  height={56}
                  className="w-14 h-14"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-nomad-black"
            placeholder="체험은 어떠셨나요? 솔직한 후기를 남겨주세요."
            required
          />
        </div>

        <div className="flex">
          <Button
            type="submit"
            variant="nomad-black"
            size="full"
            isLoading={isSubmitting}
            disabled={isSubmitting || !content.trim()}
          >
            작성하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
