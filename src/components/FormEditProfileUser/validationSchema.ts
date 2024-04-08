import * as Yup from 'yup';

export const editProfileValidationSchema = (t: any) =>
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
    location: Yup.string().required(t('Location is required')),
    gender: Yup.number().required(t('Gender is required')),
  });
