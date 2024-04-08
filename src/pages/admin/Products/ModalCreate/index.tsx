import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';
import { compose } from 'redux';

import { Brand, ListCategory, State } from 'src/common/types';
import ErrorMessage from 'src/components/ErrorMessage';
import SelectField from 'src/components/SelectField';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';

import { TData } from '../../../Profile';
import { createProduct as createProductService } from '../httpClient';
import { validationSchema } from './schema';

export interface UserSubmitForm {
  name: string;
  role?: string;
  email: string;
  price: number;
  sold: number;
  rating: number;
  brand: string;
  category: string;
  quantity: number;
  images: string | string[];
  description: string;
  size: string[];
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
  overflow: 'auto',
  height: 'calc(100vh - 20px)',
  borderRadius: ' 10px',
};

function ModalCreate({
  refetchData,
  categoryList,
  brandList,
}: {
  refetchData: () => void;
  brandList: Brand[];
  categoryList: ListCategory[];
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name: '',
      images: '',
      description: '',
      brand: '',
      category: '',
      size: [],
    },
  });

  const createProduct = useMutation({
    mutationFn: (data: UserSubmitForm) => createProductService(data),
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
    createProduct.mutate({ ...data, sold: 0, rating: 0, images: [data.images] as string[] });
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
                Create Product
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Name')} message={t('Name')} validate={register('name')} />
                <ErrorMessage name={errors.name} />
              </Grid>
              <Grid item xs={12}>
                <SelectField
                  options={[
                    { value: 'null', label: 'Choose' },
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    ...(brandList ?? [])?.map(item => ({ value: item._id, label: item.name })),
                  ]}
                  name="brand"
                  label={t('Brand')}
                  control={control}
                />
                <ErrorMessage name={errors.brand} />
              </Grid>
              <Grid item xs={12}>
                <SelectField
                  options={[
                    { value: 'null', label: 'Choose' },
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    ...(categoryList ?? [])?.map(item => ({ value: item.id, label: item.name })),
                  ]}
                  name="category"
                  label={t('Category')}
                  control={control}
                />
                <ErrorMessage name={errors.category} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Price')} message={t('Price')} validate={register('price')} />
                <ErrorMessage name={errors.price} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField size="medium" label={t('Images')} message={t('Images')} validate={register('images')} />
                <ErrorMessage name={errors.images} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  rows={4}
                  multiline
                  size="medium"
                  label={t('Description')}
                  message={t('Description')}
                  validate={register('description')}
                />
                <ErrorMessage name={errors.description} />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  rows={4}
                  size="medium"
                  label={t('Quantity')}
                  message={t('Quantity')}
                  validate={register('quantity')}
                />
                <ErrorMessage name={errors.quantity} />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel value="S" control={<Checkbox {...register('size')} />} label={t('Small')} />
                  <FormControlLabel value="M" control={<Checkbox {...register('size')} />} label={t('Medium')} />
                  <FormControlLabel value="L" control={<Checkbox {...register('size')} />} label={t('Large')} />
                  <ErrorMessage name={errors.size} />
                </FormGroup>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton variant="contained" type="submit" loading={createProduct.isLoading}>
                {t('Create')}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({
  global: {
    brand: { list },
    category: { list: categoryList },
  },
}: State) => ({
  brandList: list,
  categoryList,
});

const withConnect = connect(mapStateToProps, null);

export const Component = compose(withConnect)(ModalCreate);
