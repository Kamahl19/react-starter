import { useMemo } from 'react';
import { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { type FormRule } from 'antd';

import { PASSWORD_MIN_LENGTH } from 'api';

const stringMinLength =
  (min: number) =>
  (t: TFunction): FormRule => ({
    type: 'string',
    min,
    message: t('validation.stringMinLength', {
      min,
      defaultValue: 'Field must be at least {{min}} characters long',
    }),
  });

const required = (t: TFunction): FormRule => ({
  required: true,
  message: t('validation.required', { defaultValue: 'Field is required' }),
});

const email = (t: TFunction): FormRule => ({
  type: 'email',
  message: t('validation.email', { defaultValue: 'E-mail is not valid' }),
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
