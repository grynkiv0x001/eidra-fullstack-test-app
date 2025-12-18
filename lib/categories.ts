import { ENDPOINTS, getFetchHeaders } from './api';

interface Category {
  id: string;
  name: string;
  image_url: string;
}

export const getCategories = async (): Promise<Category[] | null> => {
  try {
    const response = await fetch(ENDPOINTS.FILTERS, {
      cache: 'no-store',
      headers: await getFetchHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();

    return data.filters as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};