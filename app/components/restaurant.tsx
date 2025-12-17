import Image from 'next/image';

import { EXTERNAL_BASE_URL } from '@/lib/api';
import { type Restaurant as IRestaurant } from '@/lib/restaurants';

export const Restaurant = async ({ restaurant }: { restaurant: IRestaurant }) => {
  const { name, image_url, rating, delivery_time_minutes } = restaurant;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-black/10 dark:border-white/10 p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-2">
          {rating && (
            <span className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100 whitespace-nowrap">
              Rating: <strong>{rating.toFixed(1)}</strong>
            </span>
          )}

          {delivery_time_minutes && (
            <span className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100 whitespace-nowrap">
              {delivery_time_minutes} min
            </span>
          )}

        </div>

        <div className="relative w-[140px] h-[140px] overflow-hidden rounded-lg shrink-0">
          <Image
            src={`${EXTERNAL_BASE_URL}${image_url}`}
            alt={name}
            width={140}
            height={140}
            className="w-[140px] h-[140px] object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-regular text-2xl dark:text-gray-100">{name}</h2>
      </div>
    </div>
  );
};
