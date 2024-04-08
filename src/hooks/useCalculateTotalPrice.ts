import { useMemo } from 'react';

import { ProductCart } from 'src/common/types';

const useCalculateTotalPrice = (productList: ProductCart[]) => {
  const totalPrice = useMemo(() => {
    const result = productList.reduce(
      (total: number, productCart: ProductCart) => total + productCart.price * productCart.quantity,
      0,
    );

    return result;
  }, [productList]);

  return totalPrice;
};

export default useCalculateTotalPrice;
