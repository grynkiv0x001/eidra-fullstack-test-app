import { EXTERNAL_BASE_URL } from '@/lib/api';
import { getCategories } from '@/lib/categories';

import { CategoryItem } from './category-item';

export const Categories = async () => {
  const categories = await getCategories();

  if (!categories) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <CategoryItem key={category.id} imageUrl={`${EXTERNAL_BASE_URL}${category.image_url}`} category={category} />
        ))}
      </ul>
    </div>
  );
};
