import Service from 'src/service';

import { UserEditForm } from './BrandList/ModalEdit';
import { UserSubmitForm } from './ModalCreate';

export const createBrand = (data: UserSubmitForm) => Service.post('/admin/brands', data);

export const updateBrand = ({ id, ...rest }: UserEditForm) => Service.put(`/admin/brands/${id}`, rest);

export const deleteBrand = (id: string) => Service.delete(`/admin/brands/${id}`);

export const getListBrands = (data: any) => Service.get('/admin/brands', data);
