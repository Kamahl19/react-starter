import { useTranslation } from 'react-i18next';
import { Result } from 'antd';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      status={404}
      title={t('notFound.title', { defaultValue: 'Page not found' })}
      subTitle={t('notFound.subtitle', {
        defaultValue: "Oops! Looks like the page you have requested doesn't exist.",
      })}
    />
  );
};

export default NotFound;
