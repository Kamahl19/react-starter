import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

import { LoginPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components';
import { useFormRules, useFormSubmit } from 'common/hooks';

import { AUTH_ROUTER_PATHS } from '../../constants';
import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<LoginPayload> & {
  isLoading: boolean;
  onSubmit: (values: LoginPayload) => void;
};

const LoginForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email, password } = useFormRules();
  const handleSubmit = useFormSubmit(form, onSubmit);

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Item label={t('fields.email.label', { defaultValue: 'E-mail' })} htmlFor="email">
          {form.getFieldDecorator('email', { rules: [required, email] })(
            <Input
              autoFocus
              placeholder={t('logIn.email.placeholder', { defaultValue: 'E-mail' })}
            />
          )}
        </Form.Item>
        <Form.Item
          label={t('fields.password.label', { defaultValue: 'Password' })}
          htmlFor="password"
        >
          {form.getFieldDecorator('password', { rules: [required, password] })(
            <Input.Password
              placeholder={t('logIn.password.placeholder', {
                defaultValue: 'Enter Password',
              })}
            />
          )}
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

export default Form.create<Props>()(LoginForm);
