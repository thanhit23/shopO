import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { PostOrderDetailType, UpdateOrderType } from 'src/common/types';
import { createOrderDetail, getListOrders, updateOrder } from 'src/pages/admin/Orders/httpClient';

import { UserEditForm } from '../../pages/admin/Orders/OrderList/ModalEdit';

export const useGetListOrder = <T = any>(params?: number, options: UseQueryOptions<any, unknown, T> = {}) =>
  useQuery({
    queryKey: ['getListOrder/admin', params],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const {
        data: { status, data, meta },
      } = await getListOrders(params);

      return { status, data, meta };
    },
    ...options,
  });

export const useCreateOrderDetail = (options: UseMutationOptions<any, unknown, PostOrderDetailType> = {}) =>
  useMutation({
    mutationFn: variables => createOrderDetail(variables),
    ...options,
  });

export const useUpdateOrder = (options: UseMutationOptions<any, unknown, UserEditForm> = {}) =>
  useMutation({
    mutationFn: variables => updateOrder(variables),
    ...options,
  });
