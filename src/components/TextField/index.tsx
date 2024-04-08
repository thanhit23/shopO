import { TextField as MuiTextField } from '@mui/material';

import styles from './styles';
import { MuiTextFieldType } from './types';

function TextField({ message, sx = {}, validate = {}, type = 'text', ...props }: MuiTextFieldType) {
  const renderPlaceholder = () => {
    if (message) return message;
    return '';
  };

  return (
    <MuiTextField
      fullWidth
      type={type}
      size="small"
      variant="outlined"
      placeholder={renderPlaceholder()}
      sx={{ ...styles.textField, ...sx }}
      {...validate}
      {...props}
    />
  );
}

export default TextField;
