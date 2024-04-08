import { styles } from '../common';

const wrapNotFound = {
  display: 'flex',
  paddingLeft: '16px',
  paddingRight: '16px',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const imgNotFound = {
  display: 'block',
  maxWidth: '320px',
  width: '100%',
  marginBottom: '24px',
};

const btnGoHome = {
  letterSpacing: 'inherit',
  boxShadow: '0px 4px 16px rgba(43, 52, 69, 0.1)',
  minWidth: '0',
  minHeight: '0',
  fontWeight: '600',
  borderRadius: 0,
  textTransform: 'capitalize',
  margin: '8px',
  fontFamily: styles.fontFamilyDefault,
  '&:hover': {
    opacity: 0.8,
    boxShadow: '0px 0px 28px rgba(3, 0, 71, 0.01)',
  },
};

export default {
  wrapNotFound,
  imgNotFound,
  btnGoHome,
};
