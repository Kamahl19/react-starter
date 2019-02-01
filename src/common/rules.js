import { t } from './services/i18n';

const MIN_PASSWORD_LENGTH = 6;

const required = {
  required: true,
  message: t('validation.required', { defaultValue: 'Field is required' }),
};

const email = {
  type: 'email',
  message: t('validation.email.invalid', {
    defaultValue: 'E-mail is not valid',
  }),
};

const password = {
  type: 'string',
  message: t('validation.password.invalid', {
    defaultValue: 'Password is not valid',
  }),
};

const passwordWithLimit = [
  password,
  required,
  {
    min: MIN_PASSWORD_LENGTH,
    message: t('validation.password.length', {
      minLength: MIN_PASSWORD_LENGTH,
      defaultValue: 'Password must contain at least {{minLength}} characters',
    }),
  },
];

export default {
  required,
  email,
  password,
  passwordWithLimit,
};
