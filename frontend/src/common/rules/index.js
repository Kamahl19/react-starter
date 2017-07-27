import { t } from '../../app/i18n';

const required = { required: true, message: t('Field is required') };

const email = { type: 'email', message: t('E-mail is not valid') };

export default {
  required,
  email,
};
