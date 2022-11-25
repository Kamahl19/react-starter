import { useEffect } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useConfirmEmail } from 'api';
import { LoadingScreen, ResultError } from 'common/components';

import { AUTH_ROUTES } from '../../routes';

const ConfirmEmail = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const {
    mutate: confirmEmail,
    isLoading: confirmEmailIsLoading,
    isError: isConfirmEmailError,
    error: confirmEmailError,
  } = useConfirmEmail();

  useEffect(() => {
    confirmEmail(token, {
      onSuccess: () => {
        message.success(t('confirmEmail.success'));
        navigate(AUTH_ROUTES.login.to);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (confirmEmailIsLoading) {
    return <LoadingScreen />;
  }

  if (isConfirmEmailError) {
    return <ResultError onReset={() => window.location.reload()} error={confirmEmailError} />;
  }

  return <></>;
};

export default ConfirmEmail;
