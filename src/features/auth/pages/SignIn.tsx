import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSignIn } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';

import { useSignInValidation, type SignInFields } from '../validations';
import { AUTH_ROUTES } from '../routes';
import AuthCard from '../components/AuthCard';

const SignIn = () => {
  const { t } = useTranslation();

  const { signIn, isPending } = useSignIn();

  const onError = usePrintErrorMessage();

  const onSubmit = useCallback(
    (values: SignInFields) => signIn(values, { onError }),
    [signIn, onError],
  );

  const form = useForm<SignInFields>({ resolver: zodResolver(useSignInValidation()) });

  const { errors } = form.formState;

  return (
    <AuthCard title={t('auth:signIn.title')}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="email">{t('auth:signIn.email')}</label>
        <input id="email" {...form.register('email')} />
        {errors.email?.message && <span>{errors.email.message}</span>}

        <label htmlFor="password">{t('auth:signIn.password')}</label>
        <input type="password" id="password" {...form.register('password')} />
        {errors.password?.message && <span>{errors.password.message}</span>}

        <p>
          <Link to={AUTH_ROUTES.resetPassword.to}>{t('auth:signIn.resetPassword')}</Link>
        </p>

        <button type="submit" disabled={isPending}>
          {t('auth:signIn.submit')}
        </button>
      </form>
    </AuthCard>
  );
};

export default SignIn;
