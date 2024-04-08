import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BreadCrumb from 'src/components/BreadCrumb';
import DetailReviewTabbedPane from 'src/components/DetailReviewTabbedPane';
import ProductBriefing from 'src/components/ProductBriefing';
import { ProductReviewType } from 'src/components/ProductReview/types';
import { t } from 'src/libs/intl';
import { useGetProductDetail } from 'src/queries/product';

import { createComment, deleteComment, getComments, updateComment } from './services';

export const DescriptionContext = createContext({
  description: '',
  isLoading: false,
});

function ProductDetail() {
  const queryClient = useQueryClient();

  const MESSAGE = {
    DELETE_SUCCESS: t('Delete successfully'),
    UPDATE_SUCCESS: t('Update successfully'),
    CREATE_SUCCESS: t('Create successfully'),
  };

  const [listProductReview, setListProductReview] = useState<ProductReviewType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [idComment, setIdComment] = useState<string>('');

  const [searchParams] = useSearchParams();

  const productId = searchParams.get('id') as string;
  const { data, isLoading } = useGetProductDetail(productId);

  const productReview = useQuery({
    queryKey: ['getProductReview', page],
    queryFn: () => getComments(productId, page),
    onSuccess: ({ data: { data, meta } }) => {
      setTotalPage(meta?.totalPages);
      setListProductReview(data);
    },
  });

  const commentCreate = useMutation({
    mutationFn: (data: object) => createComment(data),
    onSuccess: ({ data: { status } }) => {
      if (status) {
        void queryClient.invalidateQueries({
          queryKey: ['getProductReview', page],
        });
        toast.success(MESSAGE.CREATE_SUCCESS);
      }
    },
  });

  const commentUpdate = useMutation({
    mutationFn: (data: object) => updateComment(data, idComment, productId),
    onSuccess: ({ data: { status } }) => {
      if (status) {
        void queryClient.invalidateQueries({
          queryKey: ['getProductReview', page],
        });
        toast.success(MESSAGE.UPDATE_SUCCESS);
      }
    },
  });

  const commentDelete = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId, productId),
    onSuccess: ({ data: { status } }) => {
      if (status) {
        void queryClient.invalidateQueries({
          queryKey: ['getProductReview', page],
        });
        toast.success(MESSAGE.DELETE_SUCCESS);
      }
    },
  });

  const handleCreateComment = async (data: object) => {
    await commentCreate.mutateAsync(data);
  };

  const handleUpdateComment = (data: object) => {
    commentUpdate.mutate(data);
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '32px auto' }}>
      <BreadCrumb />

      <ProductBriefing product={data} isLoading={isLoading} />

      <DescriptionContext.Provider
        value={{
          description: data?.description || '',
          isLoading,
        }}
      >
        <DetailReviewTabbedPane
          listProductReview={listProductReview}
          onCreateComment={handleCreateComment}
          onUpdateComment={handleUpdateComment}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          isFetching={productReview.isFetching}
          idComment={idComment}
          setIdComment={setIdComment}
          onDeleteComment={commentDelete.mutate}
        />
      </DescriptionContext.Provider>
    </Container>
  );
}
export const Component = ProductDetail;
