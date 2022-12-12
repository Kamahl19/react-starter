import { useCallback } from 'react';
import { message } from 'antd';

import { isApiError } from 'api';

const useApiErrorMessage = () =>
  useCallback((error: unknown) => {
    if (isApiError(error)) {
      message.error(error.message);
    }
  }, []);

export default useApiErrorMessage;
