import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { type CreateUserPayload, useCreateUser, handleApiError } from 'api';

import { AUTH_ROUTES } from '../routes';
import SignUp from '../components/SignUp';

const SignUpContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateUser();

  const handleSubmit = useCallback(
    (payload: CreateUserPayload) =>
      mutate(payload, {
        onSuccess: () => {
          message.success(t('signUp.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError: handleApiError((msg: string) => message.error(msg)),
      }),
    [t, navigate, mutate]
  );

  return <SignUp isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default SignUpContainer;
