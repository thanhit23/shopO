import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const resetPasswordSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required(t('New Password is required'))
      .min(8, t('Password must be at least 8 characters'))
      .max(16, t('Please enter up to 16 characters'))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/, t('Password must contain at least one letter and one number')),
    confirmPassword: Yup.string()
      .required(t('Confirm Password is required'))
      .oneOf([Yup.ref('password')], t('Confirm Password must match password')),
  });
