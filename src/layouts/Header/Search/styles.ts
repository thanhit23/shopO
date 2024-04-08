import { makeStyles } from '@material-ui/core/styles';

const formControl = {
  position: 'relative',
};

const outlineInput = {
  font: 'inherit',
  letterSpacing: 'inherit',
  borderRadius: 1,
  paddingRight: 0,
  height: '44px',
  '& > input': {
    paddingRight: '38px',
    fontSize: '14px',
    color: '#646363',
  },
};

const closeIcon = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '160px',
  cursor: 'pointer',
  borderRadius: '100%',
  padding: '2px',
  '&:hover': {
    backgroundColor: '#919eab14',
  },
};

const loadingIcon = {
  position: 'absolute',
  top: '27%',
  right: '160px',
  padding: '2px',
  opacity: '.5',
  animation: 'spinner .6s linear infinite',
  '@keyframes spinner': {
    from: {
      transform: 'rotate(0)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
};

const searchTitle = {
  display: 'flex',
  gap: '4px',
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const searchValue = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const boxResult = {
  zIndex: 9999,
  position: 'absolute',
  inset: '0 auto auto 0',
  margin: 0,
  padding: '12px',
  borderRadius: '4px',
  transform: 'translate3d(362px, 70px, 0px)',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.14) 0px 1px 4px 0px',
  display: 'flex',
  flexDirection: 'column',
  width: {
    xs: '400px',
    md: '600px',
    lg: '670px',
  },
  overflow: 'hidden',
};

const boxWrapper = {
  display: 'flex',
  overflow: 'hidden',
  gap: '14px',
  padding: '10px 16px',
  alignItems: 'center',
  transitionProperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',
  '&:hover': {
    backgroundColor: '#919eab14',
  },
};

const boxImage = {
  width: '40px',
  height: '40px',
  borderRadius: '100%',
  objectFit: 'cover',
  flexShrink: 0,
};

const boxTitle = {
  fontSize: '14px',
  fontWeight: '500',
};

const btnSearch = {
  minWidth: '150px',
  height: '100%',
  borderRadius: 0,
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
};

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    '&:hover > fieldset': {
      borderColor: '#D23F57 !important',
    },
  },
  focused: {
    '& > fieldset': {
      borderColor: '#D23F57 !important',
      borderWidth: '1px !important',
    },
  },
}));

export default {
  useOutlinedInputStyles,
  btnSearch,
  formControl,
  outlineInput,
  loadingIcon,
  closeIcon,
  searchTitle,
  searchValue,
  boxResult,
  boxWrapper,
  boxImage,
  boxTitle,
};
