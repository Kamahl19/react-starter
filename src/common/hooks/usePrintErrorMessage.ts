import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const usePrintErrorMessage = () => {
  const { t } = useTranslation();

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
        window.alert(error.message);
      } else if (typeof error === 'string') {
        window.alert(error);
      } else {
        window.alert(t('global:unexpectedError'));
      }
    },
    [t],
  );
};

export default usePrintErrorMessage;
