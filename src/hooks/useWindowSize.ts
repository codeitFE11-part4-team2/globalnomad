import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  isMobile: boolean;
}

export function useWindowSize(breakpoint: number = 1440): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile:
      typeof window !== 'undefined' ? window.innerWidth < breakpoint : false,
  });

  useEffect(() => {
    // 창 크기 변경 핸들러
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({
        width,
        isMobile: width < breakpoint,
      });
    };

    // 초기값 설정 및 이벤트 리스너 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    // 클린업: 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return windowSize;
}
