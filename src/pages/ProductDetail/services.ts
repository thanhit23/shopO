import Service from 'src/service';

export const getComments = (idProduct: string, page: number) =>
  Service.get(`/v1/product/reviews?product=${idProduct}&page=${page}`);
export const createComment = (data: object) => Service.post(`/v1/product-review`, data);
export const deleteComment = (commentId: string, productId: string) =>
  Service.delete(`/v1/product-review/${commentId}?productId=${productId}`);
export const updateComment = (data: object, idComment: string, productId: string) =>
  Service.put(`/v1/product-review/${idComment}?productId=${productId}`, data);
