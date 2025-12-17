import { getRestaurants } from '@/lib/restaurants';

import { Restaurant } from '@/app/components';

export default async function Home() {
  const restaurants = await getRestaurants();

  if (!restaurants) {
    return <p className="text-red-500">Failed to load restaurants</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants?.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
