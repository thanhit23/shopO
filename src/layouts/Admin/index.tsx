import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { isEmpty } from 'lodash';

import ScrollToTop from 'src/components/ScrollToTop';
import store from 'src/store';

import Header from './Header';
import NavigateBar from './NavigateBar';

export default function LayoutAdmin() {
  const {
    global: { auth },
  } = store.getState();

  const [state, setState] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('/admin') && !isEmpty(auth) && auth['role'] !== 'admin') {
      // navigate('/404');
      console.log(navigate, 'navigate');
    }
  }, [auth, pathname]);

  return (
    <>
      <ScrollToTop />
      <Header state={state} setState={setState} />
      <NavigateBar setState={setState} state={state} />
      <Box
        marginLeft="260px"
        sx={{
          marginLeft: state ? '260px' : '20px',
          transition: 'all 0.3s ease',
          padding: '15px',
          backgroundColor: '#eef2f6',
          borderRadius: '10px',
          marginRight: '20px',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
