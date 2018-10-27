import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';

import {
  Widget,
  Button,
  Form,
  FormScreen,
  FormItem,
  CodeInput,
  Input,
  PasswordInput,
} from '../../../../common/components';
import rules from '../../../../common/rules';

const ResetPasswordForm = ({ form, t, isLoading, emailCredentialExists, onSubmit }) => (
  <Widget title={<Trans i18nKey="resetPassword.title">Reset Password</Trans>}>
    <FormScreen form={form} onSubmit={onSubmit}>
      {({ hasErrors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            id="code"
            rules={[rules.required, rules.code]}
            label={<Trans i18nKey="fields.code.label">Code</Trans>}
          >
            <CodeInput autoFocus />
          </FormItem>
          <FormItem
            id="password"
            rules={rules.passwordWithLimit}
            label={<Trans i18nKey="resetPassword.newPassword.label">New Password</Trans>}
          >
            <PasswordInput
              placeholder={t('resetPassword.password.placeholder', {
                defaultValue: 'Enter New Password',
              })}
            />
          </FormItem>
          {!emailCredentialExists && (
            <FormItem
              id="email"
              rules={[rules.required, ...rules.email]}
              label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
            >
              <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
            </FormItem>
          )}
          <Button loading={isLoading} disabled={hasErrors} block type="primary" htmlType="submit">
            <Trans i18nKey="fields.submit">Submit</Trans>
          </Button>
        </Form>
      )}
    </FormScreen>
  </Widget>
);

ResetPasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  emailCredentialExists: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default translate()(Form.create()(ResetPasswordForm));
