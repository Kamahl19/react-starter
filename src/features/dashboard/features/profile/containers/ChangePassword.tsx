import { useCallback } from 'react';
import { message } from 'antd';

import { type ApiError, type ChangePasswordPayload, useChangePassword } from 'api';
import { useAuth } from 'common/auth';

import ChangePassword from '../components/ChangePassword';

const ChangePasswordContainer = () => {
  const { userId = '' } = useAuth();

  const { changePassword, isLoading } = useChangePassword(userId);

  const handleSubmit = useCallback(
    async (payload: ChangePasswordPayload) => {
      try {
        await changePassword(payload);
      } catch (error) {
        message.error((error as ApiError).message);
      }
    },
    [changePassword]
  );

  return <ChangePassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ChangePasswordContainer;
