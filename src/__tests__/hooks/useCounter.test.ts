// 테스트 예시
import { renderHook, act } from "@testing-library/react";
import useCounter from "@/hooks/useCounter";

// useCounter Hook에 대한 테스트
describe("useCounter Hook", () => {
  // Hook이 기본값으로 초기화되는지 테스트
  it("초기값을 지정하지 않으면 0으로 시작해야 한다", () => {
    // renderHook을 사용하여 Hook을 렌더링하고 결과를 받아옴
    const { result } = renderHook(() => useCounter());
    // count가 0으로 초기화되었는지 확인
    expect(result.current.count).toBe(0);
  });

  // Hook이 주어진 초기값으로 초기화되는지 테스트
  it("지정한 초기값으로 시작해야 한다", () => {
    // initialValue로 10을 전달하여 Hook 렌더링
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    expect(result.current.count).toBe(10);
  });

  // increment 함수 동작 테스트
  it("increment 함수 호출시 카운트가 1 증가해야 한다", () => {
    const { result } = renderHook(() => useCounter());

    // act를 사용하여 상태 변경 함수를 실행
    // act는 React의 상태 업데이트를 동기적으로 처리
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  // 최대값 제한 테스트
  it("최대값(max)을 초과하여 증가할 수 없다", () => {
    // max값을 5로 설정하여 Hook 렌더링
    const { result } = renderHook(() => useCounter({ max: 5 }));

    // 여러 번 increment를 호출해도 max값을 넘지 않는지 확인
    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.increment();
      });
    }

    expect(result.current.count).toBe(5);
  });

  // decrement 함수 동작 테스트
  it("decrement 함수 호출시 카운트가 1 감소해야 한다", () => {
    // initialValue를 5로 설정하여 시작
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  // 최소값 제한 테스트
  it("최소값(min)보다 작게 감소할 수 없다", () => {
    // min값을 0으로 설정하여 Hook 렌더링
    const { result } = renderHook(() => useCounter({ min: 0 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  // reset 함수 동작 테스트
  it("reset 함수 호출시 초기값으로 리셋되어야 한다", () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    // 값을 변경한 후 reset 호출
    act(() => {
      result.current.increment(); // 6
      result.current.increment(); // 7
      result.current.reset(); // 다시 5로
    });

    expect(result.current.count).toBe(5);
  });
});
