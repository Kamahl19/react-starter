import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { type LoginPayload } from 'api';
import { useValidationRules } from 'common/validations';

import { AUTH_ROUTES } from '../../routes';

type Props = {
  onSubmit: (values: LoginPayload) => void;
  isLoading: boolean;
};

const Login = ({ onSubmit, isLoading }: Props) => {
  const { t } = useTranslation();
  const { email, passwordNoCheck } = useValidationRules();

  return (
    <Form<LoginPayload> onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('logIn.email.label', { defaultValue: 'E-mail' })}
        name="email"
        rules={email}
        validateFirst
      >
        <Input autoFocus placeholder={t('logIn.email.placeholder', { defaultValue: 'E-mail' })} />
      </Form.Item>
      <Form.Item
        label={t('logIn.password.label', { defaultValue: 'Password' })}
        name="password"
        rules={passwordNoCheck}
        validateFirst
      >
        <Input.Password
          placeholder={t('logIn.password.placeholder', { defaultValue: 'Password' })}
        />
      </Form.Item>
      <Form.Item>
        <Link to={AUTH_ROUTES.forgottenPassword.to}>
          {t('logIn.forgotPassword', { defaultValue: 'Forgot password?' })}
        </Link>
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('logIn.logIn', { defaultValue: 'Log In' })}
      </Button>
    </Form>
  );
};

export default Login;
