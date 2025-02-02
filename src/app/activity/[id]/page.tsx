'use client';

import BannerImage from '@/components/activitydetail/BannerImage';
import ReviewList from '@/components/activitydetail/Review';
import { fetchActivityDetails } from '@/lib/activitydetail/activitydetail';
import { ActivityDetailResponse } from '@/lib/activitydetail/activitydetailTypes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ActivityDetail = () => {
  const { id } = useParams();
  const activityId = Number(id);

  const [activity, setActivity] = useState<ActivityDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activityId) return;

    const loadActivity = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data: ActivityDetailResponse =
          await fetchActivityDetails(activityId);
        setActivity(data);
      } catch (error) {
        setError('에러 발생');
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!activity) return <p>데이터가 없습니다.</p>;

  return (
    <div>
      <h1>{activity.title}</h1>

      <div>
        <BannerImage
          bannerImages={activity.bannerImageUrl}
          subImages={activity.subImages}
        />
      </div>

      <div>
        <h2>체험 설명</h2>
        <p>{activity.description}</p>
      </div>

      <div>
        <ReviewList activityId={activityId} pageSize={3} />
      </div>
    </div>
  );
};

export default ActivityDetail;
