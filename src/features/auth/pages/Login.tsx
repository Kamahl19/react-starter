import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { type LoginPayload } from 'api';
import { useAuth } from 'common/auth';
import { useApiErrorMessage } from 'common/hooks';

import { useLoginRules } from '../validations';
import { AUTH_ROUTES } from '../routes';
import AuthCard from '../components/AuthCard';

const Login = () => {
  const { t } = useTranslation();

  const { login, isLoginLoading } = useAuth();

  const onError = useApiErrorMessage();

  const handleLogin = useCallback(
    (payload: LoginPayload) => login(payload, { onError }),
    [login, onError]
  );

  const rules = useLoginRules();

  return (
    <AuthCard title={t('auth:logIn.title')}>
      <Form<LoginPayload> onFinish={handleLogin} layout="vertical" requiredMark={false}>
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
    </AuthCard>
  );
};

export default Login;
