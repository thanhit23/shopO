import { ProductCart } from 'src/common/types';

import { BRAND_LIST, CATEGORY_LIST, PRODUCT_CART_LIST, UPDATE_COUNT_CART } from './constant';

export interface CategoryListPayload {
  data: [];
}

export interface ProductCartListPayload {
  data: ProductCart[];
}

export interface UpdateCountCartPayload {
  count: number;
}

export interface GetCategory {
  type: typeof CATEGORY_LIST;
  payload: CategoryListPayload;
}

export interface GetBrand {
  type: typeof BRAND_LIST;
  payload: CategoryListPayload;
}

export interface GetProductCart {
  type: typeof PRODUCT_CART_LIST;
  payload: ProductCartListPayload;
}

export interface UpdateCountCart {
  type: typeof UPDATE_COUNT_CART;
  payload: UpdateCountCartPayload;
}
