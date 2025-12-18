import { ENDPOINTS, fetchExternal } from './api';

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export const getRestaurants = async (categoryId?: string): Promise<Restaurant[] | null> => {
  try {
    const data = await fetchExternal<{ restaurants: Restaurant[] }>(ENDPOINTS.RESTAURANTS);
    let restaurants = data.restaurants;

    if (categoryId) {
      restaurants = restaurants.filter((restaurant: Restaurant) => 
        restaurant.filter_ids.includes(categoryId),
      );
    }

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }
};

export const getRestaurant = async (id: string): Promise<Restaurant | null> => {
  try {
    const data = await fetchExternal<Restaurant>(ENDPOINTS.RESTAURANT(id));
    return data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
};

export const getDeliveryTimes = async (): Promise<number[] | null> => {
  try {
    const data = await fetchExternal<{ restaurants: Restaurant[] }>(ENDPOINTS.RESTAURANTS);

    const deliveryTimes = data.restaurants.map((item: Restaurant) => item.delivery_time_minutes);
    const uniqueDeliveryTimesSet = new Set<number>(deliveryTimes);

    return Array.from(uniqueDeliveryTimesSet).sort((a: number, b: number) => a - b);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }
};

export const getPriceRanges = async (): Promise<string[] | null> => {
  return [];
};
