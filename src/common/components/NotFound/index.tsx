import { useTranslation } from 'react-i18next';
import { Result } from 'antd';

const NotFound = () => {
  const { t } = useTranslation();

  return <Result status={404} title={t('notFound.title')} subTitle={t('notFound.subtitle')} />;
};

export default NotFound;
