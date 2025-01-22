'use client';

import { Button } from '@/components/common/Button';
import Counter from '@/components/Counter';

export default function counterbutton() {
  return (
    <div>
      <Counter />
      <br />
      <div className="flex justify-center">
        <Button variant="white" size="small">
          버튼
        </Button>
      </div>
    </div>
  );
}
