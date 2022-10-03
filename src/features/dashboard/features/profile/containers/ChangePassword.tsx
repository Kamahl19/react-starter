import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ChangePasswordPayload, useChangePassword, handleApiError } from 'api';
import { useAuth } from 'common/auth';

import ChangePassword from '../components/ChangePassword';

const ChangePasswordContainer = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const { mutate, isLoading } = useChangePassword();

  const handleSubmit = useCallback(
    (payload: ChangePasswordPayload, onSuccess: VoidFunction) => {
      mutate(
        { userId, payload },
        {
          onSuccess: () => {
            message.success(t('changePassword.success'));
            onSuccess();
          },
          onError: handleApiError((msg: string) => message.error(msg)),
        }
      );
    },
    [userId, mutate, t]
  );

  return <ChangePassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ChangePasswordContainer;
