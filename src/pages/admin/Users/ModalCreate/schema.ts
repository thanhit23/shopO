import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('Name is required'))
      .max(25, t('Full name must be at most 25 characters'))
      .matches(/^[^!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]*$/, t('Full name must not contain special characters')),
    email: Yup.string().required(t('Email is required')).email(t('Email must be a valid email')),
    phoneNumber: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('Phone number is required'))
      .typeError(t('Phone number must be a number'))
      .positive(t('Phone number must be a positive number'))
      .integer(t('Phone number must be an integer'))
      .max(9999999999, t('Phone number must be at most 10 digits')),
    password: Yup.string()
      .required(t('Password is required'))
      .min(8, t('Password must be at least 8 characters'))
      .max(16, t('Please enter up to 16 characters'))
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, t('Password must contain at least 1 letter and 1 number')),
    gender: Yup.number()
      .min(1, t('Gender is required'))
      .max(2, t('Gender is required'))
      .required(t('Gender is required')),
  });
