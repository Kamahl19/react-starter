import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FormComponentProps } from 'antd/lib/form';

import { FormScreen, FormItem } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components';
import rules from 'common/rules';

import PageLayout from '../../components/PageLayout';

type Props = FormComponentProps & {
  isLoading: boolean;
  onSubmit: (...args: any[]) => any; // TODO
};

const ResetPasswordForm = ({ form, isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
              id="email"
              rules={[rules.required, rules.email]}
              label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
            >
              <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
            </FormItem>
            <FormItem
              id="password"
              rules={rules.passwordWithLimit}
              label={<Trans i18nKey="resetPassword.newPassword.label">New Password</Trans>}
            >
              <Input.Password
                placeholder={t('resetPassword.password.placeholder', {
                  defaultValue: 'Enter New Password',
                })}
              />
            </FormItem>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              <Trans i18nKey="fields.submit">Submit</Trans>
            </Button>
          </Form>
        )}
      </FormScreen>
    </PageLayout>
  );
};

export default Form.create<Props>()(ResetPasswordForm);
