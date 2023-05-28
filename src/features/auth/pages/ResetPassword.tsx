import { useCallback } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ResetPasswordPayload, useResetPassword } from 'api';
import { useApiErrorMessage } from 'common/hooks';
import { DASHBOARD_ROUTES } from 'features/dashboard/routes';

import { useResetPasswordRules } from '../validations';
import AuthCard from '../components/AuthCard';

const ResetPassword = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const onError = useApiErrorMessage();

  const { mutate, isLoading } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) =>
      mutate(
        {
          payload,
          redirectTo: `${window.location.origin}${DASHBOARD_ROUTES.profileChangePassword.to}`,
        },
        {
          onSuccess: () => {
            message.success(t('auth:resetPassword.success'));
          },
          onError,
        }
      ),
    [t, mutate, onError, message]
  );

  const rules = useResetPasswordRules();

  return (
    <AuthCard title={t('auth:resetPassword.title')}>
      <Form<ResetPasswordPayload> onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('auth:resetPassword.email')}
          name="email"
          rules={rules.email}
          validateFirst
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            {t('global:submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default ResetPassword;
