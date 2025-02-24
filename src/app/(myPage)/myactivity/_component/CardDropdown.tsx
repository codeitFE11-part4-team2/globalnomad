import { useRef, useEffect } from 'react';

interface DropdownMenuProps {
  activityId: number;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CardDropdown({
  activityId,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute font-medium text-gray-900 text-lg lg:text-2lg right-0 w-28 md:w-32 lg:w-40 bg-white rounded-lg shadow-sm border border-gray-200 z-50 flex flex-col items-center"
    >
      <button
        className="w-full py-2 md:py-3 lg:py-4 hover:bg-gray-100 flex justify-center"
        onClick={() => onEdit(activityId)}
      >
        수정하기
      </button>
      <div className="w-full h-px bg-gray-200"></div>
      <button
        className="w-full py-2 md:py-3 lg:py-4 hover:bg-gray-100 flex justify-center "
        onClick={() => onDelete(activityId)}
      >
        삭제하기
      </button>
    </div>
  );
}
