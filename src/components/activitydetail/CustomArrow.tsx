import Image from 'next/image';
import PreviousIcon from '../../../public/icons/icon-previous.svg';
import NextIcon from '../../../public/icons/icon-next.svg';

const CustomArrow = ({
  direction,
  onClick,
}: {
  direction: 'next' | 'prev';
  onClick?: () => void;
}) => (
  <button
    className={`absolute top-1/2 -translate-y-1/2 z-10 ${
      direction === 'next' ? 'right-4' : 'left-4'
    }`}
    onClick={onClick}
  >
    <Image
      src={direction === 'next' ? NextIcon : PreviousIcon}
      alt={direction === 'next' ? 'Next' : 'Previous'}
      width={24}
      height={24}
      className="cursor-pointer"
    />
  </button>
);

export default CustomArrow;
