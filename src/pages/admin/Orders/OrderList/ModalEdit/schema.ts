import * as Yup from 'yup';

export const validationSchema = () =>
  Yup.object().shape({
    status: Yup.number(),
    amount: Yup.number(),
    billingAddress: Yup.string(),
  });
