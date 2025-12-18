import { getRestaurants } from '@/lib/restaurants';

import { Restaurant } from '@/app/components';

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const categoryId = params?.category;
  const restaurants = await getRestaurants(categoryId);

  if (!restaurants) {
    return <p className="text-red-500">Failed to load restaurants</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
