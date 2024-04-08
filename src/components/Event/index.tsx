import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import srcBackground from 'src/assets/images/campaign-cover-countdown.jpeg';
import { t } from 'src/libs/intl';
import { PATH_PUBLIC } from 'src/routes/paths';

import styles from './styles';

function Event() {
  return (
    <Container sx={styles.containerEvent}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={styles.boxItem}>
            <Box width="100%" component="img" src={srcBackground} sx={styles.boxImage} />
            <Box sx={styles.boxInformation}>
              <Box component="h2" sx={styles.boxTitle}>
                {t('WOO! Flash Sale')}
              </Box>
              <Box component="p" sx={styles.boxTimeEvent}>
                {t('You get into the 2k+ best Products in Flash offer with a special-shaped sofa for sale.')}
              </Box>
              <Link
                style={{ marginTop: '16px' }}
                to={PATH_PUBLIC.product.category('6500791355ee920008ef5f27', 'Thời Trang Nam')}
              >
                <Box component="p" sx={styles.linkShop}>
                  {t('Show Now')}
                  <ArrowForwardIosIcon width="16px" />
                </Box>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Event;
