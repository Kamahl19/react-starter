import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormScreen, FormItem, FormComponentProps } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components/';
import rules from 'common/rules';

import AuthLayout from '../../components/AuthLayout';

type Values = {
  email: string;
};

type Props = FormComponentProps<Values> & {
  isLoading: boolean;
  onSubmit: (values: Values) => void;
};

const ForgottenPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <FormScreen<Values> form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem<Values>
              id="email"
              rules={[rules.required(t), rules.email(t)]}
              label={t('fields.email.label', { defaultValue: 'E-mail' })}
            >
              <Input
                autoFocus
                placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })}
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

export default Form.create<Props>()(ForgottenPasswordForm);
