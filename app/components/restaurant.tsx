import Image from 'next/image';

import { EXTERNAL_BASE_URL } from '@/lib/api';
import { type Restaurant as IRestaurant } from '@/lib/restaurants';

export const Restaurant = async ({ restaurant }: { restaurant: IRestaurant }) => {
  const { name, image_url } = restaurant;

  return (
    <div>
      <div>
        <Image src={`${EXTERNAL_BASE_URL}${image_url}`} alt={name} width={100} height={100} />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  );
};
