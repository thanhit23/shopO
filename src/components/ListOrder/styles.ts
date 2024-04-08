const paperHeaderList = {
  borderRadius: '10px',
  cursor: 'pointer',
  padding: '0px 18px',
  background: 'none',
  display: 'flex',
  flexWrap: 'nowrap',
};

const headerItem = {
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
  color: '#7D879C',
  marginLeft: '6px',
  marginRight: '6px',
  textAlign: 'left',
  textTransform: 'none',
  whiteSpace: 'normal',
  flex: '1 1 0',
};

const headerItemLast = {
  flex: '0 0 0!important',
  paddingLeft: '22px',
  paddingRight: '22px',
  margin: 0,
};

const noOrder = {
  display: 'block',
  margin: '0 auto',
  width: '260px',
  height: '260px',
  '& > img': {
    opacity: '.8',
    objectFit: 'cover',
  },
};

export default {
  paperHeaderList,
  headerItemLast,
  headerItem,
  noOrder,
};
