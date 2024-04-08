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
import { User } from 'src/pages/admin/commonts/types';

import { updateUser as updateUserService } from '../../httpClient';
import { validationSchema } from './schema';

export interface UserEditForm {
  name: string;
  id?: string;
  gender: number;
  location: string;
  phoneNumber: number | string;
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
  row: User;
  refetchData: () => void;
};

const ModalEdit: React.FC<Props> = ({ row, refetchData }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<UserEditForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name: row?.name || '',
      gender: row?.gender || 0,
      location: row?.location || '',
      phoneNumber: Number(row?.phoneNumber) || '',
    },
  });

  const updateUser = useMutation({
    mutationFn: (data: UserEditForm) => updateUserService(data),
    onSuccess: async ({ data: { status, message } }: TData) => {
      if (status) {
        refetchData();

        setOpen(false);

        toast.success(t('Create Successfully'));
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = (data: UserEditForm) => {
    updateUser.mutate({ ...data, phoneNumber: String(data.phoneNumber), id: row?.id });
  };

  return (
    <div>
      <Button onClick={handleOpen}> Edit</Button>
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
                Edit User
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Name')} message={t('Name')} validate={register('name')} />
                <ErrorMessage name={errors.name} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  size="medium"
                  label={t('Address')}
                  message={t('Address')}
                  validate={register('location')}
                />
                <ErrorMessage name={errors.location} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  size="medium"
                  label={t('Phone number')}
                  message={t('Phone number')}
                  validate={register('phoneNumber')}
                />
                <ErrorMessage name={errors.phoneNumber} />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup row>
                  <FormControlLabel
                    checked={+watch('gender') === 1}
                    value={1}
                    control={<Radio {...register('gender')} />}
                    label={t('Female')}
                  />
                  <FormControlLabel
                    checked={+watch('gender') === 2}
                    value={2}
                    control={<Radio {...register('gender')} />}
                    label={t('Male')}
                  />
                </RadioGroup>
                <ErrorMessage name={errors.gender} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={2}>
              <LoadingButton variant="contained" type="submit" loading={updateUser.isLoading}>
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
