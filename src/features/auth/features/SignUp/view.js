import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';

import { FormScreen, FormItem } from '../../../../packages/ant-form-helpers';

import { Button, Form, Input } from '../../../../common/components';
import rules from '../../../../common/rules';

import PageLayout from '../../components/PageLayout';

const SignUpForm = ({ form, isLoading, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
              id="email"
              rules={[rules.required, rules.email]}
              label={<Trans i18nKey="signUp.email.label">E-mail</Trans>}
            >
              <Input
                placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
                autoFocus
              />
            </FormItem>
            <FormItem
              id="password"
              rules={rules.passwordWithLimit}
              label={<Trans i18nKey="fields.password.label">Password</Trans>}
            >
              <Input.Password
                placeholder={t('signUp.password.placeholder', {
                  defaultValue: 'Choose Password',
                })}
              />
            </FormItem>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              <Trans i18nKey="signUp.signUp">Sign Up</Trans>
            </Button>
          </Form>
        )}
      </FormScreen>
    </PageLayout>
  );
};

SignUpForm.propTypes = {
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(SignUpForm);
