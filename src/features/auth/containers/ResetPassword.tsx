import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type ApiError, type ResetPasswordPayload, useResetPassword } from 'api';

import { AUTH_ROUTES } from '../routes';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { resetPassword, isLoading } = useResetPassword(token);

  const handleSubmit = useCallback(
    async (payload: ResetPasswordPayload) => {
      try {
        await resetPassword(payload);

        message.success(
          t('auth.resetPassword.success', {
            defaultValue: 'Your password was changed successfully. You can log in now.',
          })
        );

        navigate(AUTH_ROUTES.login.to);
      } catch (error) {
        message.error((error as ApiError).message);
      }
    },
    [t, navigate, resetPassword]
  );

  return <ResetPassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ResetPasswordContainer;
