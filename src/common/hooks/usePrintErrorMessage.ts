import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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
        toast.error(error.message);
      } else if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error(t('global:unexpectedError'));
      }
    },
    [t],
  );
};

export default usePrintErrorMessage;
