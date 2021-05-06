import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { LoginPayload } from 'common/ApiTypes';
import { useFormRules } from 'common/hooks';

import { AUTH_ROUTER_PATHS } from '../../constants';
import AuthLayout from '../../components/AuthLayout';

type Props = {
  isLoading: boolean;
  onSubmit: (values: LoginPayload) => void;
};

const LoginForm = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email } = useFormRules();

  return (
    <AuthLayout>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item
          label={t('fields.email.label', { defaultValue: 'E-mail' })}
          name="email"
          rules={[required, email]}
        >
          <Input autoFocus placeholder={t('logIn.email.placeholder', { defaultValue: 'E-mail' })} />
        </Form.Item>
        <Form.Item
          label={t('fields.password.label', { defaultValue: 'Password' })}
          name="password"
          rules={[required]}
        >
          <Input.Password
            placeholder={t('logIn.password.placeholder', {
              defaultValue: 'Password',
            })}
          />
        </Form.Item>
        <Form.Item>
          <Link to={AUTH_ROUTER_PATHS.forgottenPassword}>
            {t('logIn.forgotPassword', { defaultValue: 'Forgot password?' })}
          </Link>
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('logIn.logIn', { defaultValue: 'Log In' })}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
