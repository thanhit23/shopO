const paperInfoUser = {
  color: 'rgb(43, 52, 69)',
  boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
  overflow: 'hidden',
  borderRadius: '8px',
  display: 'flex',
  padding: '14px 32px',
  flexDirection: 'column',
  height: '100%',
  WebkitBoxAlign: 'center',
};

const boxInfoUser = {
  marginLeft: '12px',
  flex: '1 1 0px',
  '& > .wrap-info': {
    display: 'flex',
    WebkitBoxPack: 'justify',
    justifyContent: 'space-between',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
};

const avatar = {
  height: '64px',
  width: '64px',
};

const nameUser = {
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
  textTransform: 'none',
  whiteSpace: 'normal',
};

const paperDetailInfo = {
  color: 'rgb(43, 52, 69)',
  boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
  overflow: 'hidden',
  display: 'flex',
  flexWrap: 'wrap',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  cursor: 'auto',
  padding: '0.75rem 1.5rem',
};

const wrapperInfo = {
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  flex: '1 1 0',
  '& > .title': {
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'rgb(125, 135, 156)',
    marginBottom: '4px',
    textAlign: 'left',
    textTransform: 'none',
    whiteSpace: 'normal',
  },
};

export default {
  paperDetailInfo,
  paperInfoUser,
  wrapperInfo,
  boxInfoUser,
  nameUser,
  avatar,
};
