import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Product } from 'src/common/types';
import { t } from 'src/libs/intl';

import ProductItem from './ProductItem';
import styles from './styles';

export interface Props {
  productBestTheWeek: Product[];
}

const PopularSales: React.FC<Props> = ({ productBestTheWeek }) => (
  <Container maxWidth="lg" sx={styles.container}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box component="h3" sx={styles.boxTitle}>
          {t('Popular Sales')}
        </Box>
        <Grid container>
          {productBestTheWeek.map((item, i) => (
            <Grid key={i} item xs={12} md={3} lg={3}>
              <ProductItem key={i} item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default PopularSales;
