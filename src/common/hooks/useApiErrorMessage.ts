import { useCallback } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

import { isApiError, isZodError } from 'api';

const useApiErrorMessage = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return useCallback(
    (error: unknown) => {
      if (isApiError(error)) {
        message.error(error.message);
      } else if (isZodError(error)) {
        message.error(t('global:unexpectedError'));
      }
    },
    [t, message]
  );
};

export default useApiErrorMessage;
