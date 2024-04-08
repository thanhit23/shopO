import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

import { formatPrice } from 'src/helpers';
import { t } from 'src/libs/intl';
import { PATH_PUBLIC } from 'src/routes/paths';

import ReviewProductQuickView from '../ReviewProductQuickView';
import styles from './styles';
import { Props } from './types';

const ProductItem: React.FC<Props> = ({ product, onReviewProduct }) => {
  const [openModalReview, setOpenModalReview] = useState(false);
  const handleCloseModal = () => setOpenModalReview(false);

  return (
    <Box sx={styles.wrapperProduct}>
      <Box sx={styles.boxImageProduct}>
        <Box component={Link} to={PATH_PUBLIC.product.slug(product.product.slug, product.product._id)}>
          <Avatar alt={product.product.name} src={product.product.thumbnail} sx={styles.avatarProduct} />
        </Box>
        <Box marginLeft="20px">
          <Box
            component={Link}
            to={PATH_PUBLIC.product.slug(product.product.slug, product.product._id)}
            sx={styles.nameProduct}
          >
            {product.product.name}
          </Box>
          <Typography sx={styles.priceProduct}>
            {formatPrice.format(product.price)} x {product.quantity}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.boxDescriptionProduct}>
        {!_.isEmpty(product.product.size) && (
          <Typography sx={styles.descriptionProduct}>
            {t('Product properties:')} {product.product.size.join(', ')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductItem;
