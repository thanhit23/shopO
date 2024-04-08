import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useMutation, useQuery } from '@tanstack/react-query';

import OrderDetailComponent from 'src/components/OrderDetailAdmin';
import SideBarUser from 'src/components/SideBarUser';
import { createComment } from 'src/pages/ProductDetail/services';
import { useCreateOrderDetail } from 'src/queries/admin/order';

import { getOrderDetail } from '../httpClient';

function OrderDetail() {
  const orderId = useParams().id as string;

  const { data: orderDetail = {}, isLoading } = useQuery({
    queryKey: ['getOrderDetail', orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
    select: ({ data: { data } }) => data,
  });

  const reviewProduct = useMutation({
    mutationFn: (data: object) => createComment(data),
  });

  const createOrderDetail = useCreateOrderDetail();

  return (
    <Container maxWidth="lg" sx={{ margin: '2rem auto' }}>
      <Grid container spacing={{ xs: 3 }}>
        <SideBarUser />
        <OrderDetailComponent
          orderDetail={orderDetail}
          onReviewProduct={reviewProduct}
          onCreateOrderDetail={createOrderDetail}
          isGetOrderDetailLoading={isLoading}
        />
      </Grid>
    </Container>
  );
}

export const Component = OrderDetail;
