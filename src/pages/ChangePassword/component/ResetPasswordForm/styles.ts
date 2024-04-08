import { styles } from 'src/components/common';

const btnSubmit = {
  minWidth: '0',
  minHeight: '50px',
  maxWidth: '150px',
  borderRadius: 0,
  fontWeight: '600',
  textTransform: 'capitalize',
  letterSpacing: 'inherit',
  fontFamily: styles.fontFamilyDefault,
  boxShadow: '0px 0px 28px rgba(3, 0, 71, 0.01)',
  backgroundColor: '#111',
  '&:hover': {
    backgroundColor: '#111',
    opacity: 0.7,
    boxShadow: '0px 0px 28px rgba(3, 0, 71, 0.01)',
  },
};

const formSubmit = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const iconBtnShowPassword = {
  padding: '5px',
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
};

const visibilityOffIcon = {
  color: '#dae1e7',
  fontSize: '1.25rem',
};

const visibilityIcon = {
  color: '#7d879c',
  fontSize: '1.25rem',
};

const paperAvatar = {
  color: 'rgb(43, 52, 69)',
  boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
  overflow: 'hidden',
  borderRadius: '8px',
  position: 'relative',
  padding: '1.5rem 1.75rem',
};

export default {
  paperAvatar,
  iconBtnShowPassword,
  visibilityIcon,
  visibilityOffIcon,
  formSubmit,
  btnSubmit,
};
