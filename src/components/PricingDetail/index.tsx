import React from 'react';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';

import { ProductCart } from 'src/common/types';
import { formatPrice } from 'src/helpers';
import useCalculateTotalPrice from 'src/hooks/useCalculateTotalPrice';
import { t } from 'src/libs/intl';

import styles from './styles';

type Props = {
  productList: ProductCart[];
  isDisabledPayment: boolean;
};

const PricingDetail: React.FC<Props> = ({ productList, isDisabledPayment }) => {
  const totalPrice = useCalculateTotalPrice(productList);

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.boxCalculate}>
        <Typography sx={styles.typographyTitle}>{t('Subtotal')}:</Typography>
        <Typography sx={styles.typographyPrice}>{formatPrice.format(totalPrice)}</Typography>
      </Box>
      <Box sx={styles.boxCalculate}>
        <Typography sx={styles.typographyTitle}>{t('Shipping')}:</Typography>
        <Typography sx={styles.typographyPrice}>_</Typography>
      </Box>
      <Box sx={styles.boxCalculate}>
        <Typography sx={styles.typographyTitle}>{t('Tax')}:</Typography>
        <Typography sx={styles.typographyPrice}>_</Typography>
      </Box>
      <Box sx={{ ...styles.boxCalculate, marginBottom: '16px' }}>
        <Typography sx={styles.typographyTitle}>{t('Discount')}:</Typography>
        <Typography sx={styles.typographyPrice}>_</Typography>
      </Box>
      <Divider sx={styles.divider} />
      <Typography sx={styles.typographyTotalPrice}>{formatPrice.format(totalPrice)}</Typography>
      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ width: '100%' }}
        disabled={isEmpty(productList) || isDisabledPayment}
      >
        {t('Payment')}
      </LoadingButton>
    </Paper>
  );
};

export default PricingDetail;
