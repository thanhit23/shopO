import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const loginValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string().required(t('Email is required')).email(t('Email must be a valid email')),
    password: Yup.string()
      .required(t('Password is required'))
      .min(8, t('Password must be at least 8 characters'))
      .max(16, t('Please enter up to 16 characters'))
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, t('Password must contain at least 1 letter and 1 number')),
  });
