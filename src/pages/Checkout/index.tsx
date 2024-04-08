import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Gird from '@mui/material/Grid';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { compose } from 'redux';

import { PostOrderType, State } from 'src/common/types';
import { ProductCart } from 'src/common/types';
import CheckoutAddressForm, { createOrderDetailData } from 'src/components/CheckoutAddressForm';
import { validationSchema } from 'src/components/CheckoutAddressForm/validationSchema';
import DeliveryMethod from 'src/components/DeliveryMethod';
import PricingDetail from 'src/components/PricingDetail';
import useCalculateTotalPrice from 'src/hooks/useCalculateTotalPrice';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { t } from 'src/libs/intl';
import { AuthType } from 'src/pages/Authenticated/types';
import { useCreateOrder, useCreateOrderDetail } from 'src/queries/order';
import { PATH_AUTH } from 'src/routes/paths';

import { payWithVNPay } from './services';
import { PaymentType } from './types';

export type Props = {
  auth: AuthType;
};

const Checkout: React.FC<Props> = ({ auth }) => {
  const [storedValue] = useLocalStorage<string[]>('productCartId', []);

  const [storedValueCart] = useLocalStorage<ProductCart[]>('listCart', []);

  const [productCartList, setProductCartList] = useState<ProductCart[]>([]);

  const createOrderDetail = useCreateOrderDetail();

  const createOrder = useCreateOrder();

  const navigate = useNavigate();

  const totalPrice = useCalculateTotalPrice(storedValueCart);

  useEffect(() => {
    const filterProductCart = storedValueCart.filter(product => storedValue.includes(product.productId));
    setProductCartList(filterProductCart);
  }, [storedValueCart]);

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema(t)),
    defaultValues: {
      fullName: auth.name,
      phoneNumber: auth.phoneNumber,
      addressDetail: '',
      address: auth.location,
      method: '',
    },
  });

  const { watch } = form;

  const isDisabledPayment = +watch('method') < 2;

  const continueWithVNPay = useMutation({
    mutationFn: (data: PaymentType) => payWithVNPay(data),
    onSuccess: ({ data: { data, status } }) => {
      if (status) {
        window.open(data.url, '_blank');
      } else {
        toast.error(MESSAGE.paymentFailed);
      }
    },
  });

  const onSubmit = ({ fullName, phoneNumber, addressDetail, address, method }: any): void => {
    const orderFormData: PostOrderType = {
      fullName,
      phoneNumber: phoneNumber.toString(),
      address,
      customerNote: addressDetail,
      amount: totalPrice,
      status: 1,
      quantity: _.size(storedValueCart),
    };

    createOrder.mutate(orderFormData, {
      onSuccess: ({ data: { data, status } }) => {
        if (status) {
          const orderDetailData = createOrderDetailData(productCartList, data.id);

          createOrderDetail.mutate(orderDetailData, {
            onSuccess: (response: { data: { status: boolean } }): void => {
              if (response.data.status) {
                if (method === 1) {
                  continueWithVNPay.mutate({
                    address,
                    phoneNumber: phoneNumber.toString(),
                    orderId: data.id,
                    amount: totalPrice,
                  });
                } else {
                  navigate(PATH_AUTH.order.id(data.id));
                }
              }
            },
          });
        }
      },
    });
  };

  const MESSAGE = {
    paymentFailed: t('Payment failed'),
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '32px auto' }}>
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 3 }}>
          <Grid item xs={12} md={8} lg={8}>
            <CheckoutAddressForm
              form={form}
              productList={productCartList}
              onCreateOrder={createOrder}
              onCreateOrderDetail={createOrderDetail}
            />
            <Gird item xs={12}>
              <DeliveryMethod form={form} />
            </Gird>
          </Grid>
          <Grid item xs={12} md={4} lg={4} sx={{ transition: 'all 250ms' }}>
            <PricingDetail isDisabledPayment={isDisabledPayment} productList={productCartList} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const mapStateToProps = ({
  global: {
    auth,
    product: {
      cart: { list },
    },
  },
}: State) => ({
  productList: list,
  auth,
});

const withConnect = connect(mapStateToProps, null);

export const Component = compose(withConnect)(Checkout);
