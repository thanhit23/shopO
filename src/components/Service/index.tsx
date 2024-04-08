import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { t } from 'src/libs/intl';

import Item from './Item';
import icons from './icons';
import styles from './styles';

function Service() {
  return (
    <Container maxWidth="lg" sx={styles.serviceContainer}>
      <Box sx={styles.boxItem}>
        <Item
          title={t('Free Shipping')}
          description={t('When ordering over $100')}
          icon={icons.shiping}
          viewBox="0 0 36 36"
        />
        <Item
          title={t('Free Return')}
          description={t('Get Return within 30 days')}
          icon={icons.savings}
          viewBox="0 0 32 34"
        />
        <Item
          title={t('Secure Payment')}
          description={t('100% Secure Online Payment')}
          icon={icons.timer}
          viewBox="0 0 32 38"
        />
        <Item
          title={t('Best Quality')}
          description={t('Original Product Guarenteed')}
          icon={icons.payment}
          viewBox="0 0 32 35"
          last
        />
      </Box>
    </Container>
  );
}

export default Service;
