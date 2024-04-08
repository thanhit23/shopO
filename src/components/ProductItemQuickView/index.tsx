import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

import { Nullable, Product } from 'src/common/types';
import formatPrice from 'src/helpers/formatPrice';
import { PATH_PUBLIC } from 'src/routes/paths';

import styles from './styles';

type Props = {
  product: Product;
  widthHeightImg?: Nullable<string>;
};

const ProductItemQuickView: React.FC<Props> = ({ product, widthHeightImg = null }) => {
  const styleImage = () => {
    if (widthHeightImg) {
      return {
        ...styles.boxComponentImg,
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: widthHeightImg,
        },
        height: widthHeightImg,
      };
    }

    return styles.boxComponentImg;
  };

  return (
    <Box position="unset">
      <Box width="calc(100% - 1.125rem)" margin="auto">
        <Box sx={styles.boxWrapperProduct}>
          <Link to={PATH_PUBLIC.product.slug(product?.slug, product?._id)}>
            <Box sx={widthHeightImg ? { ...styles.boxComponentImg, height: widthHeightImg } : styles.boxComponentImg}>
              <Box>
                <Box className="img-product" component="img" sx={styleImage()} alt="" src={product?.thumbnail} />
              </Box>
            </Box>
          </Link>
        </Box>
        <Box padding="8px" textAlign="center">
          <Box sx={styles.boxProductNameBox}>
            <Link to={PATH_PUBLIC.product.slug(product?.slug, product?._id)}>
              <Box component="p" sx={styles.boxProductName}>
                {product?.name}
              </Box>
            </Link>
          </Box>
          <Box component="h4" sx={styles.boxPrice}>
            {formatPrice.format(product?.price)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItemQuickView;
