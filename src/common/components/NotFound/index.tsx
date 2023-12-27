import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('common:notFound.title')}</h2>
      <h3>{t('common:notFound.subtitle')}</h3>
    </div>
  );
};

export default NotFound;
