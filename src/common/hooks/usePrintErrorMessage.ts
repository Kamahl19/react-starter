import { useCallback } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

const usePrintErrorMessage = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return useCallback(
    (error: unknown) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        message.error(error.message);
      } else if (typeof error === 'string') {
        message.error(error);
      } else {
        message.error(t('global:unexpectedError'));
      }
    },
    [t, message],
  );
};

export default usePrintErrorMessage;
