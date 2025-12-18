import { getRestaurant } from '@/lib/restaurants';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const restaurant = await getRestaurant(id);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-4xl font-regular">{restaurant?.name}</h1>
    </div>
  );
};
