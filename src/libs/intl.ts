import { useIntl } from 'react-intl';

const t = (value: string) => {
  const { formatMessage } = useIntl();

  return formatMessage({ id: value, defaultMessage: value });
};

export { t };
