// 테스트 예시를 위한 컴포넌트
"use client";

import useCounter from "@/hooks/useCounter";
import Button from "@/components/Button";

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
        <Button onClick={decrement} variant="secondary">
          -
        </Button>
        <Button onClick={increment}>+</Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}
