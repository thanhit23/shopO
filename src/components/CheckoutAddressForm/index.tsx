import React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { PostOrderDetailType, ProductCart } from 'src/common/types';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';

import ErrorMessage from '../ErrorMessage';
import styles from './styles';
import { Props } from './types';

export const createOrderDetailData = (productList: ProductCart[], orderId: string): PostOrderDetailType => ({
  products: productList.map(product => ({
    product: product?.productId,
    quantity: product.quantity,
    price: product.price,
  })),
  order: orderId,
  shipingFee: 0,
  discountPercent: 0,
});

function CheckoutAddressForm({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  const { fullName, phoneNumber, address } = errors;

  return (
    <Box>
      <Paper elevation={1} sx={styles.paperBillingXShipping}>
        <Typography component="p" sx={styles.typographyTitle}>
          {t('Shipping Address')}
        </Typography>
        <Grid container spacing={{ xs: 6 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={styles.formControl}>
              <MuiTextField label={t('Full Name')} message={t('Full Name')} validate={register('fullName')} />
              <ErrorMessage name={fullName} sx={styles.errorMessage} />
            </FormControl>
            <FormControl fullWidth sx={styles.formControl}>
              <MuiTextField label={t('Phone Number')} message={t('Phone Number')} validate={register('phoneNumber')} />
              <ErrorMessage name={phoneNumber} sx={styles.errorMessage} />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={styles.formControl}>
              <MuiTextField label={t('Address')} message={t('Address')} validate={register('address')} />
              <ErrorMessage name={address} sx={styles.errorMessage} />
            </FormControl>
            <FormControl fullWidth sx={styles.formControl}>
              <MuiTextField
                label={t('Additional Note')}
                message={t('Additional Note')}
                validate={register('addressDetail')}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CheckoutAddressForm;
