import { useTranslation } from 'react-i18next';
import { Result } from 'antd';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      status={404}
      title={t('common:notFound.title')}
      subTitle={t('common:notFound.subtitle')}
    />
  );
};

export default NotFound;
