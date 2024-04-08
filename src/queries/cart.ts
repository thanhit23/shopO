import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { updateQuantityProductCart } from 'src/api/cart';
import { UpdateQuantityProduct } from 'src/common/types';

export const useUpdateQuantityProduct = (options: UseMutationOptions<any, unknown, UpdateQuantityProduct> = {}) =>
  useMutation({
    mutationFn: variables => updateQuantityProductCart(variables),
    ...options,
  });
