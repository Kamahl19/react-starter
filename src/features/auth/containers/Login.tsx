import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import { type LoginPayload } from 'api';
import { useLogin } from 'common/auth';

import Login from '../components/Login';

const LoginContainer = () => {
  const { t } = useTranslation();

  const { login, isLoading } = useLogin();

  const handleLogin = useCallback(
    (payload: LoginPayload) =>
      login(payload, {
        onError: () => void message.error(t('logIn.failed')),
      }),
    [t, login]
  );

  return <Login onSubmit={handleLogin} isLoading={isLoading} />;
};

export default LoginContainer;
