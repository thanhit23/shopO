import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { isEmpty } from 'lodash';

import { ProductCart } from 'src/common/types';
import formatPrice from 'src/helpers/formatPrice';
import useCalculateTotalPrice from 'src/hooks/useCalculateTotalPrice';
import { t } from 'src/libs/intl';
import { PATH_AUTH } from 'src/routes/paths';

import styles from './styles';

export type Props = {
  productList: ProductCart[];
  checkedProduct: ProductCart[];
};

const CartSummary: React.FC<Props> = ({ productList, checkedProduct }) => {
  const navigate = useNavigate();
  const totalPrice = useCalculateTotalPrice(checkedProduct);

  const handleRedirectToCheckout = () => {
    if (!isEmpty(productList)) {
      navigate(PATH_AUTH.checkout);
    }
  };

  return (
    <Paper sx={styles.paperBilling}>
      <Box sx={styles.boxWrapTotalPrice}>
        <Box component="span" sx={styles.boxTotal}>
          {t('Total')}
        </Box>
        <Box component="span" sx={styles.boxPrice}>
          {formatPrice.format(totalPrice)}
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={styles.btnCheckoutNow}
        disabled={isEmpty(productList)}
        onClick={handleRedirectToCheckout}
      >
        {t('Checkout Now')}
      </Button>
    </Paper>
  );
};

export default CartSummary;
