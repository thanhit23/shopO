import discountBanner from 'src/assets/images/discount-banner-3.jpeg';

const containerEventNotificationBanner = {
  maxHeight: '307px',
  position: 'relative',
  marginTop: '80px',
  textAlign: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${discountBanner})`,
};

const bgLeft = {
  position: 'absolute',
  left: '0',
  top: '-87px',
  width: '520px',
  height: '394px',
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
};

const boxTimeSaleOff = {
  position: 'relative',
  left: '100px',
  width: '100%',
  height: '100%',
  marginBottom: 0,
  marginTop: 0,
  fontSize: '30px',
  fontWeight: 400,
  lineHeight: 1,
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxSaleOff = {
  lineHeight: 1.5,
  fontSize: '1.875rem',
  fontWeight: 700,
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxSaleOffDescription = {
  lineHeight: 1.5,
  fontSize: '18px',
  fontWeight: 400,
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxTitle = {
  position: 'relative',
  left: '100px',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '8px',
  marginTop: '15px',
  fontSize: '50px',
  fontWeight: 700,
  lineHeight: 1,
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxShipping = {
  marginBottom: '32px',
  marginTop: 0,
  fontSize: '18px',
  fontWeight: 600,
  textTransform: 'none',
  whiteSpace: 'normal',
};

const btnShop = {
  backgroundColor: '#ffbb38',
  boxShadow: '0px 4px 16px rgb(43 52 69 / 10%)',
  minWidth: 0,
  minHeight: 0,
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#111',
  borderRadius: 0,
  transition: 'all 0.3s',
  padding: '0.6rem 2.5rem',
  fontSize: '0.9375rem',
  lineHeight: 1.75,
};

export default {
  containerEventNotificationBanner,
  boxSaleOffDescription,
  boxTimeSaleOff,
  boxShipping,
  boxSaleOff,
  boxTitle,
  btnShop,
  bgLeft,
};
