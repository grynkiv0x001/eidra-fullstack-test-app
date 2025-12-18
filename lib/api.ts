import { cache } from './cache';

export const EXTERNAL_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
export const EXTERNAL_API_BASE_URL = `${EXTERNAL_BASE_URL}/api`;

export const ENDPOINTS = {
  RESTAURANTS: 'restaurants',
  RESTAURANT: (id: string) => `restaurants/${id}`,
  FILTERS: 'filter',
  FILTER: (id: string) => `filter/${id}`,
  OPEN: (id: string) => `open/${id}`,
  PRICE_RANGE: (id: string) => `price-range/${id}`,
};

export async function fetchExternal<T>(path: string): Promise<T> {
  const cachedData = cache.get<T>(path);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(`${EXTERNAL_API_BASE_URL}/${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`External API error: ${response.status}`);
  }

  const data = await response.json();

  cache.set(path, data);

  return data;
}
