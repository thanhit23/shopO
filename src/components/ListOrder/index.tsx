import React from 'react';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { isEmpty } from 'lodash';

import noOrder from 'src/assets/images/noOrder.jpg';
import { t } from 'src/libs/intl';

import ItemOrder from '../ItemOrder';
import { ItemOrderTypes } from '../ItemOrder/types';
import Loading from './Loading';
import styles from './styles';

type Props = {
  listOrder: ItemOrderTypes[];
  isLoading: boolean;
};

function ListOrder({ listOrder, isLoading }: Props) {
  return (
    <React.Fragment>
      <Paper elevation={0} sx={styles.paperHeaderList}>
        <Box component="h5" sx={styles.headerItem}>
          {t('Order #')}
        </Box>
        <Box component="h5" sx={styles.headerItem}>
          {t('Status')}
        </Box>
        <Box component="h5" sx={styles.headerItem}>
          {t('Date')}
        </Box>
        <Box component="h5" sx={styles.headerItem}>
          {t('Total')}
        </Box>
        <Box
          component="h5"
          sx={{
            ...styles.headerItem,
            ...styles.headerItemLast,
          }}
        >
          {t('Action')}
        </Box>
      </Paper>
      {isLoading ? (
        <Loading />
      ) : !isEmpty(listOrder) ? (
        listOrder?.map((itemOrder: ItemOrderTypes) => <ItemOrder key={itemOrder._id} itemOrder={itemOrder} />)
      ) : (
        <Avatar src={noOrder} alt="No order" sx={styles.noOrder} />
      )}
    </React.Fragment>
  );
}

export default ListOrder;
