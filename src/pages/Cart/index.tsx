import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Avatar, Box, Button, Checkbox } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { isEmpty, isEqual } from 'lodash';
import { compose } from 'redux';

import { State } from 'src/common/types';
import { ProductCart } from 'src/common/types';
import CartProductListItem from 'src/components/CartProductListItem';
import CartSummary from 'src/components/CartSummary';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { t } from 'src/libs/intl';

import store from '../../store';
import { getProductCartAction, updateCountCartAction } from '../App/actions';
import styles from './styles';

export type Props = {
  productList: ProductCart[];
};

const Cart: React.FC<Props> = ({ productList }) => {
  const [storedValue, setStoredValue] = useLocalStorage<string[]>('productCartId', []);
  const [checkedProductCart, setCheckedProductCart] = useState<string[]>(storedValue);
  const [productCartList, setProductCartList] = useState<ProductCart[]>([]);

  const deleteSuccessMessage = t('Delete successfully');

  const deleteProduct = (id: string) => {
    if (productList.length === 1) {
      localStorage.setItem('listCart', JSON.stringify([]));
      setProductCartList([]);
      store.dispatch(updateCountCartAction(0));
      toast.success(deleteSuccessMessage);
      return;
    }

    const indexProduct = productList.findIndex(product => product.productId === id);
    const productCarts: ProductCart[] = [];
    productList.map((product, index) => {
      if (index !== indexProduct) {
        productCarts.push(product);
      }
    });
    setProductCartList(productCarts);
    localStorage.setItem('listCart', JSON.stringify(productCarts));
    store.dispatch(getProductCartAction(productCarts));
    store.dispatch(updateCountCartAction(productCarts.length));
    toast.success(deleteSuccessMessage);
  };

  const handleCheck = (id: string) => {
    setCheckedProductCart(prev => {
      const isChecked = checkedProductCart.includes(id);
      if (isChecked) {
        const newProductCartId = checkedProductCart.filter(item => item !== id);

        setStoredValue(newProductCartId);
        return newProductCartId;
      } else {
        const newProductCartId = [...prev, id];

        setStoredValue(newProductCartId);
        return newProductCartId;
      }
    });
  };

  const filterProductCart = productList?.filter(product => storedValue.includes(product.productId));

  useEffect(() => {
    if (!isEmpty(productList) && isEmpty(productCartList) && !isEqual(productCartList, productList)) {
      setProductCartList(productList);
    }
  }, [productList, checkedProductCart]);

  return (
    <Container maxWidth="lg" sx={{ margin: '32px auto' }}>
      <Grid container spacing={{ xs: 3 }}>
        <Grid item xs={12}>
          {!isEmpty(productList) ? (
            productList.map((data, index) => (
              <Box key={index} display="flex" alignItems="center" gap="15px" marginBottom="1.5rem">
                <Checkbox
                  color="success"
                  checked={checkedProductCart.includes(data.productId)}
                  onChange={() => handleCheck(data.productId)}
                />
                <CartProductListItem productCart={data} onDeleteProduct={deleteProduct} />
              </Box>
            ))
          ) : (
            <Box className="title-cart-empty">
              <Avatar src="/emptyCart.png" sx={styles.boxEmptyCart} />
              <Box component="h4" sx={styles.titleEmptyCart}>
                {t('You dont have any products yet')}
              </Box>
              <Box sx={styles.boxBtnEmptyCart}>
                <Link to="/">
                  <Button type="submit" variant="contained" sx={styles.btnEmptyCart}>
                    {t('Shop now')}
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary productList={productCartList} checkedProduct={filterProductCart} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  global: {
    product: {
      cart: { list },
    },
  },
}: State) => ({
  productList: list,
});

const withConnect = connect(mapStateToProps, null);

export const Component = compose(withConnect)(Cart);
