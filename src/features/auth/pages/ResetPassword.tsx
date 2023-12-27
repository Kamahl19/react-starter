import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useResetPassword } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';
import { DASHBOARD_ROUTES } from '@/features/dashboard/routes';

import { useResetPasswordValidation, type ResetPasswordFields } from '../validations';
import AuthCard from '../components/AuthCard';

const ResetPassword = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useResetPassword();

  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(useResetPasswordValidation()),
  });

  const onSubmit = useCallback(
    (values: ResetPasswordFields) =>
      mutate(
        {
          payload: values,
          redirectTo: `${window.location.origin}${DASHBOARD_ROUTES.profileChangePassword.to}`,
        },
        {
          onSuccess: () => {
            form.reset();
            setSuccess(true);
          },
          onError,
        },
      ),
    [mutate, onError, form],
  );

  const { errors } = form.formState;

  return (
    <AuthCard title={t('auth:resetPassword.title')}>
      {success ? (
        <h3>{t('auth:resetPassword.success')}</h3>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <label htmlFor="password">{t('auth:resetPassword.email')}</label>
          <input id="password" {...form.register('email')} />
          {errors.email?.message && <span>{errors.email.message}</span>}

          <button type="submit" disabled={isPending}>
            {t('global:submit')}
          </button>
        </form>
      )}
    </AuthCard>
  );
};

export default ResetPassword;
