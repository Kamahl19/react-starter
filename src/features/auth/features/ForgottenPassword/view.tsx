import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponentProps } from 'antd/lib/form';

import { ForgottenPasswordPayload } from 'common/ApiTypes';
import { Button, Form, Input } from 'common/components/';
import { useFormRules, useFormSubmit } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = FormComponentProps<ForgottenPasswordPayload> & {
  isLoading: boolean;
  onSubmit: (values: ForgottenPasswordPayload) => void;
};

const ForgottenPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email } = useFormRules();
  const handleSubmit = useFormSubmit(form, onSubmit);

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Item label={t('fields.email.label', { defaultValue: 'E-mail' })} htmlFor="email">
          {form.getFieldDecorator('email', { rules: [required, email] })(
            <Input
              autoFocus
              placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })}
            />
          )}
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('fields.submit', { defaultValue: 'Submit' })}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Form.create<Props>()(ForgottenPasswordForm);
