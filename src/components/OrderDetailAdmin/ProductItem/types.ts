import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { OrderDetailProduct } from 'src/pages/Order/types';

export type Props = {
  product: OrderDetailProduct;
  onReviewProduct: UseMutationResult<AxiosResponse<any, any>, unknown, object, unknown>;
};
