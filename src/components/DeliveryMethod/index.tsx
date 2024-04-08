import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Gird from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';

import vnpay from 'src/assets/images/vnpay.png';
import { t } from 'src/libs/intl';

import styles from './styles';

type Props = {
  form: any;
};

export const METHODS = {
  VN_PAY: 1,
  CASH_ON_DELIVERY: 2,
};

const DeliveryMethod: React.FC<Props> = ({ form }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    form.setValue('method', METHODS.VN_PAY === +value ? METHODS.VN_PAY : METHODS.CASH_ON_DELIVERY);
    setSelectedValue(+value);
  };

  const renderFormVNPay = () => {
    if (selectedValue === 1) {
      return (
        <div>
          <Box marginBottom="24px">
            <Gird container sx={styles.boxPayWithVNPay}>
              <img width="80" height="80" src={vnpay} alt="VNPay" />
              <Box component={'h3'} sx={styles.eWalletVNPay}>
                {t('Continue with e-Wallet VNPay')}
              </Box>
            </Gird>
          </Box>
          <Button type="submit" variant="outlined" sx={styles.btnSubmit}>
            {t('Continue')}
          </Button>
          <Divider sx={styles.divider} />
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <Paper sx={styles.paperPayCreditCard}>
        <FormControlLabel
          sx={styles.formControlLabel}
          label={t('Pay with VNPay')}
          control={
            <Radio
              value={1}
              size="small"
              name="radio-buttons"
              onChange={handleChange}
              checked={selectedValue === 1}
              inputProps={{ 'aria-label': 'A' }}
            />
          }
        />
        <Divider sx={styles.divider} />
        {renderFormVNPay()}
        <FormControlLabel
          sx={{ ...styles.formControlLabel, marginBottom: 0 }}
          label={t('Cash On Delivery')}
          control={
            <Radio
              value={2}
              size="small"
              name="radio-buttons"
              onChange={handleChange}
              checked={selectedValue === 2}
              inputProps={{ 'aria-label': 'B' }}
            />
          }
        />
      </Paper>
    </React.Fragment>
  );
};

export default DeliveryMethod;
