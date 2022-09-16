import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ApiError, type ChangePasswordPayload, useChangePassword } from 'api';
import { useAuth } from 'common/auth';

import ChangePassword from '../components/ChangePassword';

const ChangePasswordContainer = () => {
  const { t } = useTranslation();

  const { userId = '' } = useAuth();

  const { changePassword, isLoading } = useChangePassword(userId);

  const handleSubmit = useCallback(
    async (payload: ChangePasswordPayload) => {
      try {
        await changePassword(payload);
        message.success(t('changePassword.success'));
      } catch (error) {
        message.error((error as ApiError).message);
      }
    },
    [changePassword, t]
  );

  return <ChangePassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ChangePasswordContainer;
