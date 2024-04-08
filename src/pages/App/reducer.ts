import produce from 'immer';

import { MapAction } from 'src/common/types';
import { CHANGE_LOCALE } from 'src/layouts/TopBar/constants';
import { ChangeLocalePayload } from 'src/layouts/TopBar/types';
import { GET_ME_SUCCESS, LOGOUT } from 'src/pages/Authenticated/constants';
import { GetMePayload } from 'src/pages/Authenticated/types';
import { SHOW_LOADING } from 'src/pages/LoadingIndicator/constants';
import { ShowLoadingPayload } from 'src/pages/LoadingIndicator/types';
import { LOGIN_SUCCESS } from 'src/pages/Login/constants';
import { LoginFailedPayload, LoginSuccessPayload } from 'src/pages/Login/types';

import { BRAND_LIST, CATEGORY_LIST, PRODUCT_CART_LIST, UPDATE_COUNT_CART } from './constant';
import { CategoryListPayload, ProductCartListPayload, UpdateCountCartPayload } from './types';

export const initialState = {
  locale: localStorage.getItem('locale') || 'vi',
  auth: {} || null,
  loading: {
    showLoading: false,
  },
  category: {
    list: [] || null,
  },
  product: {
    cart: {
      list: [] || null,
    },
    detail: {},
  },
  brand: { list: [] },
  cart: { count: 0 },
};

type Action = {
  LOGIN_SUCCESS: LoginSuccessPayload;
  SHOW_LOADING: ShowLoadingPayload;
  CATEGORY_LIST: CategoryListPayload;
  PRODUCT_CART_LIST: ProductCartListPayload;
  LOGIN_FAILED: LoginFailedPayload;
  GET_ME_SUCCESS: GetMePayload;
  CHANGE_LOCALE: ChangeLocalePayload;
  BRAND_LIST: CategoryListPayload;
  UPDATE_COUNT_CART: UpdateCountCartPayload;
  LOGOUT_REQUEST: never;
  LOGOUT: never;
};

const appReducer = (state = initialState, action: MapAction<Action>) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        const {
          payload: {
            data: {
              user,
              tokens: {
                access: { token },
              },
            },
          },
        } = action;
        draft.auth = user;
        localStorage.setItem('accessToken', token);
        break;
      }
      case CATEGORY_LIST: {
        const {
          payload: { data },
        } = action;
        draft.category.list = data;
        break;
      }
      case BRAND_LIST: {
        const {
          payload: { data },
        } = action;
        draft.brand.list = data;
        break;
      }
      case CHANGE_LOCALE: {
        const {
          payload: { locale },
        } = action;
        draft.locale = locale;
        break;
      }
      case PRODUCT_CART_LIST: {
        const {
          payload: { data },
        } = action;
        // @ts-ignore
        draft.product.cart.list = data;
        break;
      }
      case UPDATE_COUNT_CART: {
        const {
          payload: { count },
        } = action;
        draft.cart.count = count;
        break;
      }
      case LOGOUT: {
        draft.auth = null;
        localStorage.removeItem('accessToken');
        break;
      }
      case GET_ME_SUCCESS: {
        const {
          payload: { data },
        } = action;
        draft.auth = data;
        break;
      }
      case SHOW_LOADING: {
        const {
          payload: { isShow },
        } = action;
        draft.loading.showLoading = isShow;
        break;
      }
      default:
        break;
    }
  });

export default appReducer;
