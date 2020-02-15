import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormScreen, FormItem, FormComponentProps } from 'packages/ant-form-helpers';

import { ForgottenPasswordPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components/';
import { useRules } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<ForgottenPasswordPayload> & {
  isLoading: boolean;
  onSubmit: (values: ForgottenPasswordPayload) => void;
};

const ForgottenPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email } = useRules();

  return (
    <AuthLayout>
      <FormScreen<ForgottenPasswordPayload> form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem<ForgottenPasswordPayload>
              id="email"
              rules={[required, email]}
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
