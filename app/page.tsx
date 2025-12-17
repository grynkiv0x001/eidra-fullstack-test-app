import { getRestaurants } from '@/lib/restaurants';

import { Restaurant } from '@/app/components';

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {restaurants?.map((restaurant) => (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      ))}
    </main>
  );
}
