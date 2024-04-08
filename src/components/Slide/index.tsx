import 'react-slideshow-image/dist/styles.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import srcFeMale from 'src/assets/images/banner-female.png';
import srcKid from 'src/assets/images/banner-kid.png';
import srcMale from 'src/assets/images/banner-male.png';
import { t } from 'src/libs/intl';

import styles from './styles';

function SlideShow() {
  return (
    <Box sx={styles.boxRootSlideShow}>
      <Container maxWidth="lg" sx={styles.containerBoxSlide}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box sx={styles.wrapperItem}>
              <Box component="img" src={srcMale} />
              <Box sx={styles.wrapperItemDetail}>
                <Box sx={styles.title}>{t('Best Styles for all Boys')}</Box>
                <Button variant="contained">{t('Show Now')}</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles.wrapperItem}>
              <Box component="img" src={srcFeMale} />
              <Box sx={styles.wrapperItemDetail}>
                <Box sx={styles.title}>{t('Best Styles for all Girls')}</Box>
                <Button variant="contained">{t('Show Now')}</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles.wrapperItem}>
              <Box component="img" src={srcKid} />
              <Box sx={styles.wrapperItemDetail}>
                <Box sx={styles.title}>{t('Best Styles for all Kids')}</Box>
                <Button variant="contained">{t('Show Now')}</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SlideShow;
