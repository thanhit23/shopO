import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';

import ErrorMessage from 'src/components/ErrorMessage';
import SelectField from 'src/components/SelectField';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { TData } from 'src/pages/Profile';
import { Order } from 'src/pages/admin/commonts/types';

import { updateOrder as updateOrderService } from '../../httpClient';
import { validationSchema } from './schema';

export interface UserEditForm {
  id?: string;
  status: number;
  amount: number;
  address?: string;
  quantity?: number;
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
  row: Order;
  refetchData: () => void;
};

const ModalEdit: React.FC<Props> = ({ row, refetchData }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserEditForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      status: row?.status || 0,
      amount: row?.amount || 0,
    },
  });

  const updateOrder = useMutation({
    mutationFn: (data: UserEditForm) => updateOrderService(data),
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
    updateOrder.mutate({ ...data, address: row?.address, quantity: row?.quantity, id: row?._id });
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
                Edit Order
              </Grid>
              {/* <Grid item xs={12}>
                <MuiTextField
                  size="medium"
                  label={t('Address')}
                  message={t('Address')}
                  validate={register('billingAddress')}
                />
                <ErrorMessage name={errors.billingAddress} />
              </Grid> */}
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Amount')} message={t('Amount')} validate={register('amount')} />
                <ErrorMessage name={errors.amount} />
              </Grid>
              <Grid item xs={12}>
                <SelectField
                  options={[
                    { value: 'null', label: 'Choose' },
                    { value: 1, label: 'Order' },
                    { value: 2, label: 'Shippping' },
                    { value: 3, label: 'Done' },
                  ]}
                  name="status"
                  label={t('Status')}
                  control={control}
                />
                <ErrorMessage name={errors.status} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={2}>
              <LoadingButton variant="contained" type="submit" loading={updateOrder.isLoading}>
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
