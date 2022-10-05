import { useCallback } from 'react';
import { message, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type ForgottenPasswordPayload, useForgottenPassword, handleApiError } from 'api';
import { useValidationRules } from 'common/validations';

import { AUTH_ROUTES } from '../../routes';

const ForgottenPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const rules = useValidationRules();

  const { mutate, isLoading } = useForgottenPassword();

  const handleSubmit = useCallback(
    (payload: ForgottenPasswordPayload) =>
      mutate(payload, {
        onSuccess: () => {
          message.success(t('forgottenPassword.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError: handleApiError((msg: string) => message.error(msg)),
      }),
    [t, navigate, mutate]
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
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('forgottenPassword.submit')}
      </Button>
    </Form>
  );
};

export default ForgottenPassword;
