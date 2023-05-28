import { useEffect } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useConfirmEmail } from 'api';
import { useTokenParam } from 'common/hooks';
import { LoadingScreen, ResultError } from 'common/components';

import { AUTH_ROUTES } from '../routes';

const ConfirmEmail = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const token = useTokenParam();

  const { mutate, isLoading, isError, error } = useConfirmEmail();

  useEffect(() => {
    mutate(token, {
      onSuccess: () => {
        message.success(t('auth:confirmEmail.success'));
        navigate(AUTH_ROUTES.signIn.to);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError onReset={() => window.location.reload()} error={error} />;
  }

  return <></>;
};

export default ConfirmEmail;
