import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import SideBarUser from 'src/components/SideBarUser';

import ResetPasswordForm from './component/ResetPasswordForm';

export interface TData {
  data: { status: boolean };
}

const ChangePassword: React.FC = () => (
  <Container maxWidth="lg" sx={{ margin: '2rem auto' }}>
    <Grid container spacing={{ xs: 3 }}>
      <SideBarUser />
      <ResetPasswordForm />
    </Grid>
  </Container>
);

export const Component = ChangePassword;
