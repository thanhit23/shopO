export const HeaderButtonMenu = {
  cursor: 'pointer',
  width: '34px',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(237, 231, 246)',
  borderRadius: '8px',
  color: 'rgb(94, 53, 177)',
  transition: 'all 0.2s ease-in-out 0s',
  '&:hover': {
    background: 'rgb(94, 53, 177)',
    color: 'rgb(237, 231, 246)',
  },
};

export const HeaderSetting = {
  cursor: 'pointer',
  height: '48px',
  minWidth: '90px',
  borderRadius: '25px',
  color: 'rgb(33, 150, 243)',
  backgroundColor: 'rgb(227, 242, 253)',
  '& .MuiChip-label': {
    width: '100%',
    padding: '0 10px !important',
  },
  '&:hover': {
    color: 'rgb(227, 242, 253)',
    background: 'rgb(33, 150, 243) !important',
  },
};
