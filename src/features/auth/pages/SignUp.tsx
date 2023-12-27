import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser, useFetchUserEmailAvailability } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';

import { useSignUpValidation, type SignUpFields } from '../validations';
import AuthCard from '../components/AuthCard';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useCreateUser();

  const form = useForm<SignUpFields>({ resolver: zodResolver(useSignUpValidation()) });

  const onSubmit = useCallback(
    (values: SignUpFields) =>
      mutate(values, {
        onSuccess: () => {
          form.reset();
          setSuccess(true);
        },
        onError,
      }),
    [mutate, onError, setSuccess, form],
  );

  const [emailValue] = useDebounce(form.watch('email'), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  const { errors } = form.formState;

  return (
    <AuthCard title={t('auth:signUp.title')}>
      {success ? (
        <>
          <h3>{t('auth:signUp.success.title')}</h3>
          <h4>{t('auth:signUp.success.subTitle')}</h4>
        </>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <label htmlFor="email">{t('auth:signUp.email')}</label>
          <input id="email" {...form.register('email')} />
          {errors.email?.message && <span>{errors.email.message}</span>}
          {!isUserEmailAvailable && <span>{t('auth:signUp.emailTaken')}</span>}

          <label htmlFor="password">{t('auth:signUp.password')}</label>
          <input type="password" id="password" {...form.register('password')} />
          {errors.password?.message && <span>{errors.password.message}</span>}

          <button type="submit" disabled={isPending}>
            {t('auth:signUp.submit')}
          </button>
        </form>
      )}
    </AuthCard>
  );
};

export default SignUp;
