import commonRules from '../../../common/rules';

const email = [commonRules.required, commonRules.email];

const passwordWithLimit = [
  commonRules.required,
  { min: 6, message: 'Password must contain at least 6 characters' },
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
    cb(value && value !== form.getFieldValue('password') ? 'Passwords do not match' : undefined);
  };
}
