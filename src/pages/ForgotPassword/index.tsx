import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';

import ErrorMessage from 'src/components/ErrorMessage';
import MuiTextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { PATH_AUTH } from 'src/routes/paths';

import { forgotPassword } from './services';
import styles from './styles';
import { FormForgotPassword } from './types';

function ForgotPassword() {
  const schema = Yup.object().shape({
    email: Yup.string().required(t('Email is required')).email(t('Email must be a valid email')),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { email } = errors;

  const MESSAGE = {
    sendEmailSuccess: t('Please check your email'),
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormForgotPassword) => forgotPassword(data),
    onSuccess: ({ data: { status, message } }) => {
      if (status) {
        toast.success(MESSAGE.sendEmailSuccess);
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = (data: FormForgotPassword) => {
    mutate(data);
  };

  return (
    <Box sx={styles.boxResetPassword}>
      <Paper sx={styles.paper}>
        <Typography sx={styles.typography} component="h1" variant="h5">
          {t('Forgot your password')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={styles.formSubmit}>
          <Grid>
            <MuiTextField type="email" label={t('Email')} message={t('Email')} validate={register('email')} />
            <ErrorMessage name={email} />
          </Grid>
          <LoadingButton loading={isLoading} type="submit" fullWidth variant="contained" sx={styles.btnSubmit}>
            {t('Send')}
          </LoadingButton>
        </Box>
        <Box sx={styles.bottomReset}>
          {t("Don't have an account?")}

          <Link to={PATH_AUTH.register}>{t('Register')}</Link>
        </Box>
      </Paper>
    </Box>
  );
}

export const Component = ForgotPassword;
