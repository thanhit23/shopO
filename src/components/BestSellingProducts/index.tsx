import 'react-slideshow-image/dist/styles.css';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Product } from 'src/common/types';
import { t } from 'src/libs/intl';

import ProductItem from '../ProductItemQuickView';
import SlideProduct from '../SlideProduct';
import styles from './styles';

type Props = {
  products: Product[];
};

function BestSellingProducts({ products }: Props) {
  return (
    <Container maxWidth="lg" sx={styles.containerBestSell}>
      <Box component="h2" sx={styles.boxTitle}>
        {t('Best Selling Product')}
      </Box>
      <div>
        {products?.length && (
          <SlideProduct slidesToShow={5}>
            {products.map(product => (
              <ProductItem key={product._id} product={product} widthHeightImg="227px" />
            ))}
          </SlideProduct>
        )}
      </div>
    </Container>
  );
}

export default BestSellingProducts;
