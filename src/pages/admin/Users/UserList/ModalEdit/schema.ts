import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('Name is required'))
      .max(25, t('Full name must be at most 25 characters'))
      .matches(/^[^!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]*$/, t('Full name must not contain special characters')),
    location: Yup.string().max(100, t('Location must be at most 100 characters')),
    phoneNumber: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('Phone number is required'))
      .typeError(t('Phone number must be a number'))
      .positive(t('Phone number must be a positive number'))
      .integer(t('Phone number must be an integer'))
      .max(9999999999, t('Phone number must be at most 10 digits')),
    gender: Yup.number()
      .min(1, t('Gender is required'))
      .max(2, t('Gender is required'))
      .required(t('Gender is required')),
  });
