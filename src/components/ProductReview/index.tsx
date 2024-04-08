import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import { compose } from 'redux';

import { State } from 'src/common/types';
import Pagination from 'src/components/Pagination';
import SkeletonAnimation from 'src/components/Skeleton';
import { t } from 'src/libs/intl';

import CommentItem from '../CommentItem';
import FormComment from '../FormComment';
import styles from './styles';
import { ProductReviewType, ReviewTypes } from './types';

function ProductReview({
  listProductReview,
  onCreateComment,
  onUpdateComment,
  totalPage,
  setPage,
  page,
  isFetching,
  auth,
  onDeleteComment,
  idComment,
  setIdComment,
}: ReviewTypes) {
  const idUser = auth?.id;

  const handleOnChange = (value: number) => {
    setPage(value);
  };

  return (
    <Box>
      {isFetching ? (
        <SkeletonAnimation />
      ) : listProductReview.length !== 0 ? (
        <Box>
          {listProductReview.map((item: ProductReviewType) => (
            <CommentItem
              key={item._id}
              data={item}
              setIdComment={setIdComment}
              onDeleteComment={onDeleteComment}
              idComment={idComment}
              onUpdateComment={onUpdateComment}
              idUser={idUser}
            />
          ))}
          <Pagination count={totalPage} page={page} onChange={handleOnChange} />
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', fontWeight: '500', color: '#637182' }}>{t('No comments yet')}</Box>
      )}
      {idUser && (
        <Box>
          <Box component="h2" sx={styles.titleReviewProduct}>
            {t('Write review for this product')}
          </Box>
          <FormComment onSubmit={onCreateComment} />
        </Box>
      )}
    </Box>
  );
}
const mapStateToProps = ({ global: { auth } }: State) => ({
  auth,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(ProductReview);
