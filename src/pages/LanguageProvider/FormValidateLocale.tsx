import { setLocale } from 'yup';

import { t } from 'src/libs/intl';

export function FormValidateLocale() {
  setLocale({
    string: {
      email: t('Please enter correct email format'),
      min: t('Please enter must be at least 6 characters'),
      max: t('Please enter up to 32 characters'),
    },
    mixed: {
      required: t('This field is required'),
    },
  });
  return null;
}
