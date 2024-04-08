import * as React from 'react';
import { Link } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { t } from 'src/libs/intl';
import RegisterForm from 'src/pages/Register/RegisterForm';
import { PATH_AUTH } from 'src/routes/paths';

import styles from './styles';

function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.boxWrap}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('Register')}
        </Typography>
        <RegisterForm />
      </Box>
      <Box sx={styles.boxFooterLogin}>
        <Box color="#2b3445">{t('Already have an account?')}</Box>
        <Link to={PATH_AUTH.login} style={styles.linkSingUp}>
          {t('Login')}
        </Link>
      </Box>
    </Container>
  );
}

export default Register;
