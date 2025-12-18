import { cookies, headers } from 'next/headers';

export const EXTERNAL_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
export const EXTERNAL_API_BASE_URL = `${EXTERNAL_BASE_URL}/api`;

export const getBaseUrl = (): string => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';

  return `${protocol}://${host}/api`;
};

export const getFetchHeaders = async (): Promise<HeadersInit> => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  return {
    cookie: cookieStore.toString(),
    authorization: headerStore.get('authorization') ?? '',
  };
};

export const ENDPOINTS = {
  RESTAURANTS: 'api/restaurants',
  RESTAURANT: (id: string) => `api/restaurants/${id}`,
  FILTERS: 'api/filter',
  FILTER: (id: string) => `api/filter/${id}`,
  OPEN: (id: string) => `api/open/${id}`,
  PRICE_RANGE: (id: string) => `api/price-range/${id}`,
};
