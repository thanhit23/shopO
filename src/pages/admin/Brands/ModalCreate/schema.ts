import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(t('Name is required')),
    logo: Yup.string(),
  });
