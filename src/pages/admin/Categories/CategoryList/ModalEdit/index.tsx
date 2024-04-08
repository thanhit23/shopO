import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';

import { ListCategory } from 'src/common/types';
import ErrorMessage from 'src/components/ErrorMessage';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { TData } from 'src/pages/Profile';

import { updateCategory as updateCategoryService } from '../../httpClient';
import { validationSchema } from './schema';

export interface UserEditForm {
  id?: string;
  name: string;
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
  row: ListCategory;
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
  } = useForm<UserEditForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name: row?.name || '',
    },
  });

  const updateCategory = useMutation({
    mutationFn: (data: UserEditForm) => updateCategoryService(data),
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

  const onSubmitForm = (data: UserEditForm) => {
    updateCategory.mutate({ ...data, id: row?.id });
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
                Edit Category
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Name')} message={t('Name')} validate={register('name')} />
                <ErrorMessage name={errors.name} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={2}>
              <LoadingButton variant="contained" type="submit" loading={updateCategory.isLoading}>
                {t('Update')}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;
