import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from 'src/components/ErrorMessage';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { TData } from 'src/pages/Profile';
import { Comment } from 'src/pages/admin/commonts/types';

import { updateComment as updateCommentService } from '../../httpClient';
import { validationSchema } from './schema';

export interface CommentEditForm {
  content: string;
  id?: string;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
  row: Comment;
  refetchData: () => void;
};

const ModalEdit: React.FC<Props> = ({ row, refetchData }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CommentEditForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      content: row?.content || '',
    },
  });

  const updateComment = useMutation({
    mutationFn: (data: CommentEditForm) => updateCommentService(data),
    onSuccess: async ({ data: { status, message } }: TData) => {
      if (status) {
        refetchData();

        setOpen(false);

        toast.success(t('Update Successfully'));
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = (data: CommentEditForm) => {
    updateComment.mutate({ ...data, id: row?._id });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={{ xs: 3 }}>
              <Grid item xs={12}>
                Edit Comment
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  rows={4}
                  multiline
                  size="medium"
                  label={t('Description')}
                  message={t('Description')}
                  validate={register('content')}
                />
                <ErrorMessage name={errors.content} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={2}>
              <LoadingButton variant="contained" type="submit" loading={updateComment.isLoading}>
                {t('Update profile')}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;
