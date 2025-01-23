'use client';

import { useState } from 'react';

import Footer from '@/components/common/Footer';
import Category from '@/components/ui/Category';
import Filter from '@/components/ui/Filter';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // TODO : 여기서 선택된 카테고리에 따라 리스트를 필터링
  };

  return (
    <div>
      <Category onSelectCategory={handleCategorySelect} />
      <Filter
        onFilterChange={(filter) => {
          // TODO : 선택된 필터 값으로 정렬
        }}
      />
      <Footer />
    </div>
  );
}
