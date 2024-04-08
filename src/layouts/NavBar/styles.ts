const containerNavbar = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
};

const paper = {
  display: {
    xs: 'none',
    lg: 'flex',
  },
  height: '60px',
  alignItems: 'center',
  boxShadow: 'none',
  borderRadius: 0,
  backgroundColor: '#ffbb38',
};

const boxBtn = {
  display: 'flex',
  flex: '1 1 0',
  marginLeft: '10px',
  color: '#7D879C',
  textTransform: 'none',
  whiteSpace: 'normal',
};

const categoryBtn = {
  color: 'inherit',
  borderColor: 'currentColor',
  minWidth: 0,
  minHeight: 0,
  fontWeight: 600,
  textTransform: 'capitalize',
  width: '278px',
  height: '50px',
  backgroundColor: ' #F6F9FC',
  padding: '6px 8px',
  borderRadius: 0,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
};

const boxListCategories = {
  display: 'flex',
  gap: '32px',
};

const boxCategoryItem = {
  display: 'flex',
  alignItems: 'center',
};

const becomeSeller = {
  backgroundColor: '#111',
  color: '#fff',
  borderRadius: '4px',
  gap: '4px',
  '& > span': {
    fontSize: '14px',
  },
  '& > svg': {
    fontSize: '14px',
  },
};

export default {
  boxListCategories,
  containerNavbar,
  boxCategoryItem,
  becomeSeller,
  categoryBtn,
  boxBtn,
  paper,
};
