import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormScreen, FormItem, FormComponentProps } from 'packages/ant-form-helpers';

import { ResetPasswordPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components';
import { useRules } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<ResetPasswordPayload> & {
  isLoading: boolean;
  onSubmit: (values: ResetPasswordPayload) => void;
};

const ResetPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email, password, passwordMinLength } = useRules();

  return (
    <AuthLayout>
      <FormScreen<ResetPasswordPayload> form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem<ResetPasswordPayload>
              id="email"
              rules={[required, email]}
              label={t('fields.email.label', { defaultValue: 'E-mail' })}
            >
              <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
            </FormItem>
            <FormItem<ResetPasswordPayload>
              id="password"
              rules={[required, password, passwordMinLength]}
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
    </AuthLayout>
  );
};

export default Form.create<Props>()(ResetPasswordForm);
