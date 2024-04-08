import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Drawer, List } from '@mui/material';

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const stylesNavLink = {
  margin: '10px 0px 0.35em',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.66',
  display: 'block',
  color: 'rgb(18, 25, 38)',
  fontSize: '0.875rem',
  fontWeight: '500',
  padding: '6px',
  textTransform: 'capitalize',
  '&:hover': {
    color: '#673ab7',
    background: '#ede7f6',
  },
};

const NavigateBar: React.FC<Props> = ({ state, setState }) => {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box sx={{ width: '260px', paddingTop: '92px' }} role="presentation">
      <List sx={{ padding: '0 16px' }}>
        <Box component={NavLink} to="/admin" sx={stylesNavLink}>
          Dashboard
        </Box>
        <Box component={NavLink} to="/admin/users" sx={stylesNavLink}>
          Users
        </Box>
        <Box component={NavLink} to="/admin/products" sx={stylesNavLink}>
          Product
        </Box>
        <Box component={NavLink} to="/admin/categories" sx={stylesNavLink}>
          Category
        </Box>
        <Box component={NavLink} to="/admin/brands" sx={stylesNavLink}>
          Brand
        </Box>
        <Box component={NavLink} to="/admin/comments" sx={stylesNavLink}>
          Comment
        </Box>
        <Box component={NavLink} to="/admin/orders" sx={stylesNavLink}>
          Order
        </Box>
      </List>
    </Box>
  );

  return (
    <Box component="nav" width="260px">
      <Drawer
        sx={{
          width: '260px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '260px',
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
        variant="persistent"
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </Box>
  );
};

export default NavigateBar;
