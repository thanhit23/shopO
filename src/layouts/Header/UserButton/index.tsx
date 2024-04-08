import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { isEmpty } from 'lodash';
import { compose } from 'redux';

import { State } from 'src/common/types';
import { Auth } from 'src/pages/Authenticated/types';

import styles from './styles';

type Props = Auth;

const UserButton: React.FC<Props> = ({ auth }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate(isEmpty(auth) ? '/auth/login' : '/profile')} sx={styles.buttonPerson}>
        {isEmpty(auth) ? <PersonOutlineOutlinedIcon /> : <Avatar src={auth.avatar} />}
      </Button>
    </div>
  );
};

const mapStateToProps = ({ global: { auth } }: State) => ({
  auth,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(UserButton);
