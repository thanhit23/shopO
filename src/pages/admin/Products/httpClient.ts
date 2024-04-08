import Service from 'src/service';

import { UserSubmitForm } from './ModalCreate';
import { UserSubmitForm as UserEditForm } from './ProductList/ModalEdit';

export const createProduct = (data: UserSubmitForm) => Service.post('/admin/products', data);

export const updateProduct = ({ id, ...rest }: UserEditForm) => Service.put(`/admin/products/${id}`, rest);

export const deleteProduct = (id: string) => Service.delete(`/admin/products/${id}`);

export const getListProduct = (data: any) => Service.get('/admin/products', data);
