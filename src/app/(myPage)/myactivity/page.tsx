import { Button } from '@/components/common/Button';
import MyActivityCard from './_component/MyActivityCard';

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">내 체험 관리</h2>
        <Button>체험 등록하기</Button>
      </div>
      <div>
        <MyActivityCard />
      </div>
    </div>
  );
}
