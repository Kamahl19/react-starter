import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponentProps } from 'antd/lib/form';

import { SignUpPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components';
import { useFormRules, useFormSubmit } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<SignUpPayload> & {
  isLoading: boolean;
  onSubmit: (values: SignUpPayload) => void;
};

const SignUpForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email, password, passwordMinLength } = useFormRules();
  const handleSubmit = useFormSubmit(form, onSubmit);

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Item label={t('signUp.email.label', { defaultValue: 'E-mail' })} htmlFor="email">
          {form.getFieldDecorator('email', { rules: [required, email] })(
            <Input
              autoFocus
              placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
            />
          )}
        </Form.Item>
        <Form.Item
          label={t('fields.password.label', { defaultValue: 'Password' })}
          htmlFor="password"
        >
          {form.getFieldDecorator('password', {
            rules: [required, password, passwordMinLength],
          })(
            <Input.Password
              placeholder={t('signUp.password.placeholder', {
                defaultValue: 'Choose Password',
              })}
            />
          )}
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('signUp.signUp', { defaultValue: 'Sign Up' })}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Form.create<Props>()(SignUpForm);
