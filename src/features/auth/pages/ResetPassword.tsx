import { useCallback } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ResetPasswordPayload, useResetPassword } from 'api';
import { useAuth } from 'common/auth';
import { useApiErrorMessage, useTokenParam } from 'common/hooks';

import { AUTH_ROUTES } from '../routes';
import { useResetPasswordRules } from '../validations';
import AuthCard from '../components/AuthCard';

const ResetPassword = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const token = useTokenParam();

  const onError = useApiErrorMessage();

  const { mutate: resetPassword, isLoading: resetPasswordIsLoading } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) =>
      resetPassword(
        { token, payload },
        {
          onSuccess: () => {
            message.success(t('auth:resetPassword.success'));
            isLoggedIn && logout();
            navigate(AUTH_ROUTES.login.to);
          },
          onError,
        }
      ),
    [t, navigate, resetPassword, token, onError, message, isLoggedIn, logout]
  );

  const rules = useResetPasswordRules();

  return (
    <AuthCard title={t('auth:resetPassword.title')}>
      <Form<ResetPasswordPayload> onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('auth:resetPassword.password')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password autoFocus />
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={resetPasswordIsLoading}>
            {t('global:submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default ResetPassword;
