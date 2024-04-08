import * as React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import * as process from 'process';
import { compose } from 'redux';

import { Brand, ListCategory, State } from 'src/common/types';
import ErrorMessage from 'src/components/ErrorMessage';
import SelectField from 'src/components/SelectField';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { TData } from 'src/pages/Profile';
import { Product } from 'src/pages/admin/commonts/types';

import integrationPathImage from '../../../../../helpers/images';
import { updateProduct as updateProductService } from '../../httpClient';
import { validationSchema } from './schema';

export interface UserSubmitForm {
  id: string;
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
  row,
}: {
  refetchData: () => void;
  brandList: Brand[];
  row: Product;
  categoryList: ListCategory[];
}) {
  const [open, setOpen] = React.useState(false);

  const [imageList, setImageList] = React.useState(row?.images || []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name: row?.name || '',
      images: '',
      price: row?.price || 0,
      quantity: row?.quantity || 0,
      description: row?.description || '',
      brand: row?.brand?._id || '',
      category: row?.category?._id || '',
      size: row?.size || [],
    },
  });

  useEffect(() => {
    if (row && open) {
      setImageList(row?.images || []);
      reset();
    }
  }, [open]);

  const updateProduct = useMutation({
    mutationFn: (data: UserSubmitForm) => updateProductService(data),
    onSuccess: async ({ data: { status, message } }: TData) => {
      if (status) {
        setOpen(false);
        refetchData();

        toast.success(t('Update Successfully'));
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = (data: UserSubmitForm) => {
    const images = (isEmpty(data.images) ? imageList : [...imageList, data.images]) as string[];
    updateProduct.mutate({ ...data, id: row._id, sold: 0, rating: 0, images });
  };

  const onDeleteImage = (index: number) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
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
                Update Product
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
                <Box display="flex" gap={3}>
                  {imageList.map((e, index) => (
                    <Box position="relative" width="40px" key={e + index}>
                      <Box
                        component="img"
                        sx={{
                          width: 40,
                          height: 40,
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #b7b7b7',
                        }}
                        src={e}
                      />
                      <IconButton
                        aria-label="delete"
                        sx={{
                          position: 'absolute',
                          top: '-50%',
                          right: '-50%',
                          padding: '6px',
                          color: '#767676',
                        }}
                        onClick={() => onDeleteImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
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
                  size="medium"
                  label={t('Quantity')}
                  message={t('Quantity')}
                  validate={register('quantity')}
                />
                <ErrorMessage name={errors.quantity} />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    value="S"
                    defaultChecked={row?.size?.includes('S')}
                    control={<Checkbox defaultChecked={row?.size?.includes('S')} {...register('size')} />}
                    label={t('Small')}
                  />
                  <FormControlLabel
                    value="M"
                    control={<Checkbox defaultChecked={row?.size?.includes('M')} {...register('size')} />}
                    label={t('Medium')}
                  />
                  <FormControlLabel
                    value="L"
                    defaultChecked={row?.size?.includes('L')}
                    control={<Checkbox defaultChecked={row?.size?.includes('L')} {...register('size')} />}
                    label={t('Large')}
                  />
                  <FormControlLabel
                    value="XL"
                    defaultChecked={row?.size?.includes('XL')}
                    control={<Checkbox defaultChecked={row?.size?.includes('XL')} {...register('size')} />}
                    label={t('XLarge')}
                  />
                  <ErrorMessage name={errors.size} />
                </FormGroup>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={2}>
              <LoadingButton variant="contained" type="submit" loading={updateProduct.isLoading}>
                {t('Update profile')}
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
