import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ReactComponent as NotFound404 } from 'src/assets/images/404.svg';
import { t } from 'src/libs/intl';

import styles from './styles';

function NotFound() {
  return (
    <Box sx={styles.wrapNotFound}>
      <Box component={NotFound404} sx={styles.imgNotFound} />
      <Button variant="contained" component={Link} to="/" sx={styles.btnGoHome}>
        {t('Go To Home')}
      </Button>
    </Box>
  );
}

export default NotFound;
