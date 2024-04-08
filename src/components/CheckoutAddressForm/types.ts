import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { PostOrderDetailType, PostOrderType, ProductCart } from 'src/common/types';

export interface Props {
  form: any;
  productList: ProductCart[];
  onCreateOrder: UseMutationResult<AxiosResponse<any, any>, unknown, PostOrderType, unknown>;
  onCreateOrderDetail: UseMutationResult<AxiosResponse<any, any>, unknown, PostOrderDetailType, unknown>;
}
