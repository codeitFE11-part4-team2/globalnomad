import { useState } from 'react';

interface CategoryItem {
  id: number;
  title: string;
}

const categories: CategoryItem[] = [
  { id: 1, title: '전체' },
  { id: 2, title: '문화 · 예술' },
  { id: 3, title: '식음료' },
  { id: 4, title: '스포츠' },
  { id: 5, title: '투어' },
  { id: 6, title: '관광' },
  { id: 7, title: '웰빙' },
];

interface CategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Category({
  selectedCategory,
  onSelectCategory,
}: CategoryProps) {
  const handleCategoryClick = (title: string) => {
    onSelectCategory(title);
  };

  return (
    <div className="flex w-[882px] overflow-x-auto scrollbar-hide justify-start gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.title)}
          className={`
            w-[80px] lg:w-[127px] md:w-[120px] lg:h-[58px] md:h-[58px] h-[41px] px-[30px] py-4
            flex justify-center items-center
            rounded-[15px] transition-all duration-300
            lg:text-2lg md:text-2lg text-lg font-medium leading-[26px]
            ${
              selectedCategory === category.title
                ? 'bg-green-3 text-white hover:bg-green-4'
                : 'bg-white text-green-3 border border-green-3 hover:bg-green-2'
            }
          `}
        >
          <span className="text-center whitespace-nowrap">
            {category.title}
          </span>
        </button>
      ))}
    </div>
  );
}
