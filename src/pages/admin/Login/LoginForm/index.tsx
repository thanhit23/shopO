import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Dispatch, bindActionCreators, compose } from 'redux';

import { ReactComponent as YarnLogin } from 'src/assets/icons/yarn-login.svg';
import ErrorMessage from 'src/components/ErrorMessage';
import TextField from 'src/components/TextField';
import { t } from 'src/libs/intl';
import { useAdminLogin } from 'src/queries/auth';
import { PATH_AUTH } from 'src/routes/paths';

import { loginSuccess as loginSuccessAction } from '../actions';
import { Props, UserSubmitForm } from '../types';
import styles from './styles';
import { loginValidationSchema } from './validationSchema';

function LoginForm({ onLoginSuccess, onCloseDialog }: Props) {
  const navigator = useNavigate();

  const [isPassword, setIsPassword] = useState<boolean>(true);

  const { mutate, isLoading } = useAdminLogin({
    onSuccess: ({ status, data, message }) => {
      if (status) {
        onLoginSuccess(data);
        onCloseDialog instanceof Function ? onCloseDialog() : navigator('/admin');
        toast.success(t('Login successfully'));
      } else {
        setError('root.afterSubmit', { message });
      }
    },
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema()),
  });

  const { email, password, root } = errors;

  return (
    <Box sx={styles.boxAvatar}>
      <Box>
        <Typography component="h1" variant="h5" sx={styles.typography}>
          {t('Login')}
        </Typography>
        <YarnLogin />
      </Box>

      <Box component="form" onSubmit={handleSubmit(data => mutate(data))} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!!root?.afterSubmit && root?.afterSubmit.message && (
              <Alert sx={{ width: '100%' }} severity="error">
                {root?.afterSubmit.message}
              </Alert>
            )}
          </Grid>

          <Grid item xs={12}>
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
            <ErrorMessage name={email} />
          </Grid>

          <Grid item xs={12}>
            <Box position="relative">
              <TextField
                label={t('Password')}
                validate={register('password')}
                type={isPassword ? 'password' : 'text'}
                sx={{
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
            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={styles.btnSubmit}
            >
              {t('Submit')}
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Box sx={styles.boxFooterLogin}>
              <Box color="#2b3445">{t('Dont’t have an account?')}</Box>
              <Link to={PATH_AUTH.register} style={styles.linkSingUp}>
                {t('Sign Up free')}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoginSuccess: bindActionCreators(loginSuccessAction, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(LoginForm);
