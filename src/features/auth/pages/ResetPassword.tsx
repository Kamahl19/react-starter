import { useCallback, useState } from 'react';
import { Button, Form, Input, Result } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ResetPasswordPayload, useResetPassword } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';
import { DASHBOARD_ROUTES } from '@/features/dashboard/routes';

import { useResetPasswordRules } from '../validations';
import AuthCard from '../components/AuthCard';

const ResetPassword = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) =>
      mutate(
        {
          payload,
          redirectTo: `${window.location.origin}${DASHBOARD_ROUTES.profileChangePassword.to}`,
        },
        {
          onSuccess: () => setSuccess(true),
          onError,
        },
      ),
    [mutate, onError],
  );

  const rules = useResetPasswordRules();

  return (
    <AuthCard title={t('auth:resetPassword.title')}>
      {success ? (
        <Result status="success" title={t('auth:resetPassword.success')} />
      ) : (
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
            <Button block type="primary" htmlType="submit" loading={isPending}>
              {t('global:submit')}
            </Button>
          </Form.Item>
        </Form>
      )}
    </AuthCard>
  );
};

export default ResetPassword;
