import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { compose } from 'redux';

import { State } from 'src/common/types';
import LoadingScreen from 'src/components/LoadingScreen';
import { getMe as getMeAction } from 'src/pages/Authenticated/actions';
import LoadingIndicator from 'src/pages/LoadingIndicator';
import routes from 'src/routes';
import store from 'src/store';

import { isMe, isMeAdmin, setHeader } from '../Authenticated/httpClients';
import { AuthType } from '../Authenticated/types';
import { getBrandAction, getCategoryAction, getProductCartAction, updateCountCartAction } from './actions';
import { brandList, categoryLists } from './service';
import './style.css';

type Props = {
  auth: AuthType;
  cart: { count: number };
};

const App: React.FC<Props> = ({ auth, cart }) => {
  const token = localStorage.getItem('accessToken') || '';

  useQuery({
    queryKey: ['getMe'],
    queryFn: () => {
      setHeader(token);

      if (auth?.['role'] === 'admin' || window.location.href.includes('/admin')) {
        return isMeAdmin();
      }

      return isMe();
    },
    retry: 0,
    onSuccess: ({ data: { data, status } }) => status && store.dispatch(getMeAction(data)),
  });

  useQuery({
    queryKey: ['getCategory'],
    queryFn: () => categoryLists(),
    retry: 0,
    onSuccess: ({ data: { data, status } }) => status && store.dispatch(getCategoryAction(data)),
  });

  useQuery({
    queryKey: ['getBrand'],
    queryFn: () => brandList(),
    retry: 0,
    onSuccess: ({ data: { data, status } }) => status && store.dispatch(getBrandAction(data)),
  });

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('listCart') || '[]');
    if (cart.count !== cartLocal.length) {
      store.dispatch(updateCountCartAction(cartLocal.length || 0));
    }

    if (cartLocal) {
      store.dispatch(getProductCartAction(cartLocal));
    }
  });

  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoadingIndicator />
      <RouterProvider router={routes} fallbackElement={<LoadingScreen />} />
    </Suspense>
  );
};

const mapStateToProps = ({ global: { auth, cart } }: State) => ({
  auth,
  cart,
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(App);
