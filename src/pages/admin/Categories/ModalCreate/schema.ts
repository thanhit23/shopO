import * as Yup from 'yup';

import { t } from 'src/libs/intl';

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(t('Name is required')).max(25, t('Full name must be at most 25 characters')),
  });
