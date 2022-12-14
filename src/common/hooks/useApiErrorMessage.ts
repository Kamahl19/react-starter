import { useCallback } from 'react';
import { App } from 'antd';

import { isApiError } from 'api';

const useApiErrorMessage = () => {
  const { message } = App.useApp();

  return useCallback(
    (error: unknown) => {
      if (isApiError(error)) {
        message.error(error.message);
      }
    },
    [message]
  );
};

export default useApiErrorMessage;
