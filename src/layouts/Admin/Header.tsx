import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Avatar, Box, Button, Chip, Menu, MenuItem, Toolbar } from '@mui/material';

import logo from 'src/assets/images/logo.svg';

import { logout } from '../../pages/Authenticated/actions';
import store from '../../store';
import { HeaderButtonMenu, HeaderSetting } from './styles';

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ state, setState }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    store.dispatch(logout());
  };

  return (
    <Toolbar
      sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', zIndex: 1201, backgroundColor: '#fff' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img width="150" height="60" src={logo} alt="logo" />
        <Box sx={HeaderButtonMenu} onClick={() => setState(!state)}>
          <MenuIcon />
        </Box>
      </Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Chip
          sx={HeaderSetting}
          label={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Avatar src={undefined} sx={{ width: '34px', height: '34px' }} />
              <SettingsOutlinedIcon fontSize="medium" />
            </Box>
          }
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default Header;
