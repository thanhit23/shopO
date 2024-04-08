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
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ErrorMessage from 'src/components/ErrorMessage';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';

import { TData } from '../../../Profile';
import { createUser as createUserService } from '../httpClient';
import { validationSchema } from './schema';

export interface UserSubmitForm {
  name: string;
  role?: string;
  email: string;
  gender: number;
  password: string;
  phoneNumber: string;
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

export default function ModalCreate({ refetchData }: { refetchData: () => void }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name: '',
      email: '',
      gender: 0,
      password: '',
      phoneNumber: '',
    },
  });

  const createUser = useMutation({
    mutationFn: (data: UserSubmitForm) => createUserService(data),
    onSuccess: async ({ data: { status, message } }: TData) => {
      if (status) {
        setOpen(false);
        refetchData();

        toast.success(t('Create Successfully'));
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = (data: UserSubmitForm) => {
    createUser.mutate({ ...data, phoneNumber: String(data.phoneNumber), role: 'user' });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        + Add
      </Button>
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
                Create User
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Name')} message={t('Name')} validate={register('name')} />
                <ErrorMessage name={errors.name} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Email')} message={t('Email')} validate={register('email')} />
                <ErrorMessage name={errors.email} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  size="medium"
                  label={t('Password')}
                  message={t('Password')}
                  validate={register('password')}
                />
                <ErrorMessage name={errors.password} />
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton variant="contained" type="submit" loading={createUser.isLoading}>
                {t('Update profile')}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
