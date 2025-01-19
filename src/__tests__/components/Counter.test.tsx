// 테스트 예시
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "@/components/Counter";

// Counter 컴포넌트의 전체적인 기능을 테스트
describe("Counter 컴포넌트", () => {
  // 초기값이 올바르게 렌더링되는지 테스트
  it("초기값이 올바르게 표시되어야 한다", () => {
    render(<Counter initialValue={5} />);
    // 화면에 숫자 5가 표시되는지 확인
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  // 증가 버튼 클릭시 동작 테스트
  it("+ 버튼 클릭시 카운트가 1 증가해야 한다", async () => {
    render(<Counter initialValue={0} />);

    // + 버튼을 클릭하는 사용자 동작 시뮬레이션
    await userEvent.click(screen.getByRole("button", { name: "+" }));
    // 카운트가 1로 증가했는지 확인
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  // 감소 버튼 클릭시 동작 테스트
  it("- 버튼 클릭시 카운트가 1 감소해야 한다", async () => {
    render(<Counter initialValue={5} />);

    // - 버튼을 클릭하는 사용자 동작 시뮬레이션
    await userEvent.click(screen.getByRole("button", { name: "-" }));
    // 카운트가 4로 감소했는지 확인
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  // 리셋 버튼 동작 테스트
  it("Reset 버튼 클릭시 초기값으로 리셋되어야 한다", async () => {
    render(<Counter initialValue={5} />);

    // 먼저 + 버튼을 클릭하여 값을 변경
    await userEvent.click(screen.getByRole("button", { name: "+" }));
    // Reset 버튼을 클릭하여 초기값으로 복원
    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    // 초기값 5로 돌아왔는지 확인
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  // 최소값과 최대값 제한 테스트
  it("최소값과 최대값 범위를 벗어나지 않아야 한다", async () => {
    render(<Counter initialValue={5} min={0} max={10} />);

    // 최대값(10) 테스트
    // 여러 번 클릭해도 최대값을 넘지 않는지 확인
    for (let i = 0; i < 10; i++) {
      await userEvent.click(screen.getByRole("button", { name: "+" }));
    }
    // 값이 최대값인 10에서 멈추는지 확인
    expect(screen.getByText("10")).toBeInTheDocument();

    // 최소값(0) 테스트
    // 여러 번 클릭해도 최소값 미만으로 내려가지 않는지 확인
    for (let i = 0; i < 15; i++) {
      await userEvent.click(screen.getByRole("button", { name: "-" }));
    }
    // 값이 최소값인 0에서 멈추는지 확인
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
