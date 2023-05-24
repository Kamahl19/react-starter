import { useCallback } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ForgottenPasswordPayload, useForgottenPassword } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { useForgottenPasswordRules } from '../validations';
import AuthCard from '../components/AuthCard';

const ForgottenPassword = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const onError = useApiErrorMessage();

  const { mutate: forgottenPassword, isLoading: forgottenPasswordIsLoading } =
    useForgottenPassword();

  const handleSubmit = useCallback(
    (payload: ForgottenPasswordPayload) =>
      forgottenPassword(payload, {
        onSuccess: () => {
          message.success(t('auth:forgottenPassword.success'));
        },
        onError,
      }),
    [t, forgottenPassword, onError, message]
  );

  const rules = useForgottenPasswordRules();

  return (
    <AuthCard title={t('auth:forgottenPassword.title')}>
      <Form<ForgottenPasswordPayload> onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('auth:forgottenPassword.email')}
          name="email"
          rules={rules.email}
          validateFirst
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={forgottenPasswordIsLoading}>
            {t('global:submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default ForgottenPassword;
