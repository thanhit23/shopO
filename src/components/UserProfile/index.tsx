import React from 'react';
import { connect } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { compose } from 'redux';

import { ReactComponent as CartPending } from 'src/assets/icons/cartPending.svg';
import { ReactComponent as Delivery } from 'src/assets/icons/delivery.svg';
import { ReactComponent as Total } from 'src/assets/icons/total.svg';
import { State } from 'src/common/types';
import { integrationPathImage } from 'src/helpers';
import { t } from 'src/libs/intl';
import { AuthType } from 'src/pages/Authenticated/types';

import styles from './styles';

export interface AnalyticsResponse {
  totalOrder: number;
  awaitingShipment: number;
  awaitingDelivery: number;
  awaitingPayments: number;
}

const checkGender = (gender: number) => {
  if (gender === 1) {
    return t('Female');
  } else if (gender === 2) {
    return t('Male');
  } else {
    return '';
  }
};

type Props = {
  auth: AuthType;
  analytics: AnalyticsResponse;
};

const UserProfile: React.FC<Props> = ({ auth, analytics }) => (
  <Grid item xs={12} lg={9}>
    <Box>Hello, {auth?.name || '-'}</Box>
    <Box fontSize="24px" fontWeight={700} marginBottom="32px">
      {t('Welcome to your Profile')}
    </Box>
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box padding="24px" bgcolor="#111">
          <Box
            width="62px"
            borderRadius="10px"
            height="62px"
            bgcolor="#fff"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CartPending />
          </Box>
          <Box color="#fff" fontSize="18px" mt="20px">
            {t('Shipped Orders')}
          </Box>
          <Box color="#fff" fontSize="40px" fontWeight={700} mt="4px">
            {analytics?.awaitingShipment || '0'}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box padding="24px" bgcolor="#111">
          <Box
            width="62px"
            borderRadius="10px"
            height="62px"
            bgcolor="#fff"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Delivery />
          </Box>
          <Box color="#fff" fontSize="18px" mt="20px">
            {t('Delivered Orders')}
          </Box>
          <Box color="#fff" fontSize="40px" fontWeight={700} mt="4px">
            {analytics?.awaitingDelivery || '0'}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box padding="24px" bgcolor="#111">
          <Box
            width="62px"
            borderRadius="10px"
            height="62px"
            bgcolor="#fff"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Total />
          </Box>
          <Box color="#fff" fontSize="18px" mt="20px">
            {t('Total Orders')}
          </Box>
          <Box color="#fff" fontSize="40px" fontWeight={700} mt="4px">
            {analytics?.totalOrder || '0'}
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Box marginBottom="32px" marginTop="32px">
      <Grid container spacing={{ xs: 3 }}>
        <Grid item xs={12}>
          <Paper sx={styles.paperInfoUser}>
            <Box display="flex" alignItems="center">
              <Avatar src={auth.avatar} alt={auth.name} sx={styles.avatar} />
              <Box sx={styles.boxInfoUser}>
                <Box className="wrap-info">
                  <Box>
                    <Box component="h5" sx={styles.nameUser}>
                      {auth.name}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={styles.wrapperInfo}>
              <Box component="small" className="title">
                {t('Name')}
              </Box>
              <span>{auth.name}</span>
            </Box>
            <Box sx={styles.wrapperInfo}>
              <Box component="small" className="title">
                {t('Email')}
              </Box>
              <span>{auth.email}</span>
            </Box>
            <Box sx={styles.wrapperInfo}>
              <Box component="small" className="title">
                {t('Phone')}
              </Box>
              <span>{auth.phoneNumber || 'N/A'}</span>
            </Box>
            <Box sx={styles.wrapperInfo}>
              <Box component="small" className="title">
                {t('Gender')}
              </Box>
              <span>{checkGender(auth.gender) || 'N/A'}</span>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Grid>
);

const mapStateToProps = ({ global: { auth } }: State) => ({
  auth,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(UserProfile);
