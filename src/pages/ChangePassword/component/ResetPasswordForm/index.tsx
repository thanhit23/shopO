import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useMutation } from '@tanstack/react-query';

import { ReactComponent as Banner } from 'src/assets/images/banner-change-password.svg';
import ErrorMessage from 'src/components/ErrorMessage';
import TextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { PATH_AUTH } from 'src/routes/paths';

import { resetPassword } from './services';
import styles from './styles';
import { FormResetPassword } from './types';
import { resetPasswordSchema } from './validationSchema';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema()),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { password, confirmPassword } = errors;

  const MESSAGE = {
    resetSuccess: t('Reset password successfully'),
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormResetPassword) => resetPassword(data),
    onSuccess: ({ data: { status, message } }) => {
      if (status) {
        navigate(PATH_AUTH.login);
        toast.success(MESSAGE.resetSuccess);
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmitForm = ({ password }: Omit<FormResetPassword, 'token'>) => {
    const token = searchParams.get('token') as string;
    mutate({ token, password });
  };

  return (
    <Grid item xs={12} lg={9}>
      <Paper sx={styles.paperAvatar}>
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={styles.formSubmit}>
              <Grid item xs={12}>
                <Box position="relative">
                  <TextField
                    size="medium"
                    label={t('New Password')}
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
                    size="medium"
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
              <LoadingButton loading={isLoading} type="submit" fullWidth variant="contained" sx={styles.btnSubmit}>
                {t('Update')}
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Banner />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ResetPasswordForm;
