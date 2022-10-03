import { useEffect } from 'react';
import { message, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { isApiError, useConfirmEmail } from 'api';
import { LoadingScreen } from 'common/components';

import { AUTH_ROUTES } from '../routes';

const ConfirmEmailContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { mutate, isLoading, error } = useConfirmEmail();

  useEffect(() => {
    mutate(token, {
      onSuccess: () => {
        message.success(t('confirmEmail.success'));
        navigate(AUTH_ROUTES.login.to);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Result
        status="error"
        title={t('confirmEmail.failed')}
        subTitle={isApiError(error) ? error.message : ''}
      />
    );
  }

  return null;
};

export default ConfirmEmailContainer;
