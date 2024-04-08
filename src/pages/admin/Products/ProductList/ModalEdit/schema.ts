import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(t('Name is required')),
    brand: Yup.string().test((value, context) => {
      if (value === 'null' || value === '') {
        return context.createError({
          message: 'Brand is required',
        });
      }
      return true;
    }),
    category: Yup.string().test((value, context) => {
      if (value === 'null' || value === '') {
        return context.createError({
          message: 'Category is required',
        });
      }
      return true;
    }),
    price: Yup.number().required(t('Price is required')).typeError(t('Price is required')),
    images: Yup.string(),
    description: Yup.string().required(t('Description is required')),
    quantity: Yup.number().required(t('Quantity is required')).typeError(t('Quantity is required')),
    size: Yup.array()
      .required(t('Size is required'))
      .test((value, context) => {
        if ((value as string[]).length === 0) {
          return context.createError({
            message: 'Size is required',
          });
        }
        return true;
      }),
  });
