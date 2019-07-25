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

const ResetPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen<Values> form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
              id="email"
              rules={[rules.required(t), rules.email(t)]}
              label={t('fields.email.label', { defaultValue: 'E-mail' })}
            >
              <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
            </FormItem>
            <FormItem
              id="password"
              rules={rules.passwordWithLimit(t)}
              label={t('resetPassword.newPassword.label', { defaultValue: 'New Password' })}
            >
              <Input.Password
                placeholder={t('resetPassword.password.placeholder', {
                  defaultValue: 'Enter New Password',
                })}
              />
            </FormItem>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              {t('fields.submit', { defaultValue: 'Submit' })}
            </Button>
          </Form>
        )}
      </FormScreen>
    </PageLayout>
  );
};

export default Form.create<Props>()(ResetPasswordForm);
