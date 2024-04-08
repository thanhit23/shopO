import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';

import { ReactComponent as YarnLogin } from 'src/assets/icons/yarn-login.svg';
import ErrorMessage from 'src/components/ErrorMessage';
import TextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { PATH_AUTH } from 'src/routes/paths';

import { TData } from '../../Login/types';
import { register as registerService } from '../services';
import styles from '../styles';
import { UserSubmitForm } from './types';
import { registerFormValidationSchema } from './validationSchema';

function RegisterForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(registerFormValidationSchema()),
  });

  const registerUser = useMutation({
    mutationFn: (data: UserSubmitForm) => registerService(data),
    onSuccess: ({ data: { status, message } }: TData) => {
      clearErrors('root.afterSubmit');
      if (status) {
        navigate(PATH_AUTH.login);
        toast.success(t('Register successfully'));
      } else {
        setError('root.afterSubmit', { message });
      }
    },
  });

  const handleSubmitForm = ({ email, name, password }: UserSubmitForm) => {
    registerUser.mutate({ email, name, password });
  };

  const { name, email, password, confirmPassword, root } = errors;

  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography component="h1" variant="h5" sx={styles.typography}>
          {t('Register')}
        </Typography>
        <YarnLogin />
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {!!root?.afterSubmit.message && (
            <Grid item xs={12}>
              <Alert severity="error">
                <Box sx={styles.errorMessage}>{root?.afterSubmit.message}</Box>
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box sx={styles.formControl}>
              <TextField
                label={t('Email Address')}
                validate={register('email')}
                sx={{
                  mt: 0,
                  '& .MuiInputBase-root': { borderRadius: 0 },

                  '& div > fieldset': {
                    borderColor: () => email && '#e94560',
                  },
                }}
              />
            </Box>
            <ErrorMessage name={email} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('Full Name')}
              validate={register('name')}
              sx={{
                mt: 0,
                '& .MuiInputBase-root': { borderRadius: 0 },

                '& div > fieldset': {
                  borderColor: () => name && '#e94560',
                },
              }}
            />
            <ErrorMessage name={name} />
          </Grid>
          <Grid item xs={12}>
            <Box position="relative">
              <TextField
                label={t('Password')}
                validate={register('password')}
                type={isPassword ? 'password' : 'text'}
                sx={{
                  mt: 0,
                  '& .MuiInputBase-root': { borderRadius: 0 },

                  '& div > fieldset': {
                    borderColor: () => password && '#e94560',
                  },
                }}
              />
              <IconButton
                aria-label="show-password"
                sx={styles.iconBtnShowPassword}
                onClick={() => setIsPassword(!isPassword)}
              >
                {isPassword ? (
                  <VisibilityOffIcon sx={styles.visibilityOffIcon} />
                ) : (
                  <VisibilityIcon sx={styles.visibilityIcon} />
                )}
              </IconButton>
            </Box>
            <ErrorMessage name={password} />
          </Grid>
          <Grid item xs={12}>
            <Box position="relative">
              <TextField
                label={t('Confirm Password')}
                validate={register('confirmPassword')}
                type={isConfirmPassword ? 'password' : 'text'}
                sx={{
                  mt: 0,
                  '& .MuiInputBase-root': { borderRadius: 0 },

                  '& div > fieldset': {
                    borderColor: () => confirmPassword && '#e94560',
                  },
                }}
              />
              <IconButton
                aria-label="show-password"
                sx={styles.iconBtnShowPassword}
                onClick={() => setIsConfirmPassword(!isConfirmPassword)}
              >
                {isConfirmPassword ? (
                  <VisibilityOffIcon sx={styles.visibilityOffIcon} />
                ) : (
                  <VisibilityIcon sx={styles.visibilityIcon} />
                )}
              </IconButton>
            </Box>
            <ErrorMessage name={confirmPassword} />
          </Grid>
        </Grid>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={registerUser.isLoading}
          sx={styles.btnSubmit}
        >
          {t('Submit')}
        </LoadingButton>
      </Box>
    </div>
  );
}

export default RegisterForm;
