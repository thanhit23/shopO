import { ProductCart } from 'src/common/types';

import { BRAND_LIST, CATEGORY_LIST, PRODUCT_CART_LIST, UPDATE_COUNT_CART } from './constant';
import { GetBrand, GetCategory, GetProductCart, UpdateCountCart } from './types';

export const getCategoryAction = (data: []): GetCategory => ({
  type: CATEGORY_LIST,
  payload: { data },
});

export const getBrandAction = (data: []): GetBrand => ({
  type: BRAND_LIST,
  payload: { data },
});

export const getProductCartAction = (data: ProductCart[]): GetProductCart => ({
  type: PRODUCT_CART_LIST,
  payload: { data },
});

export const updateCountCartAction = (count: number): UpdateCountCart => ({
  type: UPDATE_COUNT_CART,
  payload: { count },
});
