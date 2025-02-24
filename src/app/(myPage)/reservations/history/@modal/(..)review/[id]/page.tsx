'use client';

import { Button } from '@/components/common/Button';
import { use, useEffect } from 'react';
import Modal from '../../../_components/Modal';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useReservationReview } from '@/services/ReservationHistory';

interface ReviewModalProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ReviewModal({ params }: ReviewModalProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const searchParams = useSearchParams();
  const { id } = use(params);

  const [reservationInfo, setReservationInfo] = useState<{
    id: string;
    title: string;
    date: string;
    time: string;
    headCount: number;
    imageUrl: string;
    price: number;
  } | null>(null);

  // 리뷰 작성 mutation
  const { mutate: submitReview, isPending: isSubmitting } =
    useReservationReview();

  useEffect(() => {
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
    }
  }, [id, searchParams]);

  if (!reservationInfo) {
    return <Modal title="후기 작성">Loading...</Modal>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    submitReview(
      {
        reservationId: parseInt(id),
        reviewData: {
          rating,
          content: content.trim(),
        },
      },
      {
        onSuccess: () => {
          router.back();
        },
        onError: (error: any) => {
          alert(error.message);
        },
      }
    );
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
                <img
                  src={
                    rating >= value
                      ? '/icons/icon_star_on.svg'
                      : '/icons/icon_star_off.svg'
                  }
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
