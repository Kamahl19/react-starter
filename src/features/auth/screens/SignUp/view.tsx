import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { SignUpPayload } from 'common/ApiTypes';
import { useFormRules } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = {
  isLoading: boolean;
  onSubmit: (values: SignUpPayload) => void;
};

const SignUpForm = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email, passwordMinLength } = useFormRules();

  return (
    <AuthLayout>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item
          label={t('signUp.email.label', { defaultValue: 'E-mail' })}
          name="email"
          rules={[required, email]}
        >
          <Input
            autoFocus
            placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
          />
        </Form.Item>
        <Form.Item
          label={t('fields.password.label', { defaultValue: 'Password' })}
          name="password"
          rules={[required, passwordMinLength]}
        >
          <Input.Password
            placeholder={t('signUp.password.placeholder', {
              defaultValue: 'Choose Password',
            })}
          />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('signUp.signUp', { defaultValue: 'Sign Up' })}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default SignUpForm;
