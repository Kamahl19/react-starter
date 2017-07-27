import { t } from '../../../app/i18n';
import commonRules from '../../../common/rules';

const email = [commonRules.required, commonRules.email];

const passwordWithLimit = [
  commonRules.required,
  { min: 6, message: t('Password must contain at least 6 characters') },
];

const repeatPassword = form => [...passwordWithLimit, { validator: comparePasswords(form) }];

export default {
  email,
  password: [commonRules.required],
  passwordWithLimit,
  repeatPassword,
};

function comparePasswords(form) {
  return (rule, value, cb) => {
    cb(value && value !== form.getFieldValue('password') ? t('Passwords do not match') : undefined);
  };
}
