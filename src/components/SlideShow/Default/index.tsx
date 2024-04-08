import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { t } from 'src/libs/intl';

import styles from './styles';
import { DefaultTypes } from './types';

function Default({ srcImg, to, title }: DefaultTypes) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', height: '460px', backgroundImage: `url(${srcImg})`, backgroundRepeat: 'round' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '50%',
            padding: '30px',
          }}
        >
          <Box component="h1" sx={styles.boxComponentH1}>
            {title}
          </Box>
          <Box component="p" sx={styles.boxComponentP}>
            {t('Get Free Shipping on all orders over 199.000đ')}
          </Box>
          <Box component={Link} to={to}>
            <Button variant="contained" sx={styles.btnShopNow}>
              {t('Shop Now')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Default;
