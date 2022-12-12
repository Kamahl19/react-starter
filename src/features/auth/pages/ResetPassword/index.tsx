import { useCallback } from 'react';
import { message, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ResetPasswordPayload, useResetPassword } from 'api';
import { useApiErrorMessage, useTokenParam } from 'common/hooks';

import { useResetPasswordRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const ResetPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const token = useTokenParam();

  const onError = useApiErrorMessage();

  const { mutate: resetPassword, isLoading: resetPasswordIsLoading } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) => {
      resetPassword(
        { token, payload },
        {
          onSuccess: () => {
            message.success(t('auth:resetPassword.success'));
            navigate(AUTH_ROUTES.login.to);
          },
          onError,
        }
      );
    },
    [t, navigate, resetPassword, token, onError]
  );

  const rules = useResetPasswordRules();

  return (
    <Form<ResetPasswordPayload> onFinish={handleSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('auth:resetPassword.password.label')}
        name="password"
        rules={rules.password}
        validateFirst
      >
        <Input.Password autoFocus />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={resetPasswordIsLoading}>
        {t('global:submit')}
      </Button>
    </Form>
  );
};

export default ResetPassword;
