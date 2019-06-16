import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

import { FormScreen, FormItem } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components';
import rules from 'common/rules';

import { AUTH_ROUTER_PATHS } from '../../constants';
import PageLayout from '../../components/PageLayout';

type Props = FormComponentProps & {
  isLoading: boolean;
  onSubmit: (...args: any[]) => any; // TODO
};

const LoginForm = ({ form, isLoading, onSubmit }: Props) => {
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
              <Input
                placeholder={t('logIn.email.placeholder', { defaultValue: 'E-mail' })}
                autoFocus
              />
            </FormItem>
            <FormItem
              id="password"
              rules={[rules.required, rules.password]}
              label={<Trans i18nKey="fields.password.label">Password</Trans>}
            >
              <Input.Password
                placeholder={t('logIn.password.placeholder', {
                  defaultValue: 'Enter Password',
                })}
              />
            </FormItem>
            <Form.Item>
              <Link to={AUTH_ROUTER_PATHS.forgottenPassword}>
                <Trans i18nKey="logIn.forgotPassword">Forgot password?</Trans>
              </Link>
            </Form.Item>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              <Trans i18nKey="logIn.logIn">Log In</Trans>
            </Button>
          </Form>
        )}
      </FormScreen>
    </PageLayout>
  );
};

export default Form.create<Props>()(LoginForm);