import { Container, Grid } from '@mui/material';

import { ReactComponent as BannerLogin } from 'src/assets/icons/banner-login.svg';

import LoginPage from './LoginForm';

function Login() {
  return (
    <Container sx={{ padding: '2.5rem 0' }}>
      <Grid container>
        <Grid item xs={6} padding="2.5rem" border="1px solid #e0e0e0">
          <LoginPage />
        </Grid>
        <Grid item xs={6}>
          <BannerLogin />
        </Grid>
      </Grid>
    </Container>
  );
}

export const Component = Login;
