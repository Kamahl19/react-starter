import { useEffect } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type ApiError, useConfirmEmail } from 'api';
import { LoadingScreen } from 'common/components';

import { AUTH_ROUTES } from '../routes';

const ConfirmEmailContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { confirmEmail, isLoading } = useConfirmEmail(token);

  useEffect(() => {
    const doConfirmEmail = async () => {
      try {
        await confirmEmail();

        message.success(t('auth.confirmEmail.success'));

        navigate(AUTH_ROUTES.login.to);
      } catch (error) {
        message.error((error as ApiError).message);
      }
    };

    doConfirmEmail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
};

export default ConfirmEmailContainer;
