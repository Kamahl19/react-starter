import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useConfirmEmail } from '@/api';
import { useTokenParam, useOnMount } from '@/common/hooks';
import { LoadingScreen, ResultError } from '@/common/components';

import { AUTH_ROUTES } from '../routes';

const ConfirmEmail = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const token = useTokenParam();

  const { mutate, isPending, isError, error } = useConfirmEmail();

  useOnMount(() => {
    mutate(token, {
      onSuccess: () => {
        window.alert(t('auth:confirmEmail.success'));
        navigate(AUTH_ROUTES.signIn.to);
      },
    });
  });

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError error={error} onReset={() => window.location.reload()} />;
  }

  return <></>;
};

export default ConfirmEmail;
