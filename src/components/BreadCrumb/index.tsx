import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Breadcrumbs } from '@mui/material';

import { t } from 'src/libs/intl';

export default function BreadCrumb() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#666666', gap: '0 3px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" color="inherit" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0 3px' }}>
          {t('Home')}
        </Link>
        <Link color="inherit" to="#" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0 3px' }}>
          {t('Single Product')}
        </Link>
      </Breadcrumbs>
    </Box>
  );
}
