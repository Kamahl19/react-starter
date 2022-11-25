import { useCallback } from 'react';
import { message, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ForgottenPasswordPayload, useForgottenPassword, isApiError } from 'api';

import { useForgottenPasswordRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const ForgottenPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const rules = useForgottenPasswordRules();

  const { mutate: forgottenPassword, isLoading: forgottenPasswordIsLoading } =
    useForgottenPassword();

  const handleSubmit = useCallback(
    (payload: ForgottenPasswordPayload) =>
      forgottenPassword(payload, {
        onSuccess: () => {
          message.success(t('forgottenPassword.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError: (error) => {
          if (isApiError(error)) {
            message.error(error.message);
          }
        },
      }),
    [t, navigate, forgottenPassword]
  );

  return (
    <Form<ForgottenPasswordPayload> onFinish={handleSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('forgottenPassword.email.label')}
        name="email"
        rules={rules.email}
        validateFirst
      >
        <Input autoFocus placeholder={t('forgottenPassword.email.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={forgottenPasswordIsLoading}>
        {t('forgottenPassword.submit')}
      </Button>
    </Form>
  );
};

export default ForgottenPassword;
