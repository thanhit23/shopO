import Service from 'src/service';

import { CommentEditForm } from './CommentList/ModalEdit';

export const updateComment = ({ id, ...rest }: CommentEditForm) => Service.put(`/admin/product-reviews/${id}`, rest);

export const deleteComment = (id: string) => Service.delete(`/admin/product-reviews/${id}`);

export const getListComment = (data: any) => Service.get('/admin/product-reviews', data);
