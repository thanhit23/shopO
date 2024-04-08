import { RouteObject, createBrowserRouter } from 'react-router-dom';

import NotFound from 'src/components/NotFound';
import AdminLayout from 'src/layouts/Admin';
import GeneralLayout from 'src/layouts/Main';
import Authenticated from 'src/pages/Authenticated';

const routers: RouteObject[] = [
  {
    path: '/auth',
    errorElement: <NotFound />,
    element: <GeneralLayout />,
    children: [
      {
        path: 'login',
        lazy: () => import('src/pages/Login'),
      },
      {
        path: 'register',
        lazy: () => import('src/pages/Register'),
      },
      {
        path: 'forgot-password',
        lazy: () => import('src/pages/ForgotPassword'),
      },
      {
        path: 'reset-password',
        lazy: () => import('src/pages/ResetPassword'),
      },
    ],
  },
  {
    path: '/',
    errorElement: <NotFound />,
    element: <GeneralLayout />,
    children: [
      {
        index: true,
        lazy: () => import('src/pages/HomePage'),
      },
      {
        path: 'cart',
        element: <Authenticated />,
        children: [{ index: true, lazy: () => import('src/pages/Cart') }],
      },
      {
        path: 'checkout',
        element: <Authenticated />,
        children: [{ index: true, lazy: () => import('src/pages/Checkout') }],
      },
      {
        path: 'product',
        children: [
          {
            path: 'search',
            lazy: () => import('src/pages/ProductSearch'),
          },
          {
            path: ':slug',
            lazy: () => import('src/pages/ProductDetail'),
          },
        ],
      },
      {
        path: 'order',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/Order'),
          },
          {
            path: ':id',
            lazy: () => import('src/pages/Order/Detail'),
          },
        ],
      },
      {
        path: 'profile',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/Profile'),
          },
        ],
      },
      {
        path: 'password',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/ChangePassword'),
          },
        ],
      },
      {
        path: 'dashboard',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/Dashboard'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    errorElement: <NotFound />,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Authenticated />,
        lazy: () => import('src/pages/admin/Home'),
      },
      {
        path: 'users',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Users'),
          },
        ],
      },
      {
        path: 'comments',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Comments'),
          },
        ],
      },
      {
        path: 'orders',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Orders'),
          },
          {
            path: ':id',
            lazy: () => import('src/pages/admin/Orders/Detail'),
          },
        ],
      },
      {
        path: 'categories',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Categories'),
          },
        ],
      },
      {
        path: 'brands',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Brands'),
          },
        ],
      },
      {
        path: 'products',
        element: <Authenticated />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Products'),
          },
        ],
      },
      {
        path: 'login',
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/admin/Login'),
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routers);
