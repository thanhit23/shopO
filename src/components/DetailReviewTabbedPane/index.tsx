import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { t } from 'src/libs/intl';

import Description from '../ProductDescription';
import Review from '../ProductReview';
import { ProductReviewType } from '../ProductReview/types';
import styles from './styles';

type Props = {
  listProductReview: ProductReviewType[];
  totalPage: number;
  onCreateComment: (data: object) => void;
  onUpdateComment: (data: object) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  onDeleteComment: (id: string) => void;
  idComment: string;
  page: number;
  setIdComment: React.Dispatch<React.SetStateAction<string>>;
};

const DetailReviewTabbedPane: React.FC<Props> = ({
  isFetching,
  listProductReview,
  onCreateComment,
  onUpdateComment,
  totalPage,
  page,
  setPage,
  idComment,
  setIdComment,
  onDeleteComment,
}) => (
  <Grid container>
    <Grid item xs={12} sx={{ marginTop: '50px' }}>
      <Description />
      <Divider sx={{ margin: '15px 0' }} />
    </Grid>
    <Grid item xs={12}>
      <Box component="h3" sx={styles.specification}>
        {t('Reviews')}:
      </Box>
      <Review
        isFetching={isFetching}
        setPage={setPage}
        listProductReview={listProductReview}
        totalPage={totalPage}
        onCreateComment={onCreateComment}
        onUpdateComment={onUpdateComment}
        onDeleteComment={onDeleteComment}
        idComment={idComment}
        page={page}
        setIdComment={setIdComment}
      />
    </Grid>
  </Grid>
);

export default DetailReviewTabbedPane;
