import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ApiError, type ForgottenPasswordPayload, useForgottenPassword } from 'api';

import { AUTH_ROUTES } from '../routes';
import ForgottenPassword from '../components/ForgottenPassword';

const ForgottenPasswordContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { forgottenPassword, isLoading } = useForgottenPassword();

  const handleSubmit = useCallback(
    async (payload: ForgottenPasswordPayload) => {
      try {
        await forgottenPassword(payload);

        message.success(t('auth.forgottenPassword.success'));

        navigate(AUTH_ROUTES.login.to);
      } catch (error) {
        message.error((error as ApiError).message);
      }
    },
    [t, navigate, forgottenPassword]
  );

  return <ForgottenPassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ForgottenPasswordContainer;
