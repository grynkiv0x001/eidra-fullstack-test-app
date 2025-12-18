import { ENDPOINTS, fetchExternal } from './api';

interface Category {
  id: string;
  name: string;
  image_url: string;
}

export const getCategories = async (): Promise<Category[] | null> => {
  try {
    const data = await fetchExternal<{ filters: Category[] }>(ENDPOINTS.FILTERS);

    return data.filters;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};
