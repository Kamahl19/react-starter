import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormScreen, FormItem, FormComponentProps } from 'packages/ant-form-helpers';

import { SignUpPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components';
import { useRules } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<SignUpPayload> & {
  isLoading: boolean;
  onSubmit: (values: SignUpPayload) => void;
};

const SignUpForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email, password, passwordMinLength } = useRules();

  return (
    <AuthLayout>
      <FormScreen<SignUpPayload> form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem<SignUpPayload>
              id="email"
              rules={[required, email]}
              label={t('signUp.email.label', { defaultValue: 'E-mail' })}
            >
              <Input
                placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
                autoFocus
              />
            </FormItem>
            <FormItem<SignUpPayload>
              id="password"
              rules={[required, password, passwordMinLength]}
              label={t('fields.password.label', { defaultValue: 'Password' })}
            >
              <Input.Password
                placeholder={t('signUp.password.placeholder', {
                  defaultValue: 'Choose Password',
                })}
              />
            </FormItem>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              {t('signUp.signUp', { defaultValue: 'Sign Up' })}
            </Button>
          </Form>
        )}
      </FormScreen>
    </AuthLayout>
  );
};

export default Form.create<Props>()(SignUpForm);
