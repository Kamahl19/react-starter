import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useConfirmEmail } from '@/api';
import { useTokenParam, useOnMount } from '@/common/hooks';
import { Loading, ResultError } from '@/common/components';

import { AUTH_ROUTES } from '../routes';

const ConfirmEmail = () => {
  const { t } = useTranslation('auth');

  const navigate = useNavigate();

  const token = useTokenParam();

  const { mutate, isPending, isError, error } = useConfirmEmail();

  useOnMount(() => {
    mutate(token, {
      onSuccess: () => {
        toast.success(t('confirmEmail.success'));
        navigate(AUTH_ROUTES.signIn.to);
      },
    });
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultError error={error} onReset={() => window.location.reload()} />;
  }

  return <></>;
};

export default ConfirmEmail;
