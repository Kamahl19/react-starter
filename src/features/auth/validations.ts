import { useMemo } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { PASSWORD_MIN_LENGTH } from '@/api';

export const useSignUpValidation = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('global:validations.email') }),
        password: z.string().min(PASSWORD_MIN_LENGTH, {
          message: t('global:validations.password', { minLength: PASSWORD_MIN_LENGTH }),
        }),
      }),
    [t],
  );
};
export type SignUpFields = z.infer<ReturnType<typeof useSignUpValidation>>;

export const useSignInValidation = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('global:validations.email') }),
        password: z.string().min(1, { message: t('global:validations.required') }),
      }),
    [t],
  );
};
export type SignInFields = z.infer<ReturnType<typeof useSignInValidation>>;

export const useResetPasswordValidation = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('global:validations.email') }),
      }),
    [t],
  );
};
export type ResetPasswordFields = z.infer<ReturnType<typeof useResetPasswordValidation>>;
