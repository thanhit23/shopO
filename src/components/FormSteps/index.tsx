import React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import { t } from 'src/libs/intl';

import styles from './styles';

type Props = {
  activeIndexPage: number;
};

const FormSteps: React.FC<Props> = ({ activeIndexPage }) => {
  const handleActive = (index: number) => (index <= activeIndexPage ? styles.active : styles.unActive);
  const { pathname } = useLocation();

  return (
    <Box marginBottom="20px">
      <Grid container spacing={{ xs: 3 }}>
        <Grid item xs={12}>
          <Box sx={styles.boxBreadBar}>
            <Box>
              <Chip
                label={t('1. Cart')}
                sx={{
                  ...handleActive(1),
                  ...styles.chipItem,
                }}
              />
            </Box>
            <Box
              className="bridge"
              sx={{
                ...styles.bridge,
                ...handleActive(2),
              }}
            />
            <Box>
              <Chip
                disabled={pathname === '/cart'}
                label={t('2. Details')}
                sx={{
                  ...handleActive(2),
                  ...styles.chipItem,
                }}
              />
            </Box>
            <Box
              sx={{
                ...styles.bridge,
                ...handleActive(3),
              }}
            />
            <Box>
              <Chip
                disabled={pathname === '/cart' || pathname === '/checkout'}
                label={t('3. Payment')}
                sx={{
                  ...handleActive(3),
                  ...styles.chipItem,
                }}
              />
            </Box>
            <Box
              sx={{
                ...styles.bridge,
                ...handleActive(4),
              }}
            />
            <Chip
              disabled
              label={t('4. Review')}
              sx={{
                ...handleActive(4),
                ...styles.chipItem,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormSteps;
