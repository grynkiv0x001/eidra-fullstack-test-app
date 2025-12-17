export const EXTERNAL_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
export const EXTERNAL_API_BASE_URL = `${EXTERNAL_BASE_URL}/api`;

export function getBaseUrl(): string {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  return `${protocol}://${host}/api`;
}

export const BASE_URL = getBaseUrl();

export const ENDPOINTS = {
  RESTAURANTS: `${BASE_URL}/restaurants`,
  RESTAURANT: (id: string) => `${ENDPOINTS.RESTAURANTS}/${id}`,
  FILTERS: `${BASE_URL}/filter`,
  FILTER: (id: string) => `${ENDPOINTS.FILTERS}/${id}`,
  OPEN: (id: string) => `${BASE_URL}/open`,
  PRICE_RANGE: (id: string) => `${BASE_URL}/price-range`,
};
