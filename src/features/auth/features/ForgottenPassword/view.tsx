import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponentProps } from 'antd/lib/form';

import { FormScreen, FormItem } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components/';
import rules from 'common/rules';

import PageLayout from '../../components/PageLayout';

type Props = FormComponentProps & {
  isLoading: boolean;
  onSubmit: (...args: any[]) => any; // TODO
};

const ForgottenPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
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
    </PageLayout>
  );
};

export default Form.create<Props>()(ForgottenPasswordForm);
