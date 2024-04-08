import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { getOrderDetail } from 'src/api/order';
import OrderDetailComponent from 'src/components/OrderDetail';
import SideBarUser from 'src/components/SideBarUser';
import { t } from 'src/libs/intl';
import { createComment } from 'src/pages/ProductDetail/services';
import { useCreateOrder, useCreateOrderDetail, useUpdateOrder } from 'src/queries/order';
import { PATH_AUTH } from 'src/routes/paths';

function OrderDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const orderId = useParams().id as string;

  const queryClient = useQueryClient();

  const { data: orderDetail = {}, isLoading } = useQuery({
    queryKey: ['getOrderDetail', orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
    select: ({ data: { data } }) => data,
  });

  const reviewProduct = useMutation({
    mutationFn: (data: object) => createComment(data),
  });

  const createOrder = useCreateOrder();

  const createOrderDetail = useCreateOrderDetail();

  const updateOrder = useUpdateOrder({
    onSuccess: async ({ data: { status } }) => {
      if (status) {
        await queryClient.invalidateQueries({
          queryKey: ['getOrderDetail'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['getListOrder'],
        });
      }
    },
  });

  const MESSAGE = {
    paymentSuccessMessage: t('Payment success'),
  };

  useEffect(() => {
    if (transactionStatus === '00' && _.size(orderDetail) > 0) {
      toast.success(MESSAGE.paymentSuccessMessage);
      updateOrder.mutate({
        id: orderId,
        address: orderDetail.address,
        amount: orderDetail.totalPrice,
        quantity: _.size(orderDetail.products),
        status: orderDetail.status,
        methodPayment: 2,
      });
      navigate(PATH_AUTH.order.id(orderId));
    }
  }, [transactionStatus, _.size(orderDetail)]);

  return (
    <Container maxWidth="lg" sx={{ margin: '2rem auto' }}>
      <Grid container spacing={{ xs: 3 }}>
        <SideBarUser />
        <OrderDetailComponent
          orderDetail={orderDetail}
          onCreateOrder={createOrder}
          onUpdateOrder={updateOrder}
          onReviewProduct={reviewProduct}
          onCreateOrderDetail={createOrderDetail}
          isGetOrderDetailLoading={isLoading}
        />
      </Grid>
    </Container>
  );
}

export const Component = OrderDetail;
