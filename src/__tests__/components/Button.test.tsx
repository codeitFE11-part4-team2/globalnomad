// 테스트 예시
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";

// Button 컴포넌트에 대한 테스트 그룹을 정의
describe("Button 컴포넌트", () => {
  // 버튼 텍스트가 올바르게 렌더링되는지 테스트
  it("버튼에 전달된 텍스트가 올바르게 표시되어야 한다", () => {
    render(<Button>Click me</Button>);
    // screen.getByRole은 접근성을 고려한 쿼리 메서드
    // name 옵션은 버튼의 텍스트 콘텐츠를 지정
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  // 버튼의 variant prop에 따라 올바른 스타일이 적용되는지 테스트
  it("variant prop에 따라 올바른 스타일 클래스가 적용되어야 한다", () => {
    // rerender를 사용하면 같은 컴포넌트를 다른 props로 다시 렌더링할 수 있다
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-blue-500");

    // 다른 variant로 다시 렌더링
    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-gray-200");
  });

  // 버튼의 size prop에 따라 올바른 크기 스타일이 적용되는지 테스트
  it("size prop에 따라 올바른 크기 클래스가 적용되어야 한다", () => {
    const { rerender } = render(<Button size="sm">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-3 py-1.5 text-sm");

    rerender(<Button size="lg">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-6 py-3 text-lg");
  });

  // 클릭 이벤트가 올바르게 작동하는지 테스트
  it("클릭 이벤트가 발생하면 onClick 핸들러가 호출되어야 한다", async () => {
    // jest.fn()은 모의 함수(mock function)를 생성
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // 사용자의 클릭 동작을 시뮬레이션
    await userEvent.click(screen.getByRole("button"));
    // 클릭 핸들러가 한 번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
