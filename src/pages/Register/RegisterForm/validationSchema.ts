import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const registerFormValidationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(t('Name is required')).max(25, t('Please enter up to 25 characters')),
    email: Yup.string().required(t('Email is required')).email(t('Email must be a valid email')),
    password: Yup.string()
      .required(t('Password is required'))
      .min(8, t('Password must be at least 8 characters'))
      .max(16, t('Please enter up to 16 characters'))
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, t('Password must contain at least 1 letter and 1 number')),
    confirmPassword: Yup.string()
      .required(t('Confirm Password is required'))
      .oneOf([Yup.ref('password')], t('Confirm Password must match password')),
  });
