import { useCallback } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import is from '@sindresorhus/is';

const usePrintErrorMessage = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return useCallback(
    (error: unknown) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      if (is.nonEmptyObject(error) && is.string(error.message)) {
        message.error(error.message);
      } else if (is.string(error)) {
        message.error(error);
      } else {
        message.error(t('global:unexpectedError'));
      }
    },
    [t, message],
  );
};

export default usePrintErrorMessage;
