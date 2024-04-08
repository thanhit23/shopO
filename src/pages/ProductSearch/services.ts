import Service from 'src/service';

export interface FilterProducts {
  name: string | null;
  price_min: string;
  price_max: string;
  brand: string | null;
  category: string | null;
  page: number;
  best_selling: boolean;
}

export const getFilterProducts = (params: FilterProducts) => Service.get('/v1/products?limit=9', params);
