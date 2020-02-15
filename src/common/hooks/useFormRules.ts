import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { ValidationRule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';

const MIN_PASSWORD_LENGTH = 6;

const required = (t: TFunction): ValidationRule => ({
  required: true,
  message: t('validation.required', { defaultValue: 'Field is required' }),
});

const email = (t: TFunction): ValidationRule => ({
  type: 'email',
  message: t('validation.email.invalid', {
    defaultValue: 'E-mail is not valid',
  }),
});

const password = (t: TFunction): ValidationRule => ({
  type: 'string',
  message: t('validation.password.invalid', {
    defaultValue: 'Password is not valid',
  }),
});

const passwordMinLength = (t: TFunction): ValidationRule => ({
  min: MIN_PASSWORD_LENGTH,
  message: t('validation.password.length', {
    minLength: MIN_PASSWORD_LENGTH,
    defaultValue: 'Password must contain at least {{minLength}} characters',
  }),
});

const useFormRules = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      required: required(t),
      email: email(t),
      password: password(t),
      passwordMinLength: passwordMinLength(t),
    }),
    [t]
  );
};

export default useFormRules;
