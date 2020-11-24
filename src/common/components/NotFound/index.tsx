import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import { rootPath } from 'config';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      status={404}
      title={t('notFound.title', { defaultValue: 'Page not found' })}
      subTitle={t('notFound.subtitle', {
        defaultValue: "Oops! Looks like the page you have requested doesn't exist.",
      })}
      extra={
        <Link to={rootPath} replace>
          <Button type="primary">{t('notFound.goBack', { defaultValue: 'Back Home' })}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
