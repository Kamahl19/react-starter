import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { type SignInPayload } from 'api';
import { useSignIn } from 'common/auth';
import { useApiErrorMessage } from 'common/hooks';

import { useSignInRules } from '../validations';
import { AUTH_ROUTES } from '../routes';
import AuthCard from '../components/AuthCard';

const SignIn = () => {
  const { t } = useTranslation();

  const { signIn, isLoading } = useSignIn();

  const onError = useApiErrorMessage();

  const handleSubmit = useCallback(
    (payload: SignInPayload) => signIn(payload, { onError }),
    [signIn, onError]
  );

  const rules = useSignInRules();

  return (
    <AuthCard title={t('auth:signIn.title')}>
      <Form<SignInPayload> onFinish={handleSubmit} layout="vertical" requiredMark={false}>
        <Form.Item label={t('auth:signIn.email')} name="email" rules={rules.email} validateFirst>
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label={t('auth:signIn.password')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Link to={AUTH_ROUTES.forgottenPassword.to}>{t('auth:signIn.forgotPassword')}</Link>
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            {t('auth:signIn.submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default SignIn;
