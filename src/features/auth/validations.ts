import { useMemo } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { PASSWORD_MIN_LENGTH } from '@/api';

export const useSignUpValidation = () => {
  const { t } = useTranslation('global');

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('validations.email') }),
        password: z.string().min(PASSWORD_MIN_LENGTH, {
          message: t('validations.password', { minLength: PASSWORD_MIN_LENGTH }),
        }),
      }),
    [t],
  );
};
export type SignUpFields = z.infer<ReturnType<typeof useSignUpValidation>>;

export const useSignInValidation = () => {
  const { t } = useTranslation('global');

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('validations.email') }),
        password: z.string().min(1, { message: t('validations.required') }),
      }),
    [t],
  );
};
export type SignInFields = z.infer<ReturnType<typeof useSignInValidation>>;

export const useResetPasswordValidation = () => {
  const { t } = useTranslation('global');

  return useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('validations.email') }),
      }),
    [t],
  );
};
export type ResetPasswordFields = z.infer<ReturnType<typeof useResetPasswordValidation>>;
