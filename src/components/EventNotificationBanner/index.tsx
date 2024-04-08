import { Link } from 'react-router-dom';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';

import discountBanner3 from 'src/assets/images/discount-banner-3.1.png';
import { t } from 'src/libs/intl';
import { PATH_PUBLIC } from 'src/routes/paths';

import styles from './styles';

function EventNotificationBanner() {
  return (
    <Box sx={styles.containerEventNotificationBanner}>
      <Box sx={styles.bgLeft}>
        <Box component="img" src={discountBanner3} />
      </Box>
      <Box sx={{ padding: '6rem 2rem' }}>
        <Box sx={styles.boxTimeSaleOff}>
          <Box sx={styles.boxSaleOff}>{t('Get 20% Off Discount Coupon')}</Box>
          <Box sx={styles.boxSaleOffDescription}>{t('by Subscribe our Newsletter')}</Box>
        </Box>
        <Box sx={styles.boxTitle}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: <MailOutlineIcon />,
            }}
            placeholder="EMAIL ADDRESS"
          />

          <Button
            component={Link}
            to={PATH_PUBLIC.product.category('657faa2305008b0008aae832', 'Phụ Kiện')}
            sx={styles.btnShop}
          >
            {t('Shop Now')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EventNotificationBanner;
