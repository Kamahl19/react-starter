import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Rule } from 'antd/lib/form';

const MIN_PASSWORD_LENGTH = 6;

const required = (t: TFunction): Rule => ({
  required: true,
  message: t('validation.required', { defaultValue: 'Field is required' }),
});

const email = (t: TFunction): Rule => ({
  type: 'email',
  message: t('validation.email.invalid', {
    defaultValue: 'E-mail is not valid',
  }),
});

const passwordMinLength = (t: TFunction): Rule => ({
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
      passwordMinLength: passwordMinLength(t),
    }),
    [t]
  );
};

export default useFormRules;
