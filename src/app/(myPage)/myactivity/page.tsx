import { Button } from '@/components/common/Button';
import MyActivityCard from './_component/MyActivityCard';
import CardModal from './_component/CardModal';

export default function Page() {
  /**임시로 사용할 데이터 */
  const mockActivities = [
    {
      id: 1,
      bannerImageUrl: '/icons/testimg.png',
      rating: 1.3,
      reviewCount: 293,
      title: '테스트용 제목1',
      price: 1000,
    },
    {
      id: 2,
      bannerImageUrl: '/icons/testimg2.png',
      rating: 2.8,
      reviewCount: 150,
      title: '테스트용 제목2',
      price: 15000,
    },
    {
      id: 3,
      bannerImageUrl: '/icons/testimg3.png',
      rating: 5.0,
      reviewCount: 87,
      title: '테스트용 제목3',
      price: 20000,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">내 체험 관리</h2>
        <Button>체험 등록하기</Button>
      </div>
      <div className="flex flex-col gap-4">
        {mockActivities.map((item) => (
          <MyActivityCard key={item.id} {...item} />
        ))}
      </div>
      <CardModal />
    </div>
  );
}
