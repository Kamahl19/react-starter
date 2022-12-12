import { useCallback } from 'react';
import { message, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ForgottenPasswordPayload, useForgottenPassword } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { useForgottenPasswordRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const ForgottenPassword = () => {
  const { t } = useTranslation();

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
    [t, navigate, forgottenPassword, onError]
  );

  const rules = useForgottenPasswordRules();

  return (
    <Form<ForgottenPasswordPayload> onFinish={handleSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('auth:forgottenPassword.email.label')}
        name="email"
        rules={rules.email}
        validateFirst
      >
        <Input autoFocus />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={forgottenPasswordIsLoading}>
        {t('global:submit')}
      </Button>
    </Form>
  );
};

export default ForgottenPassword;
