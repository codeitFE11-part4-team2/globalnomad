'use client';

import useCounter from '@/hooks/useCounter';
import { Button } from './common/Button';

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

export default function Counter({ initialValue, min, max }: CounterProps) {
  const { count, increment, decrement, reset } = useCounter({
    initialValue,
    min,
    max,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">{count}</div>
      <div className="flex gap-2">
        <Button onClick={decrement} variant="white" size="small">
          -
        </Button>
        <Button onClick={increment} variant="nomad-black" size="small">
          +
        </Button>
        <Button onClick={reset} variant="gray-600" size="small">
          Reset
        </Button>
      </div>
    </div>
  );
}
