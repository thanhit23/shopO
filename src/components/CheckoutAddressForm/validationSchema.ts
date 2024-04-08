import * as Yup from 'yup';

export const validationSchema = (t: any) =>
  Yup.object().shape({
    fullName: Yup.string()
      .required(t('Name is required'))
      .max(25, t('Full name must be at most 25 characters'))
      .matches(/^[^!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]*$/, t('Full name must not contain special characters')),
    phoneNumber: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('Phone number is required'))
      .typeError(t('Phone number must be a number'))
      .positive(t('Phone number must be a positive number'))
      .integer(t('Phone number must be an integer'))
      .max(9999999999, t('Phone number must be at most 10 digits')),
    address: Yup.string().required(t('City is required')),
  });
