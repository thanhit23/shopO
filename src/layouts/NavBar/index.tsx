import React from 'react';
import { connect } from 'react-redux';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { compose } from 'redux';

import { ListCategory, State } from 'src/common/types';
import { t } from 'src/libs/intl';

import DropDown from './Dropdown';
import styles from './styles';

type Props = {
  categoryList: ListCategory[];
};

const NavBar: React.FC<Props> = ({ categoryList }) => (
  <Paper sx={styles.paper}>
    <Container sx={styles.containerNavbar}>
      <Box display="flex" alignItems="flex-end">
        <DropDown
          buttonIcon
          menuItem={categoryList}
          btnSx={styles.categoryBtn}
          buttonIconFirst={<MenuOpenIcon fontSize="small" />}
          buttonText={
            <Box component="p" sx={styles.boxBtn}>
              {t('Categories')}
            </Box>
          }
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Button sx={styles.becomeSeller}>
          <span>{t('Become a Seller')}</span>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Container>
  </Paper>
);

const mapStateToProps = ({ global: { category } }: State) => ({
  categoryList: category.list,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(NavBar);
