import { Link, useLocation } from 'react-router-dom';

import HttpsIcon from '@mui/icons-material/Https';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { t } from 'src/libs/intl';
import { logout } from 'src/pages/Authenticated/actions';
import store from 'src/store';

import styles from './styles';
import { BarItem } from './types';

const SideBarUser: React.FC = () => {
  const { pathname } = useLocation();

  const activeItem = (path: string) => {
    const regex = new RegExp(path);
    if (pathname.search(regex) != -1) return styles.active;

    return styles.unActive;
  };

  const barItems: BarItem[] = [
    {
      path: '/dashboard',
      icon: <SpaceDashboardIcon fontSize="small" />,
      title: t('Dashboard'),
    },
    {
      path: '/profile',
      icon: <PersonIcon fontSize="small" />,
      title: t('Profile Info'),
    },
    {
      path: '/password',
      icon: <HttpsIcon fontSize="small" />,
      title: t('Change password'),
    },
    {
      path: '/order',
      icon: <ShoppingCartCheckoutIcon fontSize="small" />,
      title: t('Orders'),
    },
    {
      path: '/logout',
      onClick: () => {
        store.dispatch(logout());
      },
      icon: <LogoutIcon fontSize="small" />,
      title: t('Logout'),
    },
  ];

  return (
    <Grid item xs={12} lg={3}>
      <Paper sx={styles.paperContainer}>
        <Typography sx={styles.typographyTitle}>{t('SETTINGS ACCOUNT')}</Typography>
        {barItems.map(({ path, icon, title, quantity, onClick }, i) => {
          if (onClick) {
            return (
              <Box sx={{ cursor: 'pointer' }} key={i} onClick={onClick}>
                <Box sx={{ ...styles.boxItem, ...activeItem(path) }}>
                  <Box sx={styles.boxTitle}>
                    {icon}
                    <span>{title}</span>
                  </Box>
                  {quantity && <span>{quantity}</span>}
                </Box>
              </Box>
            );
          }
          return (
            <Link key={i} to={path}>
              <Box sx={{ ...styles.boxItem, ...activeItem(path) }}>
                <Box sx={styles.boxTitle}>
                  {icon}
                  <span>{title}</span>
                </Box>
                {quantity && <span>{quantity}</span>}
              </Box>
            </Link>
          );
        })}
      </Paper>
    </Grid>
  );
};

export default SideBarUser;
