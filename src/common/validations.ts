import { useMemo } from 'react';
import { useTranslation, type TFunction } from 'react-i18next';
import { type FormRule } from 'antd';

import { PASSWORD_MIN_LENGTH } from 'api';

const stringMinLength =
  (min: number) =>
  (t: TFunction): FormRule => ({
    type: 'string',
    min,
    message: t('validation.stringMinLength', { min }),
  });

const required = (t: TFunction): FormRule => ({
  required: true,
  message: t('validation.required'),
});

const email = (t: TFunction): FormRule => ({
  type: 'email',
  message: t('validation.email'),
});

export const useValidationRules = () => {
  const { t } = useTranslation();

  return useMemo<Record<string, FormRule[]>>(
    () => ({
      required: [required(t)],
      email: [required(t), email(t)],
      passwordNoCheck: [required(t)],
      password: [required(t), stringMinLength(PASSWORD_MIN_LENGTH)(t)],
    }),
    [t]
  );
};
