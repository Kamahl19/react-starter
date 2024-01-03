import { useMemo } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { PASSWORD_MIN_LENGTH } from '@/api';

export const useChangePasswordValidation = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      z.object({
        password: z.string().min(PASSWORD_MIN_LENGTH, {
          message: t('global:validations.password', { minLength: PASSWORD_MIN_LENGTH }),
        }),
      }),
    [t],
  );
};

export type ChangePasswordFields = z.infer<ReturnType<typeof useChangePasswordValidation>>;
