import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { isEmpty } from 'lodash';
import { compose } from 'redux';

import { Product, ProductCart, State } from 'src/common/types';
import QuantityButton from 'src/components/QuantityButton';
import formatterPrice from 'src/helpers/formatPrice';
import { t } from 'src/libs/intl';
import { updateCountCartAction } from 'src/pages/App/actions';
import store from 'src/store';

import styles from '../styles';

type Props = {
  product?: Product;
  productList?: ProductCart[];
};

const ProductForm: React.FC<Props> = ({ product, productList }) => {
  const {
    global: { auth },
  } = store.getState();

  const navigate = useNavigate();

  const message = t('Add to cart successfully');

  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = () => {
    if (isEmpty(auth)) {
      navigate('/auth/login');
      return;
    }

    const listCart = JSON.parse(localStorage.getItem('listCart') || '[]') as ProductCart[];

    const hasItem = listCart.find(({ productId }) => productId === product?._id);

    if (hasItem) {
      const result = listCart.map(item => {
        if (item.productId === product?._id) {
          return {
            ...item,
            priceInitial: item?.price ?? 0,
            quantity: +quantity + item.quantity,
          };
        }
        return item;
      });
      localStorage.setItem('listCart', JSON.stringify(result));
    } else {
      listCart.push({
        productId: product?._id ?? '',
        quantity,
        price: product?.price ?? 0,
        priceInitial: product?.price ?? 0,
        name: product?.name ?? '',
        thumbnail: product?.thumbnail ?? '',
        slug: product?.slug ?? '',
      });
      store.dispatch(updateCountCartAction(listCart.length));
      localStorage.setItem('listCart', JSON.stringify(listCart));
    }

    toast.success(message);
  };

  const disableSave = ((productList || []).find(item => item.productId === product?._id)?.quantity || 0) >= 10;
  console.log(disableSave, 'disableSave');
  const renderQuantityAvailable = (quantity: number, sold: number) => quantity - sold || 0;

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} sx={{ maxWidth: { sm: '100%' } }}>
        <Box sx={styles.boxBrandName}>{product?.brand?.name}</Box>
        <Box component="h1" sx={styles.boxTitle}>
          {product?.name}
        </Box>
        <Box sx={styles.boxRated}>
          <Box sx={styles.wrapRating}>
            <Box component="h6" sx={styles.quantityRating}>
              {product?.rating?.toFixed(1)}
            </Box>
            <Rating name="read-only" precision={0.1} value={Number(product?.rating)} readOnly sx={styles.rating} />
          </Box>
          <Box sx={styles.boxRatings}>
            <Box sx={styles.ratingAndSold}>{product?.totalComment || 0}</Box>
            <Box sx={styles.ratingAndSoldLabel}>{t('Review')}</Box>
          </Box>
        </Box>

        <Box sx={styles.wrapPrice}>
          <Box component="h2" sx={styles.boxPrice}>
            {formatterPrice.format(product?.price || 0)}
          </Box>
        </Box>
        <Box>
          <Box style={styles.wrapQuantity}>
            <QuantityButton sx={styles.boxQuantity} quantity={quantity} setQuantity={setQuantity} />
            <Box component="span" color="#757575" paddingLeft="20px">
              {renderQuantityAvailable(product?.quantity as number, product?.sold as number)} {t('products available')}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.boxItemInAddCart}>
          <LoadingButton
            disabled={disableSave || product?.quantity === product?.sold}
            variant="contained"
            sx={styles.btnAddCart}
            onClick={handleSubmit}
          >
            {t('Add To Cart')}
          </LoadingButton>
        </Box>

        {product?.quantity === product?.sold && (
          <Box component={'p'} style={styles.boxShowErrorSoldOut}>
            {t('The product has been sold out')}
          </Box>
        )}
      </Grid>
    </React.Fragment>
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

export default compose(withConnect)(ProductForm);
