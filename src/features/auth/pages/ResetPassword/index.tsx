import { useCallback } from 'react';
import { message, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type ResetPasswordPayload, useResetPassword, handleApiError } from 'api';
import { useValidationRules } from 'common/validations';

import { AUTH_ROUTES } from '../../routes';

const ResetPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const rules = useValidationRules();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { mutate, isLoading } = useResetPassword();

  const handleSubmit = useCallback(
    (payload: ResetPasswordPayload) => {
      mutate(
        { token, payload },
        {
          onSuccess: () => {
            message.success(t('resetPassword.success'));
            navigate(AUTH_ROUTES.login.to);
          },
          onError: handleApiError((msg: string) => message.error(msg)),
        }
      );
    },
    [t, navigate, mutate, token]
  );

  return (
    <Form<ResetPasswordPayload> onFinish={handleSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('resetPassword.password.label')}
        name="password"
        rules={rules.email}
        validateFirst
      >
        <Input.Password autoFocus placeholder={t('resetPassword.password.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('resetPassword.submit')}
      </Button>
    </Form>
  );
};

export default ResetPassword;
