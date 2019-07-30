import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormScreen, FormItem, FormComponentProps } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components';
import rules from 'common/rules';

import PageLayout from '../../components/PageLayout';

type Values = {
  email: string;
  password: string;
};

type Props = FormComponentProps<Values> & {
  isLoading: boolean;
  onSubmit: (values: Values) => void;
};

const SignUpForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem<Values>
              id="email"
              rules={[rules.required(t), rules.email(t)]}
              label={t('signUp.email.label', { defaultValue: 'E-mail' })}
            >
              <Input
                placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
                autoFocus
              />
            </FormItem>
            <FormItem<Values>
              id="password"
              rules={rules.passwordWithLimit(t)}
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
    </PageLayout>
  );
};

export default Form.create<Props>()(SignUpForm);
