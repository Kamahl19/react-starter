import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChangePassword } from '@/api';
import { useAuth } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';

import { useChangePasswordValidation, type ChangePasswordFields } from '../validations';

const ChangePassword = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(useChangePasswordValidation()),
  });

  const onSubmit = useCallback(
    (values: ChangePasswordFields) =>
      mutate(
        { userId, payload: values },
        {
          onSuccess: () => {
            form.reset();
            window.alert(t('profile:changePassword.success'));
          },
          onError,
        },
      ),
    [t, userId, mutate, form, onError],
  );

  const { errors } = form.formState;

  return (
    <>
      <h4>{t('profile:changePassword.title')}</h4>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="password">{t('profile:changePassword.password')}</label>
        <input type="password" id="password" {...form.register('password')} />
        {errors.password?.message && <span>{errors.password.message}</span>}

        <button type="submit" disabled={isPending}>
          {t('global:save')}
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
