import * as Yup from 'yup';

export const validationSchema = () =>
  Yup.object().shape({
    content: Yup.string(),
  });
