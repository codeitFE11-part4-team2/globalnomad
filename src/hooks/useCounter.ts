// 테스트 예시를 위한 컴포넌트
import { useState, useCallback } from "react";

interface UseCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

export default function useCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
}: UseCounterProps = {}) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => Math.min(prev + 1, max));
  }, [max]);

  const decrement = useCallback(() => {
    setCount((prev) => Math.max(prev - 1, min));
  }, [min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
