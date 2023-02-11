import { useCallback } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ForgottenPasswordPayload, useForgottenPassword } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { useForgottenPasswordRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const ForgottenPassword = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const onError = useApiErrorMessage();

  const { mutate: forgottenPassword, isLoading: forgottenPasswordIsLoading } =
    useForgottenPassword();

  const handleSubmit = useCallback(
    (payload: ForgottenPasswordPayload) =>
      forgottenPassword(payload, {
        onSuccess: () => {
          message.success(t('auth:forgottenPassword.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError,
      }),
    [t, navigate, forgottenPassword, onError, message]
  );

  const rules = useForgottenPasswordRules();

  return (
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
  );
};

export default ForgottenPassword;
