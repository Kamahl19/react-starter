import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { type LoginPayload, useLoginValidation } from 'api';

import { AUTH_ROUTES } from '../../routes';

type Props = {
  onSubmit: (values: LoginPayload) => void;
  isLoading: boolean;
};

const Login = ({ onSubmit, isLoading }: Props) => {
  const { t } = useTranslation();

  const validation = useLoginValidation();

  return (
    <Form<LoginPayload> onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item label={t('logIn.email.label')} name="email" rules={validation.email} validateFirst>
        <Input autoFocus placeholder={t('logIn.email.placeholder')} />
      </Form.Item>
      <Form.Item
        label={t('logIn.password.label')}
        name="password"
        rules={validation.password}
        validateFirst
      >
        <Input.Password placeholder={t('logIn.password.placeholder')} />
      </Form.Item>
      <Form.Item>
        <Link to={AUTH_ROUTES.forgottenPassword.to}>{t('logIn.forgotPassword')}</Link>
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('logIn.submit')}
      </Button>
    </Form>
  );
};

export default Login;
