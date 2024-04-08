const paperSortBar = {
  color: 'rgb(43, 52, 69)',
  boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
  overflow: 'hidden',
  height: '50px',
  borderRadius: '8px',
  marginBottom: '25px',
  display: 'flex',
  flexWrap: 'wrap',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'justify',
  justifyContent: 'space-between',
  padding: {
    sx: '1.25rem 1.25rem 0.25rem',
    sm: '1rem 1.25rem',
    md: '0.5rem 1.25rem',
  },
};

const boxQuantityResult = {
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  color: 'rgb(125, 135, 156)',
  textTransform: 'none',
  whiteSpace: 'normal',
};

const boxQuantityPaginationProduct = {
  marginTop: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '> span': {
    lineHeight: '1.5',
    color: '#7D879C',
    textTransform: 'none',
    whiteSpace: 'normal',
  },
  '> div': {
    marginTop: 0,
  },
};

export default {
  boxQuantityPaginationProduct,
  boxQuantityResult,
  paperSortBar,
};
