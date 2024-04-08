import Service from 'src/service';

import { UserSubmitForm } from './ModalCreate';
import { UserEditForm } from './UserList/ModalEdit';

export const createUser = (data: UserSubmitForm) => Service.post('/admin/users', data);

export const updateUser = ({ id, ...rest }: UserEditForm) => Service.put(`/admin/users/${id}`, rest);

export const deleteUser = (id: string) => Service.delete(`/admin/users/${id}`);

export const getListUser = (data: any) => Service.get('/admin/users', data);
