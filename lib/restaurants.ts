import { ENDPOINTS } from './api';

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export async function getRestaurants(): Promise<Restaurant[] | null> {
  try {
    const response = await fetch(ENDPOINTS.RESTAURANTS, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.status}`);
    }

    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }
}

export async function getRestaurant(id: string): Promise<Restaurant | null> {
  try {
    const response = await fetch(ENDPOINTS.RESTAURANT(id), {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurant: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
}

export async function getDeliveryTimes(): Promise<number[] | null> {
  try {
    const response = await fetch(ENDPOINTS.RESTAURANTS, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.status}`);
    }

    const data = await response.json();

    const deliveryTimes = data.restaurants.map((item: Restaurant) => item.delivery_time_minutes);
    const uniqueDeliveryTimesSet = new Set<number>(deliveryTimes);

    return Array.from(uniqueDeliveryTimesSet).sort((a: number, b: number) => a - b);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }
}

export async function getPriceRanges() {
  try {
    const response = await fetch(ENDPOINTS.RESTAURANTS, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Error fetching price ranges:', error);
    return null;
  }
}
