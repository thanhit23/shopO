import { UseMutationResult } from '@tanstack/react-query';

import { UpdateOrderType } from 'src/common/types';
import { OrderDetailType } from 'src/pages/Order/types';

export type Props = {
  orderDetail: OrderDetailType;
  notCancel?: boolean;
  onUpdateOrder?: UseMutationResult<any, unknown, UpdateOrderType, unknown>;
};
