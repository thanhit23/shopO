import { PostOrderDetailType } from 'src/common/types';
import Service from 'src/service';

import { UserEditForm } from './OrderList/ModalEdit';

export const updateOrder = ({ id, ...rest }: UserEditForm) => Service.put(`/admin/orders/${id}`, rest);

export const deleteOrder = (id: string) => Service.delete(`/admin/orders/${id}`);

export const getListOrders = (data: any) => Service.get('/admin/orders', data);

export const createOrderDetail = (data: PostOrderDetailType) => Service.post('/admin/orders/detail', data);

export const getOrderDetail = (id: string) => Service.get(`/admin/orders/${id}/detail/${id}`);
