import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message, Button, Form, Input } from 'antd';

import { type LoginPayload } from 'api';
import { useLogin } from 'common/auth';
import { useValidationRules } from 'common/validations';

import { AUTH_ROUTES } from '../../routes';

const Login = () => {
  const { t } = useTranslation();

  const rules = useValidationRules();

  const { login, isLoading } = useLogin();

  const handleLogin = useCallback(
    (payload: LoginPayload) =>
      login(payload, {
        onError: () => void message.error(t('logIn.failed')),
      }),
    [t, login]
  );

  return (
    <Form<LoginPayload> onFinish={handleLogin} layout="vertical" scrollToFirstError>
      <Form.Item label={t('logIn.email.label')} name="email" rules={rules.email} validateFirst>
        <Input autoFocus placeholder={t('logIn.email.placeholder')} />
      </Form.Item>
      <Form.Item
        label={t('logIn.password.label')}
        name="password"
        rules={rules.requiredString}
        validateFirst
      >
        <Input.Password placeholder={t('logIn.password.placeholder')} />
      </Form.Item>
      <Form.Item>
        <Link to={AUTH_ROUTES.forgottenPassword.to}>{t('logIn.forgotPassword')}</Link>
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('logIn.submit')}
      </Button>
    </Form>
  );
};

export default Login;
