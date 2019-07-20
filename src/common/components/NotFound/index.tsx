import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('notFound.title', { defaultValue: 'Page not found' })}</h1>
      <p>
        {t('notFound.subtitle', {
          defaultValue: "Oops! Looks like the page you have requested doesn't exist.",
        })}
      </p>
    </>
  );
};

export default NotFound;
