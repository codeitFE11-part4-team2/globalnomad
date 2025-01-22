'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';

export default function ButtonTest() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button variant="nomad-black" size="medium">
        기본 버튼
      </Button>

      <Button variant="white" size="small">
        작은 버튼
      </Button>

      <Button variant="gray-600" size="large">
        큰 버튼
      </Button>

      <Button
        variant="nomad-black"
        size="medium"
        isLoading={isLoading}
        onClick={handleClick}
      >
        로딩 버튼
      </Button>

      <div className="w-full max-w-md">
        <Button size="full">전체 버튼(size=full 사용)</Button>
      </div>

      <div className="w-full max-w-md">
        <Button size="full">전체 버튼(fullWidth porp 사용)</Button>
      </div>

      <Button variant="white" size="medium" disabled>
        비활성화 버튼
      </Button>
    </div>
  );
}
