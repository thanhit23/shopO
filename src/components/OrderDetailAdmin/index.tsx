/* eslint-disable indent */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import DoneIcon from '@mui/icons-material/Done';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

import { PostOrderDetailType, PostOrderType } from 'src/common/types';
import { formatDate } from 'src/helpers';
import { t } from 'src/libs/intl';
import { OrderDetailProduct } from 'src/pages/Order/types';
import { PATH_AUTH } from 'src/routes/paths';

import { CANCELLED, DELIVERED, DELIVERING, ORDERED } from '../ItemOrder/orderStatus';
import ModalConfirm from '../ModalConfirm';
import OrderSummaryDetails from '../OrderSummaryDetails';
import ProductItem from './ProductItem';
import styles from './styles';
import { Props } from './types';

const OrderDetail: React.FC<Props> = ({ orderDetail, onReviewProduct, onCreateOrder, onCreateOrderDetail }) => {
  const navigate = useNavigate();
  const orderId = useParams().id as string;
  const [modalConfirmOrder, setModalConfirmOrder] = useState(false);

  const checkStatus = (status: number) => {
    if (status === 0) {
      return CANCELLED;
    } else if (status === 1) {
      return ORDERED;
    } else if (status === 2) {
      return DELIVERING;
    } else if (status === 3) {
      return DELIVERED;
    }
  };

  const TickSuccess = () => (
    <Box sx={styles.wrapperDoneIcon}>
      <Avatar sx={styles.boxDoneIcon}>
        <DoneIcon />
      </Avatar>
    </Box>
  );

  const createOrderDetailData = (productList: any, orderId: string): PostOrderDetailType => ({
    products: productList?.map((product: any) => ({
      product: product.product._id,
      quantity: product.quantity,
      price: product.price,
    })),
    order: orderId,
    shipingFee: 0,
    discountPercent: 0,
  });

  const MESSAGE = {
    orderAgainFailed: t('Order again failed'),
  };

  const onSuccessOrderDetail = (response: { data: { status: boolean } }, data: { id: string }): void => {
    if (response.data.status) {
      navigate(PATH_AUTH.payment.id(data.id));
    } else {
      toast.error(MESSAGE.orderAgainFailed);
    }
  };

  const handleOrderAgain = () => {
    const orderFormData: PostOrderType = {
      fullName: orderDetail.fullName,
      phoneNumber: orderDetail.phoneNumber.toString(),
      address: orderDetail.address,
      customerNote: orderDetail.customerNote,
      amount: orderDetail.totalPrice,
      status: 1,
      quantity: _.size(orderDetail.products),
    };

    onCreateOrder &&
      onCreateOrder.mutate(orderFormData, {
        onSuccess: ({ data: { data, status } }) => {
          if (status) {
            const orderDetailData = createOrderDetailData(orderDetail.products, data.id);

            onCreateOrderDetail.mutate(orderDetailData, {
              onSuccess: response => onSuccessOrderDetail(response, data),
            });
          } else {
            toast.error(MESSAGE.orderAgainFailed);
          }
        },
      });
  };
  const renderAddress = (address: string, customerNote: string) =>
    customerNote ? `${address}, ${customerNote}` : address;

  return (
    <React.Fragment>
      <Grid item xs={12} lg={9}>
        <Box sx={styles.boxFormStep}>
          <Box position="relative" marginTop="20px">
            <Avatar sx={styles.wrapperIcon}>1</Avatar>
            <TickSuccess />
            <Box textAlign="center">{t('Ordered')}</Box>
          </Box>
          <Box
            sx={{
              ...styles.bridge,
              backgroundColor:
                checkStatus(orderDetail.status) === DELIVERING || checkStatus(orderDetail.status) === DELIVERED
                  ? '#ffbb38'
                  : '#E3E9EF',
            }}
          />
          <Box position="relative" marginTop="20px">
            <Avatar
              sx={{
                ...styles.wrapperIcon,
                backgroundColor:
                  checkStatus(orderDetail.status) === DELIVERING || checkStatus(orderDetail.status) === DELIVERED
                    ? '#ffbb38'
                    : '#E3E9EF',
                color:
                  checkStatus(orderDetail.status) === DELIVERING || checkStatus(orderDetail.status) === DELIVERED
                    ? '#E3E9EF'
                    : '#ffbb38',
              }}
            >
              2
            </Avatar>
            {(checkStatus(orderDetail.status) === DELIVERING || checkStatus(orderDetail.status) === DELIVERED) && (
              <TickSuccess />
            )}
            <Box textAlign="center">{t('Delivery')}</Box>
          </Box>
          <Box
            sx={{
              ...styles.bridge,
              backgroundColor: checkStatus(orderDetail.status) === DELIVERED ? '#ffbb38' : '#E3E9EF',
            }}
          />
          <Box position="relative" marginTop="20px">
            <Avatar
              sx={{
                ...styles.wrapperIcon,
                backgroundColor: checkStatus(orderDetail.status) === DELIVERED ? '#ffbb38' : '#E3E9EF',
                color: checkStatus(orderDetail.status) === DELIVERED ? '#E3E9EF' : '#ffbb38',
              }}
            >
              3
            </Avatar>
            {checkStatus(orderDetail.status) === DELIVERED && <TickSuccess />}
            <Box textAlign="center">{t('Done')}</Box>
          </Box>
        </Box>
        <Paper sx={styles.paperList}>
          <Paper sx={styles.paperHeader}>
            <Box display="flex">
              <Box sx={styles.boxTitleHeader}>
                <Typography sx={styles.boxTitleItem}>{t('Order ID:')}</Typography>
                <Typography sx={styles.boxTitleItemContent}>{orderId}</Typography>
              </Box>
              <Box sx={styles.boxTitleHeader}>
                <Typography sx={styles.boxTitleItem}>{t('Placed on:')}</Typography>
                <Typography sx={styles.boxTitleItemContent}>{formatDate(orderDetail.createdAt)}</Typography>
              </Box>
              <Box sx={styles.boxTitleHeader}>
                <Typography sx={styles.boxTitleItem}>{t('Delivering status:')}</Typography>
                <Typography sx={styles.boxTitleItemContent}>{checkStatus(orderDetail.status)}</Typography>
              </Box>
            </Box>
            <Box sx={styles.boxTitleHeader}>
              <Typography sx={styles.boxTitleItem}>{t('Shipping Address:')}</Typography>
              <Typography sx={styles.boxTitleItemContent}>
                {renderAddress(orderDetail.address, orderDetail.customerNote)}
              </Typography>
            </Box>
          </Paper>
          <Box sx={styles.containerProduct}>
            {orderDetail.products?.map((product: OrderDetailProduct) => (
              <ProductItem key={product._id} product={product} onReviewProduct={onReviewProduct} />
            ))}
          </Box>
        </Paper>
        <Grid container spacing={{ xs: 3 }}>
          <OrderSummaryDetails notCancel orderDetail={orderDetail} />
        </Grid>
      </Grid>
      <ModalConfirm
        content={t('Reorder this order')}
        openModal={modalConfirmOrder}
        handleCloseModal={() => setModalConfirmOrder(false)}
        onConfirm={() => handleOrderAgain()}
      />
    </React.Fragment>
  );
};

export default OrderDetail;
