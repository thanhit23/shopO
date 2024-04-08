import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import logo from 'src/assets/images/logo.svg';
import { t } from 'src/libs/intl';

import styles from './styles';

const LinkStyles = styled(Link)`
  display: block;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  padding: 0.3rem 0;
  color: #aeb4be;
`;

function Footer() {
  return (
    <footer>
      <Box sx={styles.boxFooter}>
        <Container maxWidth="lg" sx={styles.containerFooter}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/">
              <img width="160" height="60" src={logo} alt="" />
            </Link>
          </Box>
          <Divider />
          <Box sx={styles.wrapperGrid}>
            <Grid container spacing={{ xs: 3 }}>
              <Grid item xs={12} sm={6} md={6} lg={5}>
                <Box sx={styles.flexBox}>{t('About Us')}</Box>
                <Box component="p" sx={styles.boxDescription}>
                  {t('We know there are a lot of threa developers our but we pride into a firm in the industry.')}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <Box sx={styles.boxTitleAboutUs}>{t('Feature')}</Box>
                <div>
                  <LinkStyles to="#">{t('About Us')}</LinkStyles>
                  <LinkStyles to="#">{t('Terms Condition')}</LinkStyles>
                  <LinkStyles to="#">{t('Best Products')}</LinkStyles>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <Box sx={styles.boxTitleAboutUs}>{t('General Links')}</Box>
                <div>
                  <LinkStyles to="#">Blog</LinkStyles>
                  <LinkStyles to="#">{t('Tracking Order')}</LinkStyles>
                  <LinkStyles to="#">{t('Become Seller')}</LinkStyles>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <Box sx={styles.boxTitleAboutUs}>{t('Helpful')}</Box>
                <div>
                  <LinkStyles to="#">{t('Flash Sale')}</LinkStyles>
                  <LinkStyles to="#">{t('FAQ')}</LinkStyles>
                  <LinkStyles to="#">{t('Support')}</LinkStyles>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
