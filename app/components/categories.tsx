import Image from 'next/image';

import { EXTERNAL_BASE_URL } from '@/lib/api';
import { getCategories } from '@/lib/categories';

export const Categories = async () => {
  const categories = await getCategories();

  if (!categories) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-black/10 dark:border-white/10 p-3 shrink-0 flex flex-row items-start gap-3 w-[160px]"
          >
            <span className="text-sm dark:text-gray-200 flex-1">
              {category.name}
            </span>

            <Image
              src={`${EXTERNAL_BASE_URL}${category.image_url}`}
              alt={category.name}
              width={80}
              height={80}
              className="rounded-lg object-cover shrink-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
