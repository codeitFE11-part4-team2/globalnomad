import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/common/Button';

describe('Button 컴포넌트', () => {
  // 기본 렌더링 테스트
  it('버튼에 전달된 텍스트가 올바르게 표시되어야 한다', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  // variant 스타일 테스트
  it('variant prop에 따라 올바른 스타일 클래스가 적용되어야 한다', () => {
    const { rerender } = render(<Button variant="nomad-black">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-black text-white');

    rerender(<Button variant="white">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-white text-black border border-gray-200'
    );

    rerender(<Button variant="gray-600">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600 text-white');
  });

  // 크기 스타일 테스트
  it('size prop에 따라 올바른 크기 클래스가 적용되어야 한다', () => {
    const { rerender } = render(<Button size="small">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'w-[108px] h-[38px] text-sm'
    );

    rerender(<Button size="medium">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'w-[144px] h-[48px] text-base'
    );

    rerender(<Button size="large">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'w-[350px] h-[48px] text-base'
    );
  });

  // 클릭 이벤트 테스트
  it('클릭 이벤트가 발생하면 onClick 핸들러가 호출되어야 한다', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // disabled 상태 테스트
  it('disabled 상태일 때 클릭이 불가능해야 한다', async () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // 로딩 상태 테스트
  it('로딩 상태일 때 스피너가 표시되고 버튼이 비활성화되어야 한다', () => {
    render(<Button isLoading>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument(); // Spinner 컴포넌트 확인
    expect(button).not.toHaveTextContent('Click me'); // 텍스트가 보이지 않아야 함
  });

  // 추가 클래스 테스트
  it('className prop이 전달되면 추가 클래스가 적용되어야 한다', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  // 기본 스타일 테스트
  it('모든 버튼에 기본 스타일이 적용되어야 한다', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'rounded-lg'
    );
  });
});
