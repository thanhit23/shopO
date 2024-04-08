import React from 'react';
import { connect } from 'react-redux';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { compose } from 'redux';

import { State } from 'src/common/types';
import DropDown from 'src/components/DropDown';
import { t } from 'src/libs/intl';
import store from 'src/store';

import { CHANGE_LOCALE } from './constants';
import styles from './styles';

type Props = {
  locale: string;
};

const TopBar: React.FC<Props> = ({ locale }) => {
  const menuItems = [
    {
      title: (
        <Box display="flex" gap={1} alignItems="center">
          <img
            loading="lazy"
            width="20"
            height="13"
            srcSet={`https://flagcdn.com/w40/us.png 2x`}
            src={`https://flagcdn.com/w20/us`}
            alt=""
          />
          EN
        </Box>
      ),
      sx: { color: locale === 'en' ? 'red' : null },
      value: 'en',
      onClick: () => store.dispatch({ type: CHANGE_LOCALE, payload: { locale: 'en' } }),
    },
    {
      title: (
        <Box display="flex" gap={1} alignItems="center">
          <img
            loading="lazy"
            width="20"
            height="13"
            srcSet={`https://flagcdn.com/w40/vn.png 2x`}
            src={`https://flagcdn.com/w20/vn`}
            alt=""
          />
          VI
        </Box>
      ),
      sx: { color: locale === 'vi' ? 'red' : null },
      value: 'vi',
      onClick: () => store.dispatch({ type: CHANGE_LOCALE, payload: { locale: 'vi' } }),
    },
  ];

  return (
    <Box sx={styles.boxTopBar}>
      <Container maxWidth="lg" sx={styles.containerTopBar}>
        <Box sx={styles.boxChip}>
          <Box component="span" sx={styles.boxExpress}>
            {t('Support free Express Shipping')}
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <DropDown
            buttonIcon
            menuItem={menuItems}
            btnSx={styles.dropDownBtn}
            buttonText={
              <Box component="span" sx={styles.boxLanguage}>
                <img
                  loading="lazy"
                  width="20"
                  height="13"
                  srcSet={`https://flagcdn.com/w40/${locale === 'en' ? 'us' : 'vn'}.png 2x`}
                  src={`https://flagcdn.com/w20/${locale === 'en' ? 'us' : 'vn'}`}
                  alt=""
                />
                {t(locale === 'en' ? 'EN' : 'VI')}
                <KeyboardArrowDownIcon />
              </Box>
            }
            buttonIconSx={{ fontSize: '0.875rem' }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ global: { locale } }: State) => ({
  locale,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(TopBar);
