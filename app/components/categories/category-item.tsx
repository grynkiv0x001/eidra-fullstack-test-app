'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type CategoryProps = {
  imageUrl: string;
  category: {
    id: string;
    name: string;
    image_url: string;
  };
};

export const CategoryItem = ({ category, imageUrl }: CategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get('category');
  const isSelected = selectedCategoryId === category.id;

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (isSelected) {
      params.delete('category');
    } else {
      params.set('category', category.id);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [isSelected, category.id, searchParams, router]);

  return (
    <li
      onClick={handleClick}
      className={`bg-white dark:bg-gray-800 rounded-lg border transition-colors cursor-pointer ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400'
          : 'border-black/10 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500'
      } p-3 shrink-0 flex flex-row items-start gap-3 w-[160px]`}
    >
      <span className="text-sm dark:text-gray-200 flex-1">
        {category.name}
      </span>

      <Image
        src={imageUrl}
        alt={category.name}
        width={80}
        height={80}
        className="rounded-lg object-cover shrink-0"
      />
    </li>
  );
};
