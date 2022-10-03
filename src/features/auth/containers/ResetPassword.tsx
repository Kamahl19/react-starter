import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type ResetPasswordPayload, useResetPassword, handleApiError } from 'api';

import { AUTH_ROUTES } from '../routes';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { mutate, isLoading } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) => {
      mutate(
        { token, payload },
        {
          onSuccess: () => {
            message.success(t('resetPassword.success'));
            navigate(AUTH_ROUTES.login.to);
          },
          onError: handleApiError((msg: string) => message.error(msg)),
        }
      );
    },
    [t, navigate, mutate, token]
  );

  return <ResetPassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ResetPasswordContainer;
