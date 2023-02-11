import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { type LoginPayload } from 'api';
import { useAuth } from 'common/auth';
import { useApiErrorMessage } from 'common/hooks';

import { useLoginRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const Login = () => {
  const { t } = useTranslation();

  const onError = useApiErrorMessage();

  const { login, isLoginLoading } = useAuth();

  const handleLogin = useCallback(
    (payload: LoginPayload) =>
      login(payload, {
        onError,
      }),
    [login, onError]
  );

  const rules = useLoginRules();

  return (
    <Form<LoginPayload> onFinish={handleLogin} layout="vertical">
      <Form.Item label={t('auth:logIn.email')} name="email" rules={rules.email} validateFirst>
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label={t('auth:logIn.password')}
        name="password"
        rules={rules.password}
        validateFirst
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Link to={AUTH_ROUTES.forgottenPassword.to}>{t('auth:logIn.forgotPassword')}</Link>
      </Form.Item>
      <Form.Item noStyle>
        <Button block type="primary" htmlType="submit" loading={isLoginLoading}>
          {t('auth:logIn.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
