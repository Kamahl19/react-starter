import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { type ApiError, type CreateUserPayload, useCreateUser } from 'api';

import { AUTH_ROUTES } from '../routes';
import SignUp from '../components/SignUp';

const SignUpContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { createUser, isLoading } = useCreateUser();

  const handleSubmit = useCallback(
    async (payload: CreateUserPayload) => {
      try {
        await createUser(payload);

        message.success(
          t('auth.signUp.success', {
            defaultValue:
              'Your account has been successfully created. An e-mail with further instructions has been sent to your e-mail address.',
          })
        );

        navigate(AUTH_ROUTES.login.to);
      } catch (error) {
        message.error((error as ApiError).message);
      }
    },
    [t, navigate, createUser]
  );

  return <SignUp isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default SignUpContainer;
