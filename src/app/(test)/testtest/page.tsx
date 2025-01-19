'use client';

import Button from '@/components/Button';
import Counter from '@/components/Counter';

export default function counterbutton() {
  return (
    <div>
      <Counter />
      <br />
      <div className="flex justify-center">
        <Button />
      </div>
    </div>
  );
}
