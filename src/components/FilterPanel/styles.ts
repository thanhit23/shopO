import { styles } from '../common';

const wrapPaper = {
  boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)',
  borderRadius: '8px',
  padding: '18px 27px',
  overflow: 'auto',
};

const flex = { display: 'flex' };

const dividerTwo = {
  borderColor: '#F3F5F9',
  marginTop: '24px',
  marginBottom: '24px',
};

const boxPriceRange = {
  marginBottom: '16px',
  marginTop: '0px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '1.5',
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxQuantityPriceRange = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const labelFormControl = {
  margin: '0',
  fontSize: '14px',
  fontFamily: styles.fontFamilyDefault,
  fontWeight: '400',
  lineHeight: '1.5',
};

export default {
  boxQuantityPriceRange,
  labelFormControl,
  boxPriceRange,
  dividerTwo,
  wrapPaper,
  flex,
};
