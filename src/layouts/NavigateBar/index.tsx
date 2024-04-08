import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GridViewIcon from '@mui/icons-material/GridView';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { compose } from 'redux';

import { State } from 'src/common/types';
import { ProductCart } from 'src/common/types';
import { t } from 'src/libs/intl';

import { home } from './icons';
import styles from './styles';

type Props = {
  productList: ProductCart[];
};

const NavigateBar: React.FC<Props> = ({ productList }) => (
  <Box sx={styles.boxNavigate}>
    <Box component={Link} to="/" sx={styles.linkPage}>
      <SvgIcon fontSize="small" viewBox="0 0 24 24">
        {home}
      </SvgIcon>
      {t('Home')}
    </Box>
    <Box component={Link} to="/product/search" sx={styles.linkPage}>
      <SvgIcon fontSize="small" viewBox="0 0 24 24">
        <GridViewIcon />
      </SvgIcon>
      {t('Category')}
    </Box>
    <Box component={Link} to="/cart" sx={styles.linkPage}>
      <Badge badgeContent={productList.length} color="secondary" sx={styles.badge}>
        <ShoppingBagOutlinedIcon color="action" />
      </Badge>
      {t('Cart')}
    </Box>
    <Box component={Link} to="/profile" sx={styles.linkPage}>
      <SvgIcon fontSize="small" viewBox="0 0 24 24">
        <PersonOutlineIcon color="action" />
      </SvgIcon>
      {t('Profile')}
    </Box>
  </Box>
);

const mapStateToProps = ({
  global: {
    product: {
      cart: { list },
    },
  },
}: State) => ({
  productList: list,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(NavigateBar);
