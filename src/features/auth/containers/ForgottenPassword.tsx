import { useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ForgottenPasswordPayload, useForgottenPassword, handleApiError } from 'api';

import { AUTH_ROUTES } from '../routes';
import ForgottenPassword from '../components/ForgottenPassword';

const ForgottenPasswordContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { mutate, isLoading } = useForgottenPassword();

  const handleSubmit = useCallback(
    (payload: ForgottenPasswordPayload) =>
      mutate(payload, {
        onSuccess: () => {
          message.success(t('forgottenPassword.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError: handleApiError((msg: string) => message.error(msg)),
      }),
    [t, navigate, mutate]
  );

  return <ForgottenPassword isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default ForgottenPasswordContainer;
