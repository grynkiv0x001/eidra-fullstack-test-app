import Image from 'next/image';

import { EXTERNAL_BASE_URL } from '@/lib/api';
import { getCategories } from '@/lib/categories';

export const Categories = async () => {
  const categories = await getCategories();

  if (!categories) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <Image src={`${EXTERNAL_BASE_URL}${category.image_url}`} alt={category.name} width={100} height={100} />
        </li>
      ))}
    </ul>
  );
};
