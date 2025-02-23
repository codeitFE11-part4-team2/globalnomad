'use client';

import BannerImage from '@/components/activitydetail/BannerImage';
import ReviewList from '@/components/activitydetail/Review';
import { fetchActivityDetails } from '@/lib/activitydetail/activitydetail';
import { ActivityDetailResponse } from '@/lib/activitydetail/activitydetailTypes';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StarIcon from '../../../../public/icons/icon-star.svg';
import Location from '../../../../public/icons/icon-location.svg';
import Reservation from '@/components/activitydetail/Reservation';
import KakaoMap from '@/components/activitydetail/KakaoMap';
import ActivityKebab from '@/components/activitydetail/ActivityKebab';
import { useAuthStore } from '@/store';
import Footer from '@/components/common/Footer';

const ActivityDetail = () => {
  const { id } = useParams();
  const activityId = Number(id);

  const [activity, setActivity] = useState<ActivityDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!activityId) return;

    const loadActivity = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data: ActivityDetailResponse =
          await fetchActivityDetails(activityId);

        console.log('Fetched Activity Data:', data);
        setActivity(data);
      } catch (error) {
        setError('에러 발생');
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id]);

  // 체험 삭제 핸들러
  const handleDelete = (deletedActivityId: number) => {
    setActivity((prevActivity) =>
      prevActivity?.id === deletedActivityId ? null : prevActivity
    );
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!activity) return <p>데이터가 없습니다.</p>;

  return (
    <div className="relative bg-gray-100">
      <div className="flex justify-center mx-auto px-[24px]">
        <div className="w-full max-w-[1200px] flex flex-col">
          <div>
            <p className="text-md font-regular lg:mt-[78px] md:mt-[24px] mt-[16px] opacity-75 px-[24px] lg:px-0">
              {activity.category}
            </p>
            <div className="w-full max-w-[1200px] flex justify-between items-center">
              <p className="md:text-3xl text-2xl font-bold px-[24px] lg:px-0">
                {activity.title}
              </p>
              {user && user.id === activity.userId && (
                <ActivityKebab activity={activity} onDelete={handleDelete} />
              )}
            </div>
            <div className="flex items-center justify-start mt-[16px] px-[24px] lg:px-0 gap-[12px]">
              <div className="flex items-center space-x-[2px]">
                <Image src={StarIcon} alt="별점" width={16} height={16} />
                <p className="text-md font-regular">
                  {(activity.rating || 0).toFixed(1)}
                </p>
                <p className="text-md font-regular">({activity.reviewCount})</p>
              </div>
              <div className="flex items-center">
                <Image src={Location} alt="위치" width={18} height={18} />
                <p className="text-md font-regular opacity-75">
                  {activity.address}
                </p>
              </div>
            </div>

            <div>
              <div className="lg:mt-[24px] md:mt-[15px] mt-0 md:px-[24px] lg:px-0">
                <BannerImage
                  bannerImages={activity.bannerImageUrl}
                  subImages={activity.subImages}
                />
              </div>
            </div>

            <div className="w-full lg:max-w-[1200px] md:max-w-[696px] flex flex-row justify-between lg:gap-[24px]">
              <div className="w-full">
                <div className="lg:mt-[85px] md:mt-[32px] mt-0">
                  <hr className="hidden md:block border-t-[1px] border-nomad-black opacity-25" />
                  <p className="text-xl font-bold md:mt-[40px] mt-[15px] px-[24px] lg:px-0">
                    체험 설명
                  </p>
                  <p className="text-lg font-regular mt-[16px] px-[24px] lg:px-0">
                    {activity.description}
                  </p>
                  <hr className="border-t-[1px] border-nomad-black opacity-25 lg:mt-[34px] md:mt-[57px] mt-[16px]" />
                </div>

                <div className="md:mt-[40px] mt-[16px] lg:mb-[40px] md:mb-[42px] mb-0 px-[24px] lg:px-0">
                  <KakaoMap address={activity.address} />
                </div>

                <div className="md:mt-[41px] mt-[40px] lg:mb-[293px] md:mb-[145px] mb-[133px]">
                  <hr className="hidden md:block border-t-[1px] border-nomad-black opacity-25 md:mb-[40px] mb-0" />
                  <ReviewList activityId={activityId} pageSize={3} />
                </div>
              </div>

              <div className="lg:mt-[85px] md:mt-[32px] mt-[16px]">
                <Reservation activity={activity} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:mb-0 mb-[83px]">
        <Footer />
      </div>
    </div>
  );
};

export default ActivityDetail;
