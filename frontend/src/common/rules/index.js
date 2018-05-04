import { t } from '../../app/i18n';

const required = { required: true, message: t('Field is required') };

const email = { type: 'email', message: t('E-mail is not valid') };

const password = { type: 'string', message: t('Password is not valid') };

const passwordWithLimit = [
  password,
  required,
  { min: 6, message: t('Password must contain at least 6 characters') },
];

const repeatPassword = form => [
  ...passwordWithLimit,
  {
    validator: (rule, value, cb) => {
      cb(
        value && value !== form.getFieldValue('password') ? t('Passwords do not match') : undefined
      );
    },
  },
];

export default {
  required,
  email,
  password,
  passwordWithLimit,
  repeatPassword,
};
