import Service from 'src/service';

import { UserEditForm } from './CategoryList/ModalEdit';
import { UserSubmitForm } from './ModalCreate';

export const createBrand = (data: UserSubmitForm) => Service.post('/admin/categories', data);

export const updateCategory = ({ id, ...rest }: UserEditForm) => Service.put(`/admin/categories/${id}`, rest);

export const deleteBrand = (id: string) => Service.delete(`/admin/categories/${id}`);

export const getListCategories = (data: any) => Service.get('/admin/categories', data);
